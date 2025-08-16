import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentPageProps {
	onNavigate?: (page: string) => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onNavigate }) => {
		const [currentStep, setCurrentStep] = useState<'amount' | 'method' | 'success'>('amount');
		const [donationAmount, setDonationAmount] = useState('');
		const [selectedAmount, setSelectedAmount] = useState(0);
		const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
		const [message, setMessage] = useState('');
		const [isAnonymous, setIsAnonymous] = useState(false);
		const [showNotification, setShowNotification] = useState(false);
		const [error, setError] = useState<{ type: string | null; message: string }>({ type: null, message: '' });

	const quickAmounts = [10000, 20000, 50000, 100000, 200000, 500000];
	const paymentMethods = [
		{ id: 'bca', name: 'BCA', type: 'Bank Transfer', color: 'bg-blue-600' },
		{ id: 'gopay', name: 'GoPay', type: 'E-Wallet', color: 'bg-green-500' },
		{ id: 'ovo', name: 'OVO', type: 'E-Wallet', color: 'bg-purple-600' },
		{ id: 'dana', name: 'DANA', type: 'E-Wallet', color: 'bg-blue-500' }
	];

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};

	const clearError = () => setError({ type: null, message: '' });
	const showError = (type: string, message: string) => {
		setError({ type, message });
		setTimeout(clearError, 5000);
	};
	const validateAmount = (amount: string, showErrors: boolean = true): boolean => {
		const numAmount = parseInt(amount);
		if (!amount || amount.trim() === '' || isNaN(numAmount)) {
			if (showErrors) showError('validation', 'Please enter a valid donation amount');
			return false;
		}
		if (numAmount < 0) {
			if (showErrors) showError('validation', 'Donation amount cannot be negative');
			return false;
		}
		if (numAmount < 1000) {
			if (showErrors) showError('validation', 'Minimum donation amount is Rp 1,000');
			return false;
		}
		return true;
	};
	const isAmountValid = (amount: string): boolean => {
		const numAmount = parseInt(amount);
		return !!(amount && amount.trim() !== '' && !isNaN(numAmount) && numAmount >= 1000 && numAmount >= 0);
	};
	const validateMessage = (msg: string, showErrors: boolean = true): boolean => {
		if (msg.length > 200) {
			if (showErrors) showError('validation', 'Message cannot exceed 200 characters');
			return false;
		}
		const inappropriateWords = ['spam', 'scam', 'fake'];
		const hasInappropriate = inappropriateWords.some(word => msg.toLowerCase().includes(word));
		if (hasInappropriate) {
			if (showErrors) showError('validation', 'Message contains inappropriate content');
			return false;
		}
		return true;
	};

	useEffect(() => {
		if (showNotification) {
			const timer = setTimeout(() => setShowNotification(false), 5000);
			return () => clearTimeout(timer);
		}
	}, [showNotification]);

	useEffect(() => {
		const handleOnline = () => clearError();
		const handleOffline = () => showError('network', 'No internet connection. Please check your network and try again.');
		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);
		if (!navigator.onLine) handleOffline();
		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	const handleAmountSelect = (amount: number) => {
		clearError();
		setSelectedAmount(amount);
		setDonationAmount(amount.toString());
	};
	const handleAmountChange = (value: string) => {
		setDonationAmount(value);
		setSelectedAmount(parseInt(value) || 0);
		if (error.type === 'validation') clearError();
	};
	const handleAmountBlur = (value: string) => validateAmount(value, false);
	const handleMessageChange = (value: string) => {
		setMessage(value);
		if (error.type === 'validation') clearError();
	};
	const handleMessageBlur = (value: string) => validateMessage(value, false);

	const handleNextStep = () => {
		if (currentStep === 'amount') {
			clearError();
			if (!validateAmount(donationAmount)) return;
			if (!validateMessage(message)) return;
			setCurrentStep('method');
		} else if (currentStep === 'method') {
			if (!selectedPaymentMethod) {
				showError('validation', 'Please select a payment method');
				return;
			}
			// Demo: always succeed
			setCurrentStep('success');
			setShowNotification(true);
			// Removed setRetryCount (no longer used)
		}
	};
	const handleBackStep = () => {
		if (currentStep === 'method') setCurrentStep('amount');
		else if (currentStep === 'amount') onNavigate && onNavigate('donation');
	};
	const getStepTitle = () => {
		switch (currentStep) {
			case 'amount': return 'Enter Donation Amount';
			case 'method': return 'Choose Payment Method';
			case 'success': return 'Donation Successful';
			default: return 'Payment';
		}
	};
	const renderProgressBar = () => {
		const steps = ['Donation Amount', 'Confirmation', 'Complete'];
		const currentStepIndex = currentStep === 'amount' ? 0 : currentStep === 'method' ? 1 : 2;
		return (
			<div className="mb-8">
				<div className="flex items-center justify-between mb-2">
					{steps.map((step, index) => (
						<div key={step} className={`text-xs font-medium ${index <= currentStepIndex ? 'text-green-600' : 'text-gray-400'}`}>{step}</div>
					))}
				</div>
				<div className="flex items-center">
					{steps.map((_, index) => (
						<React.Fragment key={index}>
							<div className={`w-4 h-4 rounded-full flex items-center justify-center ${index <= currentStepIndex ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
								{index < currentStepIndex ? (<Check className="w-2.5 h-2.5" />) : (<span className="text-xs">{index + 1}</span>)}
							</div>
							{index < steps.length - 1 && (<div className={`flex-1 h-0.5 mx-2 ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-300'}`} />)}
						</React.Fragment>
					))}
				</div>
			</div>
		);
	};

	const renderAmountStep = () => (
		<div className="space-y-6">
			<div className={`bg-white rounded-2xl p-6 border-2 ${donationAmount && !isAmountValid(donationAmount) ? 'border-red-300' : 'border-gray-200'}`}> 
				<div className="text-center">
					<div className={`text-3xl font-bold mb-2 ${donationAmount && !isAmountValid(donationAmount) ? 'text-red-600' : 'text-gray-800'}`}>Rp {donationAmount ? parseInt(donationAmount).toLocaleString('id-ID') : '0'}</div>
					<div className="text-gray-500 text-sm">Enter donation amount</div>
					{donationAmount && !isAmountValid(donationAmount) && (<div className="text-red-500 text-xs mt-2 font-medium">⚠️ Invalid amount</div>)}
				</div>
			</div>
			<div className="grid grid-cols-3 gap-3">
				{quickAmounts.map((amount) => (
					<button key={amount} onClick={() => handleAmountSelect(amount)} className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${selectedAmount === amount ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>Rp{amount.toLocaleString('id-ID')}</button>
				))}
			</div>
			<div className="space-y-4">
				<div>
					<input type="number" value={donationAmount} onChange={(e) => handleAmountChange(e.target.value)} onBlur={(e) => handleAmountBlur(e.target.value)} onKeyDown={(e) => {if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {e.preventDefault();}}} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${error.type === 'validation' ? 'border-red-300' : 'border-gray-300'}`} placeholder="Enter custom amount" min="1000" step="1000" />
					<div className="text-xs text-gray-500 mt-1">Minimum: Rp 1,000</div>
					{error.type === 'validation' && donationAmount && !isAmountValid(donationAmount) && (<div className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error.message}</div>)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Leave a Message for the Community (Optional)</label>
					<textarea value={message} onChange={(e) => handleMessageChange(e.target.value)} onBlur={(e) => handleMessageBlur(e.target.value)} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${error.type === 'validation' && message.length > 200 ? 'border-red-300' : 'border-gray-300'}`} rows={3} maxLength={200} placeholder="This message will be shared with others. It can be hopes, prayers, or other support." />
					<div className={`text-right text-xs mt-1 ${message.length > 180 ? 'text-red-500' : 'text-gray-500'}`}>{message.length}/200</div>
					{error.type === 'validation' && message && message.length > 200 && (<div className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Message cannot exceed 200 characters</div>)}
					{error.type === 'validation' && message && /spam|scam|fake/.test(message.toLowerCase()) && (<div className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Message contains inappropriate content</div>)}
				</div>
				<div className="flex items-center gap-2">
					<input type="checkbox" id="anonymous" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
					<label htmlFor="anonymous" className="text-sm text-gray-700">Donate as Anonymous</label>
				</div>
				<div className="text-xs text-gray-500">100% of funds go to the community*</div>
			</div>
		</div>
	);

	const renderMethodStep = () => (
		<div className="space-y-6">
			<div className="bg-white rounded-2xl p-4 border border-gray-200">
				<div className="text-center">
					<div className="text-2xl font-bold text-gray-800">{formatCurrency(parseInt(donationAmount) || 0)}</div>
				</div>
			</div>
			<div className="space-y-3">
				{paymentMethods.map((method) => (
					<button key={method.id} onClick={() => {clearError();setSelectedPaymentMethod(method.id);}} className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${selectedPaymentMethod === method.id ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className={`w-12 h-8 ${method.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>{method.name}</div>
								<div>
									<div className="font-medium text-gray-800">{method.name}</div>
									<div className="text-sm text-gray-500">{method.type}</div>
								</div>
							</div>
							<div className={`w-5 h-5 rounded-full border-2 ${selectedPaymentMethod === method.id ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
								{selectedPaymentMethod === method.id && (<Check className="w-3 h-3 text-white m-0.5" />)}
							</div>
						</div>
					</button>
				))}
			</div>
			{error.type === 'validation' && error.message.includes('payment method') && (<div className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error.message}</div>)}
			{/* Removed isLoading spinner (no longer used) */}
		</div>
	);

	const renderSuccessStep = () => (
		<div className="text-center space-y-6">
			<div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
				<div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"><Check className="w-8 h-8 text-white" /></div>
			</div>
			<div>
				<h2 className="text-2xl font-bold text-gray-800 mb-2">Donation Successful</h2>
				<p className="text-gray-600 mb-6">Thank you!<br />Your donation has been successfully sent. Your support will<br />mean a lot to the community that is currently struggling<br />to face their current challenges.</p>
			</div>
			<div className="bg-white rounded-2xl p-6 border border-gray-200">
				<div className="space-y-3">
					<div className="flex justify-between"><span className="text-gray-600">Donation Amount:</span><span className="font-semibold">{donationAmount ? formatCurrency(parseInt(donationAmount)) : 'N/A'}</span></div>
					<div className="flex justify-between"><span className="text-gray-600">Payment Method:</span><span className="font-semibold">{paymentMethods.find(m => m.id === selectedPaymentMethod)?.name || 'BCA'}</span></div>
					<div className="flex justify-between"><span className="text-gray-600">Status:</span><span className="text-green-600 font-semibold">Successful</span></div>
					{message && (<div className="pt-3 border-t border-gray-200"><div className="text-left"><span className="text-gray-600 text-sm">Your Message:</span><p className="text-gray-800 text-sm mt-1 italic">"{message}"</p></div></div>)}
				</div>
			</div>
			<div className="space-y-3">
				<button onClick={() => onNavigate && onNavigate('home')} className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors">View Other Donations</button>
				<button onClick={() => {setCurrentStep('amount');setDonationAmount('');setSelectedAmount(0);setSelectedPaymentMethod('');setMessage('');setIsAnonymous(false);setShowNotification(false);clearError();}} className="w-full bg-white text-green-600 py-3 rounded-xl font-medium border-2 border-green-200 hover:bg-green-50 transition-colors">Make Another Donation</button>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200">
			<header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
				<div className="max-w-md mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<button onClick={handleBackStep} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"><ArrowLeft className="w-5 h-5" /></button>
						<h1 className="text-lg font-semibold text-gray-800">Payment</h1>
						<div className="w-8"></div>
					</div>
				</div>
			</header>
			<div className="max-w-md mx-auto px-4 py-8">
				{renderProgressBar()}
				<h2 className="text-xl font-bold text-gray-800 mb-6 text-center">{getStepTitle()}</h2>
				<div className="mb-8">
					{currentStep === 'amount' && renderAmountStep()}
					{currentStep === 'method' && renderMethodStep()}
					{currentStep === 'success' && renderSuccessStep()}
				</div>
				{currentStep !== 'success' && (
					<button onClick={handleNextStep} disabled={(currentStep === 'amount' && !isAmountValid(donationAmount)) || (currentStep === 'method' && !selectedPaymentMethod) || error.type === 'validation'} className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${(currentStep === 'amount' && !isAmountValid(donationAmount)) || (currentStep === 'method' && !selectedPaymentMethod) || error.type === 'validation' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}>Continue</button>
				)}
				{error.type === 'network' && (
					<div className="text-center mt-4"><button onClick={() => window.location.reload()} className="text-sm text-blue-600 hover:text-blue-800 underline">Refresh page to try again</button></div>
				)}
			</div>
			{showNotification && (
				<div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out animate-slide-in flex items-center gap-3 z-50"><CheckCircle className="w-6 h-6 flex-shrink-0" /><div><p className="font-semibold">Donation Successful!</p><p className="text-sm text-green-100">Thank you for your contribution</p></div></div>
			)}
		</div>
	);
};

export default PaymentPage;
