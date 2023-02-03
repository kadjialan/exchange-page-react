import React from 'react';
import './Main.css';

function Main() {
  return (
    <div>
      <div className="home main">
        <h1>Currency Converter</h1>

        <label htmlFor="currency">Choose default currency:</label>

        <select id="currencies">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="XAF">XAF</option>
        </select>
      </div>
    </div>
  );
}

export default Main;
