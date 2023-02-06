/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import { useState } from 'react';
import './Main.css';
import logo2 from '../Images/logo3.png';

function Main() {
  const [message, setMessage] = useState({
    america: 0,
    europe: 0,
    africa: 0,
    china: 0,
  });

  const handleChange = (e) => {
    const country = e.target.name;
    const val = e.target.value;
    const newValues = {
      ...message,
      [country]: val,
    };

    setMessage(newValues);

    calTotal(newValues);
  };

  const [, setTotal] = useState(0);
  const calTotal = (newValues) => {
    const { america, europe, africa, china } = newValues;
    const newTotal =
      parseInt(america, 10) +
      parseInt(europe, 10) +
      parseInt(africa, 10) +
      parseInt(china, 10);
    setTotal(newTotal);

    console.log(newTotal);
  };

  return (
    <div className="main">
      <div className="main__holder__left">
        <div className="main__wallet">
          <i className="fa-solid fa-wallet" />
          <h3>Wallet</h3>
        </div>

        <div className="main__heading">
          <p>
            <b>Default Currenncy:</b>
          </p>
          <select id="currencies">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="XAF">XAF</option>
            <option value="XAF">CNY</option>
          </select>
        </div>

        <div className="currency__options">
          <input
            type="number"
            name="america"
            value={message.america}
            onChange={handleChange}
          />
          <span>USD</span>
        </div>

        <div className="currency__options">
          <input
            type="number"
            name="europe"
            value={message.europe}
            onChange={handleChange}
          />
          <span>EUR</span>
        </div>

        <div className="currency__options">
          <input
            type="number"
            name="africa"
            value={message.africa}
            onChange={handleChange}
          />
          <span>XAF</span>
        </div>

        <div className="currency__options">
          <input
            type="number"
            name="china"
            value={message.china}
            onChange={handleChange}
          />
          <span>CNY</span>
        </div>

        <button className="save" type="button" onClick={() => calTotal()}>
          save
        </button>
        <div>
          <h3>Total currency in XAF</h3>
          <div className="total__currency">100</div>
        </div>
      </div>

      <div className="main__holder__right">
        <img src={logo2} alt="logo" className="logo2" />
        <h1>Currency Converter</h1>
        <h3 className="paragraph">
          <i>Below are some of the activities you can perform</i>
        </h3>
        <div className="main__holder__deposit">
          <h3 className="right__headings">Deposite</h3>
          <div>
            <span>Amount :</span>
            <input type="number" />
          </div>
          <div>
            <span>Currency for Deposite:</span>
            <select id="currencies2">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="XAF">XAF</option>
              <option value="XAF">CNY</option>
            </select>
          </div>
          <button type="button" className="confirm">
            confirm
          </button>
        </div>

        <div className="main__holder__deposit">
          <h3 className="right__headings">Exhange currencies</h3>
          <div>
            <span>Amount :</span>
            <input type="number" />
          </div>
          <div className="exchanger">
            <select id="currencies2">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="XAF">XAF</option>
              <option value="XAF">CNY</option>
            </select>
            <i className="fa-sharp fa-solid fa-arrow-right" />
            <select id="currencies2">
              <option value="XAF">XAF</option>
              <option value="XAF">CNY</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <button type="button" className="confirm">
            confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
