import React from 'react';
import './Main.css';
import logo2 from '../Images/logo3.png';

function Main() {
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
          <input type="number" value="USD" />
          <span>USD</span>
        </div>

        <div className="currency__options">
          <input type="number" value="EUR" />
          <span>EUR</span>
        </div>

        <div className="currency__options">
          <input type="number" value="XAF" />
          <span>XAF</span>
        </div>

        <div className="currency__options">
          <input type="number" value="CNY" />
          <span>CNY</span>
        </div>

        <button className="save" type="button">
          save
        </button>
        <div>
          <h3>Total currency in XAF</h3>
          <div className="total__currency">waiting</div>
        </div>
      </div>

      <div className="main__holder__right">
        <img src={logo2} alt="logo" className="logo2" />
        <h1>Currency Converter</h1>
        <h3>
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
