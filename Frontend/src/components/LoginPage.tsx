import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

interface ErrorState {
  type: 'email' | 'password' | 'name' | 'auth' | 'network' | 'general' | null;
  message: string;
}

interface ValidationState {
  email: boolean;
  password: boolean;
  name: boolean;
}

interface FieldTouchedState {
  email: boolean;
  password: boolean;
  name: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({ type: null, message: '' });
  const [validation, setValidation] = useState<ValidationState>({ email: false, password: false, name: false });
  const [fieldTouched, setFieldTouched] = useState<FieldTouchedState>({ email: false, password: false, name: false });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  // Error handling functions
  const clearError = () => {
    setError({ type: null, message: '' });
  };

  const showError = (type: ErrorState['type'], message: string) => {
    setError({ type, message });
    setTimeout(clearError, 5000); // Auto-clear error after 5 seconds
  };

  // Validation functions (silent - don't show errors automatically)
  const validateEmailSilent = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return false;
    
    // Check for common typos in domains
    const domain = email.split('@')[1]?.toLowerCase();
    const suggestions = ['gmial.com', 'yahooo.com', 'hotmial.com'];
    if (suggestions.includes(domain)) return false;
    
    return true;
  };

  const validatePasswordSilent = (password: string): boolean => {
    if (!password || password.length < 6) return false;
    if (isLogin) return true; // Less strict for login
    
    // More strict validation for signup
    if (password.length < 8) return false;
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) return false;
    if (!/(?=.*\d)/.test(password)) return false;
    
    return true;
  };

  const validateNameSilent = (name: string): boolean => {
    if (!isLogin && (!name.trim() || name.trim().length < 2)) return false;
    if (!isLogin && !/^[a-zA-Z\s]+$/.test(name)) return false;
    return true;
  };

  // Validation functions with error messages (only called on form submit or blur)
  const validateEmail = (email: string, showErrors: boolean = true): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!email) {
      if (showErrors) showError('email', 'Email is required');
      return false;
    }
    if (!isValid) {
      if (showErrors) showError('email', 'Please enter a valid email address');
      return false;
    }
    
    // Check for common typos in domains
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    const suggestions = ['gmial.com', 'yahooo.com', 'hotmial.com'];
    
    if (suggestions.includes(domain)) {
      const suggested = commonDomains.find(d => d.includes(domain.substring(0, 3)));
      if (showErrors) showError('email', `Did you mean ${email.split('@')[0]}@${suggested}?`);
      return false;
    }
    
    return true;
  };

  const validatePassword = (password: string, showErrors: boolean = true): boolean => {
    if (!password) {
      if (showErrors) showError('password', 'Password is required');
      return false;
    }
    if (password.length < 6) {
      if (showErrors) showError('password', 'Password must be at least 6 characters long');
      return false;
    }
    if (isLogin) return true; // Less strict for login
    
    // More strict validation for signup
    if (password.length < 6) {
      if (showErrors) showError('password', 'Password must be at least 6 characters long for new accounts');
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      if (showErrors) showError('password', 'Password must contain both uppercase and lowercase letters');
      return false;
    }
    if (!/(?=.*\d)/.test(password)) {
      if (showErrors) showError('password', 'Password must contain at least one number');
      return false;
    }
    
    return true;
  };

  const validateName = (name: string, showErrors: boolean = true): boolean => {
    if (!isLogin && !name.trim()) {
      if (showErrors) showError('name', 'Full name is required');
      return false;
    }
    if (!isLogin && name.trim().length < 2) {
      if (showErrors) showError('name', 'Name must be at least 2 characters long');
      return false;
    }
    if (!isLogin && !/^[a-zA-Z\s]+$/.test(name)) {
      if (showErrors) showError('name', 'Name can only contain letters and spaces');
      return false;
    }
    return true;
  };

  // Check if account is locked due to failed attempts
  const isAccountLocked = (): boolean => {
    return isLocked && lockTimer > 0;
  };

  // Simulate authentication with error handling
  const simulateAuth = async (email: string, password: string, name?: string): Promise<boolean> => {
    setIsFormLoading(true);
    clearError();

    try {
      // Log the attempt (in real app, this would be sent to backend)
      console.log('Auth attempt:', { email, passwordLength: password.length, name });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate different error scenarios
      const scenarios = Math.random();
      
      if (scenarios < 0.2) { // 20% chance of network error
        throw new Error('NETWORK_ERROR');
      } else if (scenarios < 0.4 && isLogin) { // 20% chance of invalid credentials
        throw new Error('INVALID_CREDENTIALS');
      } else if (scenarios < 0.5 && !isLogin) { // 10% chance of email already exists
        throw new Error('EMAIL_EXISTS');
      } else if (scenarios < 0.6) { // 10% chance of server error
        throw new Error('SERVER_ERROR');
      }
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      switch (errorMessage) {
        case 'NETWORK_ERROR':
          showError('network', 'Network connection failed. Please check your internet connection.');
          break;
        case 'INVALID_CREDENTIALS':
          setLoginAttempts(prev => prev + 1);
          if (loginAttempts >= 2) {
            setIsLocked(true);
            setLockTimer(30); // 30 second lockout
            showError('auth', 'Too many failed attempts. Account locked for 30 seconds.');
          } else {
            showError('auth', `Invalid email or password. ${2 - loginAttempts} attempts remaining.`);
          }
          break;
        case 'EMAIL_EXISTS':
          showError('email', 'An account with this email already exists. Try signing in instead.');
          break;
        case 'SERVER_ERROR':
          showError('general', 'Server error occurred. Please try again later.');
          break;
        default:
          showError('general', 'An unexpected error occurred. Please try again.');
      }
      return false;
    } finally {
      setIsFormLoading(false);
    }
  };

  // Handler functions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAccountLocked()) {
      showError('auth', `Account is locked. Please wait ${lockTimer} seconds.`);
      return;
    }
    clearError();
    setFieldTouched({ email: true, password: true, name: true });
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);
    const isNameValid = validateName(formData.name);
    if (!isEmailValid || !isPasswordValid || !isNameValid) {
      return;
    }
    if (isLogin) {
      onLogin(formData.email, formData.password);
    } else {
      onSignup(formData.name, formData.email, formData.password);
    }
    setShowSuccess(true);
  };

  const handleGoogleLogin = async () => {
    if (isAccountLocked()) {
      showError('auth', `Account is locked. Please wait ${lockTimer} seconds.`);
      return;
    }

    setIsGoogleLoading(true);
    clearError();

    try {
      // For demo purposes, just use a default login
      await onLogin('google@user.com', 'google-password');
      setShowSuccess(true);
    } catch (error) {
      setIsGoogleLoading(false);
      showError('auth', 'Google sign-in failed. Please try again or use email/password.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear errors when user starts typing
    if (error.type === name || error.type === 'auth') {
      clearError();
    }

    // Real-time validation feedback (without showing errors) - only for visual indicators
    if (name === 'email') {
      setValidation(prev => ({ ...prev, email: validateEmailSilent(value) }));
    } else if (name === 'password') {
      setValidation(prev => ({ ...prev, password: validatePasswordSilent(value) }));
    } else if (name === 'name') {
      setValidation(prev => ({ ...prev, name: validateNameSilent(value) }));
    }
  };

  // Handle input blur to show validation errors only when user leaves the field
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setFieldTouched(prev => ({ ...prev, [name]: true }));
    
    // Show errors on blur regardless of content to catch empty required fields
    if (name === 'email') {
      validateEmail(value, true);
    } else if (name === 'password') {
      validatePassword(value, true);
    } else if (name === 'name') {
      validateName(value, true);
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    clearError();
    setLoginAttempts(0);
    setIsLocked(false);
    setLockTimer(0);
    setFormData({ email: '', password: '', name: '' });
    setValidation({ email: false, password: false, name: false });
    setFieldTouched({ email: false, password: false, name: false });
  };

  // Timer management for account lockout
  useEffect(() => {
    if (lockTimer > 0) {
      const timer = setTimeout(() => {
        setLockTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockTimer === 0) {
      setIsLocked(false);
      setLoginAttempts(0);
    }
  }, [lockTimer, isLocked]);

  // Auto-hide success message
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // Success display component
  const renderSuccess = () => {
    if (!showSuccess) return null;

    return (
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
        <p className="text-green-700 text-sm font-medium">
          {isLogin ? 'Login successful! Redirecting...' : 'Account created successfully! Redirecting...'}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white fill-current" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Continue Your Journey!' : 'Join Us Today'}
          </h1>
          <p className="text-gray-600 text-sm">
            {isLogin 
              ? 'Sign in to continue spreading kindness easily and securely.'
              : 'Sign up to start making a positive impact with us.'
            }
          </p>
        </div>

        {/* Success Display */}
        {renderSuccess()}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                  error.type === 'name' ? 'border-red-300 bg-red-50' : 
                  formData.name && validation.name ? 'border-green-300 bg-green-50' : 
                  fieldTouched.name && !formData.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                disabled={isFormLoading || isGoogleLoading}
                required
              />
              {formData.name && validation.name && (
                <div className="mt-1 text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Valid name
                </div>
              )}
              {error.type === 'name' && (
                <div className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {error.message}
                </div>
              )}
              {fieldTouched.name && !formData.name && error.type !== 'name' && (
                <div className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Full name is required
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                error.type === 'email' ? 'border-red-300 bg-red-50' : 
                formData.email && validation.email ? 'border-green-300 bg-green-50' : 
                fieldTouched.email && !formData.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="example@gmail.com"
              disabled={isFormLoading || isGoogleLoading}
              required
            />
            {formData.email && validation.email && (
              <div className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Valid email
              </div>
            )}
            {error.type === 'email' && (
              <div className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error.message}
              </div>
            )}
            {fieldTouched.email && !formData.email && error.type !== 'email' && (
              <div className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Email is required
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                  error.type === 'password' ? 'border-red-300 bg-red-50' : 
                  formData.password && validation.password ? 'border-green-300 bg-green-50' : 
                  fieldTouched.password && !formData.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
                disabled={isFormLoading || isGoogleLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isFormLoading || isGoogleLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error.type === 'password' && (
              <div className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error.message}
              </div>
            )}
            {fieldTouched.password && !formData.password && error.type !== 'password' && (
              <div className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Password is required
              </div>
            )}
            {!isLogin && formData.password && (
              <div className="mt-2 space-y-1">
                <div className={`text-xs flex items-center gap-1 ${
                  formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  At least 8 characters
                </div>
                <div className={`text-xs flex items-center gap-1 ${
                  /(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    /(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  Upper & lowercase letters
                </div>
                <div className={`text-xs flex items-center gap-1 ${
                  /(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    /(?=.*\d)/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  At least one number
                </div>
              </div>
            )}
          </div>

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-green-600 hover:text-green-700 font-medium disabled:text-gray-400"
                disabled={isFormLoading || isGoogleLoading}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isFormLoading || isGoogleLoading || isAccountLocked()}
            className={`w-full py-3 rounded-lg font-semibold transform transition-all duration-200 flex items-center justify-center gap-2 ${
              isFormLoading || isGoogleLoading || isAccountLocked()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
            }`}
          >
            {isFormLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : isAccountLocked() ? (
              `Locked (${lockTimer}s)`
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Sign Up'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isFormLoading || isAccountLocked()}
          className={`w-full border py-3 rounded-lg font-semibold transform transition-all duration-200 flex items-center justify-center gap-3 ${
            isGoogleLoading || isFormLoading || isAccountLocked()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
              : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 border-gray-300'
          }`}
        >
          {isGoogleLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              Processing...
            </>
          ) : isAccountLocked() ? (
            `Google Sign-in Locked (${lockTimer}s)`
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
            </>
          )}
        </button>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={handleModeSwitch}
              disabled={isFormLoading || isGoogleLoading}
              className="text-green-600 hover:text-green-700 font-semibold ml-1 disabled:text-gray-400"
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our terms and conditions and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;