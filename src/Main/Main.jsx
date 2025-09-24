/* eslint-disable no-alert */
/* eslint-disable no-self-compare */
/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import './Main.css';
import logo2 from '../Images/logo3.png';
import { QuestionContext } from '../Context';
import { useState, useEffect } from 'react';


function Main() {
  const {
    message1, // USD
    setMessage1,
    message2, // EUR
    setMessage2,
    message3, // XAF
    setMessage3,
    message4, // CNY
    setMessage4,
    total,
    setTotal,
  } = useContext(QuestionContext);

  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('deposit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const exchangeRates = {
    USD: { EUR: 0.93, XAF: 611.64, CNY: 6.78 },
    EUR: { USD: 1.08, XAF: 658.13, CNY: 7.29 },
    XAF: { USD: 0.0016, EUR: 0.0015, CNY: 0.011 },
    CNY: { USD: 0.15, EUR: 0.14, XAF: 90.23 },
  };

  const currencyData = [
    { code: 'USD', symbol: '$', flag: '🇺🇸', balance: message1, setter: setMessage1, color: '#22c55e' },
    { code: 'EUR', symbol: '€', flag: '🇪🇺', balance: message2, setter: setMessage2, color: '#3b82f6' },
    { code: 'XAF', symbol: 'F', flag: '🇨🇲', balance: message3, setter: setMessage3, color: '#f59e0b' },
    { code: 'CNY', symbol: '¥', flag: '🇨🇳', balance: message4, setter: setMessage4, color: '#ef4444' },
  ];

  const totalBalance = message1 + message2 + message3 + message4;

  const handleDeposit = (event) => {
    event.preventDefault();
    setIsProcessing(true);

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());
    const amount = parseFloat(values.Amount);
    const currency = values.currency;

    if (amount <= 0) {
      showNotification('Please enter a valid amount', 'error');
      setIsProcessing(false);
      return;
    }

    setTimeout(() => {
      const currencyInfo = currencyData.find(c => c.code === currency);
      if (currencyInfo) {
        currencyInfo.setter(currencyInfo.balance + amount);
        showNotification(`Successfully deposited ${amount} ${currency}`, 'success');
        updateTotal(values.defaultCurrency);
      }
      setIsProcessing(false);
      event.target.reset();
    }, 1000);
  };

  const handleExchange = (event) => {
    event.preventDefault();
    setIsProcessing(true);

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());
    const amount = parseFloat(values.amount);
    const fromCurrency = values.from;
    const toCurrency = values.to;

    if (fromCurrency === toCurrency) {
      showNotification('Please select different currencies', 'error');
      setIsProcessing(false);
      return;
    }

    const fromCurrencyData = currencyData.find(c => c.code === fromCurrency);
    const toCurrencyData = currencyData.find(c => c.code === toCurrency);

    if (amount > fromCurrencyData.balance) {
      showNotification('Insufficient balance', 'error');
      setIsProcessing(false);
      return;
    }

    setTimeout(() => {
      const rate = exchangeRates[fromCurrency][toCurrency];
      const convertedAmount = amount * rate;

      fromCurrencyData.setter(fromCurrencyData.balance - amount);
      toCurrencyData.setter(toCurrencyData.balance + convertedAmount);

      showNotification(
        `Exchanged ${amount} ${fromCurrency} to ${convertedAmount.toFixed(2)} ${toCurrency}`,
        'success'
      );
      setIsProcessing(false);
      event.target.reset();
    }, 1500);
  };

  const updateTotal = (defaultCurrency) => {
    if (defaultCurrency === 'USD') {
      const total = (
        message1 +
        message2 * exchangeRates.EUR.USD +
        message3 * exchangeRates.XAF.USD +
        message4 * exchangeRates.CNY.USD
      ).toFixed(2);
      setTotal(`${total} USD`);
    } else if (defaultCurrency === 'EUR') {
      const total = (
        message1 * exchangeRates.USD.EUR +
        message2 +
        message3 * exchangeRates.XAF.EUR +
        message4 * exchangeRates.CNY.EUR
      ).toFixed(2);
      setTotal(`${total} EUR`);
    } else if (defaultCurrency === 'XAF') {
      const total = (
        message1 * exchangeRates.USD.XAF +
        message2 * exchangeRates.EUR.XAF +
        message3 +
        message4 * exchangeRates.CNY.XAF
      ).toFixed(2);
      setTotal(`${total} XAF`);
    } else {
      const total = (
        message1 * exchangeRates.USD.CNY +
        message2 * exchangeRates.EUR.CNY +
        message3 * exchangeRates.XAF.CNY +
        message4
      ).toFixed(2);
      setTotal(`${total} CNY`);
    }
  };

  return (
    <div className="main">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      <div className={`main-container ${isVisible ? 'visible' : ''}`}>
        {/* Wallet Section */}
        <div className="wallet-section">
          <div className="wallet-header">
            <div className="wallet-icon">👛</div>
            <h2>Digital Wallet</h2>
            <div className="total-balance-display">
              <span>Total: ${totalBalance.toFixed(2)}</span>
            </div>
          </div>

          <div className="currency-grid">
            {currencyData.map((currency) => (
              <div key={currency.code} className="currency-card" style={{ '--color': currency.color }}>
                <div className="currency-header">
                  <span className="currency-flag">{currency.flag}</span>
                  <span className="currency-code">{currency.code}</span>
                </div>
                <div className="currency-balance">
                  <span className="currency-symbol">{currency.symbol}</span>
                  <span className="balance-amount">{currency.balance.toFixed(2)}</span>
                </div>
                <div className="currency-bar">
                  <div
                    className="currency-bar-fill"
                    style={{ width: `${Math.min((currency.balance / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exchange Section */}
        <div className="exchange-section">
          <div className="exchange-header">
            <img src={logo2} alt="Exchange" className="exchange-logo" />
            <h2>Currency Exchange</h2>
          </div>

          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'deposit' ? 'active' : ''}`}
              onClick={() => setActiveTab('deposit')}
            >
              <span>💰</span>
              Deposit
            </button>
            <button
              className={`tab-btn ${activeTab === 'exchange' ? 'active' : ''}`}
              onClick={() => setActiveTab('exchange')}
            >
              <span>🔄</span>
              Exchange
            </button>
          </div>

          {activeTab === 'deposit' && (
            <div className="form-container deposit-form">
              <h3>💳 Deposit Funds</h3>
              <form onSubmit={handleDeposit}>
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    name="Amount"
                    placeholder="Enter amount"
                    className="form-input"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Currency</label>
                  <select name="currency" className="form-select" required>
                    <option value="">Select currency</option>
                    {currencyData.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Display Total In</label>
                  <select name="defaultCurrency" className="form-select" required>
                    <option value="">Select display currency</option>
                    {currencyData.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary form-submit" disabled={isProcessing}>
                  {isProcessing ? <div className="loading"></div> : <span>💳</span>}
                  {isProcessing ? 'Processing...' : 'Deposit Funds'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'exchange' && (
            <div className="form-container exchange-form">
              <h3>🔄 Exchange Currency</h3>
              <form onSubmit={handleExchange}>
                <div className="exchange-row">
                  <div className="form-group">
                    <label>From</label>
                    <select name="from" className="form-select" required>
                      <option value="">Select currency</option>
                      {currencyData.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.flag} {currency.code} ({currency.symbol}{currency.balance.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="exchange-arrow">
                    <span>→</span>
                  </div>

                  <div className="form-group">
                    <label>To</label>
                    <select name="to" className="form-select" required>
                      <option value="">Select currency</option>
                      {currencyData.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.flag} {currency.code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount to exchange"
                    className="form-input"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-secondary form-submit" disabled={isProcessing}>
                  {isProcessing ? <div className="loading"></div> : <span>🔄</span>}
                  {isProcessing ? 'Exchanging...' : 'Exchange Currency'}
                </button>
              </form>
            </div>
          )}

          {total && (
            <div className="total-display">
              <h3>Portfolio Value</h3>
              <div className="total-amount">{total}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;