/* eslint-disable no-alert */
/* eslint-disable no-self-compare */
/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import './Main.css';
import logo2 from '../Images/logo3.png';
import { QuestionContext } from '../Context';

function Main() {
  const {
    message1,
    setMessage1,
    message2,
    setMessage2,
    message3,
    setMessage3,
    message4,
    setMessage4,
    total,
    setTotal,
  } = useContext(QuestionContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    let ans1 = 0;
    let ans2 = 0;
    let ans3 = 0;
    let ans4 = 0;

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    if (values.currency === 'USD') {
      ans1 = message1 + +values.Amount;
      setMessage1(ans1);
    } else if (values.currency === 'EUR') {
      ans2 = message2 + +values.Amount;
      setMessage2(ans2);
    } else if (values.currency === 'XAF') {
      ans3 = message3 + +values.Amount;
      setMessage3(ans3);
    } else if (values.currency === 'CNY') {
      ans4 = message4 + +values.Amount;
      setMessage4(ans4);
    }

    if (values.defaultCurrency === 'USD') {
      const operation1 = (
        message2 * 0.93 +
        message1 +
        message3 * 0.0016 +
        message4 * 0.15
      ).toFixed(2);
      const unit1 = `${operation1} USD`;
      setTotal(unit1);
    } else if (values.defaultCurrency === 'EUR') {
      const operation2 = (
        message1 * 0.93 +
        message2 +
        message3 * 0.01 +
        message4 * 0.14
      ).toFixed(2);
      const unit2 = `${operation2} EUR`;
      setTotal(unit2);
    } else if (values.defaultCurrency === 'XAF') {
      const operation3 = (
        message1 * 611.64 +
        message2 * 658.13 +
        message3 +
        message4 * 90.23
      ).toFixed(2);
      const unit3 = `${operation3} XAF`;
      setTotal(unit3);
    } else {
      const operation4 = (
        message1 * 6.78 +
        message2 * 7.29 +
        message3 * 0.01 +
        message4
      ).toFixed(2);
      const unit4 = `${operation4} CNY`;
      setTotal(unit4);
    }
  };

  function doExchange(event) {
    event.preventDefault();

    const change = new FormData(event.currentTarget);
    const values2 = Object.fromEntries(change.entries());

    if (values2.from === values2.too) {
      alert('currency for exchange are similar');
    }

    if (values2.too === 'USD') {
      if (values2.from === 'XAF' && values2.deposite < message3) {
        const val1 = message3 - values2.deposite;
        setMessage3(val1);
        setMessage1(message1 + val1 * 0.01);
      }
      if (values2.from === 'EUR' && values2.deposite < message2) {
        const val1 = message2 - values2.deposite;
        setMessage2(val1);
        setMessage1(message1 + val1 * 0.93);
      }
      if (values2.from === 'CNY' && values2.deposite < message4) {
        const val1 = message4 - values2.deposite;
        setMessage4(val1);
        setMessage1(message1 + val1 * 0.14);
      } else {
        alert('Insufficient amount in wallet');
      }
    } else if (values2.too === 'EUR') {
      if (values2.from === 'XAF' && values2.deposite < message3) {
        const val1 = message3 - values2.deposite;
        setMessage3(val1);
        setMessage2(message2 + val1 * 0.01);
      }
      if (values2.from === 'USD' && values2.deposite < message1) {
        const val1 = message1 - values2.deposite;
        setMessage1(val1);
        setMessage2(message2 + val1 * 0.93);
      }
      if (values2.from === 'CNY' && values2.deposite < message4) {
        const val1 = message4 - values2.deposite;
        setMessage4(val1);
        setMessage2(message2 + val1 * 0.14);
      } else {
        alert('Insufficient amount in wallet');
      }
    } else if (values2.too === 'CNY') {
      if (values2.from === 'XAF' && values2.deposite < message3) {
        const val1 = message3 - values2.deposite;
        setMessage3(val1);
        setMessage4(message4 + val1 * 0.01);
      }
      if (values2.from === 'USD' && values2.deposite < message1) {
        const val1 = message1 - values2.deposite;
        setMessage1(val1);
        setMessage4(message4 + val1 * 6.78);
      }
      if (values2.from === 'EUR' && values2.deposite < message2) {
        const val1 = message2 - values2.deposite;
        setMessage2(val1);
        setMessage4(message4 + val1 * 7.29);
      } else {
        alert('Insufficient amount in wallet');
      }
    } else if (values2.too === 'XAF') {
      if (values2.from === 'CNY' && values2.deposite < message4) {
        const val1 = message4 - values2.deposite;
        setMessage4(val1);
        setMessage3(message3 + val1 * 90.23);
      }
      if (values2.from === 'USD' && values2.deposite < message1) {
        const val1 = message1 - values2.deposite;
        setMessage1(val1);
        setMessage3(message3 + val1 * 611.64);
      }
      if (values2.from === 'EUR' && values2.deposite < message2) {
        const val1 = message2 - values2.deposite;
        setMessage2(val1);
        setMessage3(message3 + val1 * 658.13);
      } else {
        alert('Insufficient amount in wallet');
      }
    }
  }

  return (
    <div className="main">
      <div className="main__holder__left">
        <div className="main__wallet">
          <i className="fa-solid fa-wallet" />
          <h3>Wallet</h3>
        </div>

        <div className="currency__options">
          <div className="input" type="number" name="USD">
            {message1}
          </div>

          <span>USD</span>
        </div>

        <div className="currency__options">
          <div className="input" type="number" name="EUR">
            {message2}
          </div>
          <span>EUR</span>
        </div>

        <div className="currency__options">
          <div className="input" type="number" name="XAF">
            {message3}
          </div>
          <span>XAF</span>
        </div>

        <div className="currency__options">
          <div className="input" type="number" name="CNY">
            {message4}
          </div>
          <span>CNY</span>
        </div>

        <div>
          <h3>Total Currency</h3>
          <div className="total__currency">{total}</div>
        </div>
      </div>

      <div className="main__holder__right">
        <img src={logo2} alt="logo" className="logo2" />
        <h1>Currency Converter</h1>
        <h3 className="paragraph">
          <i>Below are some of the activities you can perform</i>
        </h3>
        <i>
          <b>NB:</b> confirm at the end of any change done
        </i>
        <form className="main__holder__deposit" onSubmit={handleSubmit}>
          <div className="main__heading">
            <p>
              <b>Default Currenncy:</b>
            </p>
            <select name="defaultCurrency" id="currencies">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="XAF">XAF</option>
              <option value="CNY">CNY</option>
            </select>
          </div>

          <h3 className="right__headings">Deposite</h3>
          <div>
            <span>Amount :</span>
            <input type="number" name="Amount" />
          </div>
          <div>
            <span>Currency for Deposite:</span>
            <select name="currency" id="currencies2">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="XAF">XAF</option>
              <option value="CNY">CNY</option>
            </select>
          </div>
          <button type="submit" className="confirm">
            confirm
          </button>
        </form>

        <form className="main__holder__deposit" onSubmit={doExchange}>
          <h3 className="right__headings">Exhange currencies</h3>
          <div>
            <span>Amount :</span>
            <input type="number" name="deposite" />
          </div>
          <div className="exchanger">
            <select id="currencies2" name="from">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="XAF">XAF</option>
              <option value="CNY">CNY</option>
            </select>
            <i className="fa-sharp fa-solid fa-arrow-right" />
            <select id="currencies2" name="too">
              <option value="XAF">XAF</option>
              <option value="CNY">CNY</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <button type="submit" className="confirm">
            confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default Main;
