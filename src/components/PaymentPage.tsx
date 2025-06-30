import React, { useState } from 'react';
import { ArrowLeft, Check, CreditCard, Smartphone, Building2, Wallet } from 'lucide-react';

interface PaymentPageProps {
  onNavigate: (page: string) => void;
}

type PaymentStep = 'amount' | 'method' | 'success';

const PaymentPage: React.FC<PaymentPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<PaymentStep>('amount');
  const [donationAmount, setDonationAmount] = useState('80000');
  const [selectedAmount, setSelectedAmount] = useState<number>(80000);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const quickAmounts = [10000, 20000, 50000, 100000, 200000, 500000];

  const paymentMethods = [
    {
      id: 'bca',
      name: 'BCA',
      type: 'Bank Transfer',
      icon: '🏦',
      color: 'bg-blue-600'
    },
    {
      id: 'gopay',
      name: 'GoPay',
      type: 'E-Wallet',
      icon: '💚',
      color: 'bg-green-500'
    },
    {
      id: 'ovo',
      name: 'OVO',
      type: 'E-Wallet',
      icon: '🟣',
      color: 'bg-purple-600'
    },
    {
      id: 'dana',
      name: 'DANA',
      type: 'E-Wallet',
      icon: '🔵',
      color: 'bg-blue-500'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setDonationAmount(amount.toString());
  };

  const handleNextStep = () => {
    if (currentStep === 'amount') {
      setCurrentStep('method');
    } else if (currentStep === 'method') {
      setCurrentStep('success');
    }
  };

  const handleBackStep = () => {
    if (currentStep === 'method') {
      setCurrentStep('amount');
    } else if (currentStep === 'amount') {
      onNavigate('donation');
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'amount':
        return 'Masukkan Nominal Donasi';
      case 'method':
        return 'Pilih Metode Pembayaran';
      case 'success':
        return 'Donasi Berhasil';
      default:
        return 'Payment';
    }
  };

  const renderProgressBar = () => {
    const steps = ['Nominal Donasi', 'Konfirmasi', 'Selesai'];
    const currentStepIndex = currentStep === 'amount' ? 0 : currentStep === 'method' ? 1 : 2;

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`text-xs font-medium ${
                index <= currentStepIndex ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="flex items-center">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  index <= currentStepIndex
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {index < currentStepIndex ? (
                  <Check className="w-2.5 h-2.5" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    index < currentStepIndex ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderAmountStep = () => (
    <div className="space-y-6">
      {/* Amount Display */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">
            Rp {parseInt(donationAmount).toLocaleString('id-ID')}
          </div>
          <div className="text-gray-500 text-sm">atau</div>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handleAmountSelect(amount)}
            className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
              selectedAmount === amount
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Rp{amount.toLocaleString('id-ID')}
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="space-y-4">
        <div>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => {
              setDonationAmount(e.target.value);
              setSelectedAmount(parseInt(e.target.value) || 0);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Masukkan nominal lain"
          />
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tinggalkan Pesan untuk Komunitas (Opsional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={3}
            maxLength={200}
            placeholder="Pesan ini akan dibaca bersama dengan Anda. Bisa berupa harapan, doa, atau dukungan lain."
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {message.length}/200
          </div>
        </div>

        {/* Anonymous Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="anonymous" className="text-sm text-gray-700">
            Donasi sebagai Anonim
          </label>
        </div>

        <div className="text-xs text-gray-500">
          100% dana disalurkan ke komunitas*
        </div>
      </div>
    </div>
  );

  const renderMethodStep = () => (
    <div className="space-y-6">
      {/* Amount Summary */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">
            {formatCurrency(parseInt(donationAmount))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedPaymentMethod(method.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedPaymentMethod === method.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-8 ${method.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                  {method.name}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{method.name}</div>
                  <div className="text-sm text-gray-500">{method.type}</div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedPaymentMethod === method.id
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {selectedPaymentMethod === method.id && (
                  <Check className="w-3 h-3 text-white m-0.5" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-500 text-center">
        atau
      </div>

      {/* Alternative Payment Methods */}
      <div className="grid grid-cols-2 gap-3">
        <button className="p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors">
          <div className="text-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-800">GoPay</div>
          </div>
        </button>
        <button className="p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors">
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-sm font-medium text-gray-800">OVO</div>
          </div>
        </button>
      </div>

      <div className="space-y-2">
        <button className="w-full p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-800">DANA</div>
              <div className="text-sm text-gray-500">E-Wallet</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Donasi Berhasil</h2>
        <p className="text-gray-600 mb-6">
          Terima kasih!<br />
          Donasikmu telah berhasil dikirim. Dukunganmu akan<br />
          sangat berarti bagi komunitas yang sedang berjuang<br />
          menghadapi musibah mereka saat ini.
        </p>
      </div>

      {/* Donation Summary */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Nominal Donasi:</span>
            <span className="font-semibold">{formatCurrency(parseInt(donationAmount))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Metode Pembayaran:</span>
            <span className="font-semibold">
              {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name || 'BCA'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="text-green-600 font-semibold">Berhasil</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onNavigate('home')}
        className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors"
      >
        Lihat Donasi Lain
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackStep}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <h1 className="text-lg font-semibold text-gray-800">Payment</h1>
            
            <div className="w-8"></div> {/* Spacer */}
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Step Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          {getStepTitle()}
        </h2>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 'amount' && renderAmountStep()}
          {currentStep === 'method' && renderMethodStep()}
          {currentStep === 'success' && renderSuccessStep()}
        </div>

        {/* Continue Button */}
        {currentStep !== 'success' && (
          <button
            onClick={handleNextStep}
            disabled={
              (currentStep === 'amount' && !donationAmount) ||
              (currentStep === 'method' && !selectedPaymentMethod)
            }
            className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
          >
            Lanjut
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;