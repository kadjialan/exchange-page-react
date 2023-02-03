import React from 'react';
import './Main.css';
import logo2 from '../Images/logo2.png';

function Main() {
  return (
    <div>
      <div className="home main">
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
            <span>USD</span>
            <input type="number" value="USD" />
          </div>

          <div className="currency__options">
            <span>EUR</span>
            <input type="number" value="EUR" />
          </div>

          <div className="currency__options">
            <span>XAF</span>
            <input type="number" value="XAF" />
          </div>

          <div className="currency__options">
            <span>CNY</span>
            <input type="number" value="CNY" />
          </div>

          <div>
            <h3>Total currency in XAF</h3>
            <div className="total__currency">waiting</div>
          </div>
        </div>

        <div className="main__holder__right">
          <h1>Currency Converter</h1>
          <img src={logo2} alt="logo" className="logo2" />
        </div>
      </div>
    </div>
  );
}

export default Main;
