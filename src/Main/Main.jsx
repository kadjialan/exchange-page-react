/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import { useContext } from 'react';
import './Main.css';
import logo2 from '../Images/logo3.png';
import { QuestionContext } from '../Context';

function Main() {
  const { total, setTotal, message, setMessage, count, setCount } =
    useContext(QuestionContext);

  const handleChange = (e) => {
    const country = e.target.name;
    const val = e.target.value;
    console.log(val);
    const newValues = {
      ...message,
      [country]: val,
    };
    setMessage(newValues);
    calTotal(newValues);
  };

  const calTotal = (newValues) => {
    const { USD, EUR, XAF, CNY } = newValues;
    const newTotal =
      parseInt(USD, 10) +
      parseInt(EUR, 10) +
      parseInt(XAF, 10) +
      parseInt(CNY, 10);
    setTotal(newTotal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    console.log('submitting', values);

    if (currency === e.target.name) {
      setMessage(e.target.name + parseInt(Amount, 10));
    }
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
            name="USD"
            value={message.USD}
            onChange={handleChange}
          />
          <span>USD</span>
        </div>

        <div className="currency__options">
          <input
            type="number"
            name="EUR"
            value={message.EUR}
            onChange={handleChange}
          />
          <span>EUR</span>
        </div>

        <div className="currency__options">
          <input
            type="number"
            name="XAF"
            value={message.XAF}
            onChange={handleChange}
          />
          <span>XAF</span>
        </div>

        <div className="currency__options">
          <input
            type="number"
            name="CNY"
            value={message.CNY}
            onChange={handleChange}
          />
          <span>CNY</span>
        </div>

        <button className="save" type="button" onClick={() => calTotal()}>
          save
        </button>
        <div>
          <h3>Total currency in XAF</h3>
          <div className="total__currency">{total}</div>
        </div>
      </div>

      <div className="main__holder__right">
        <img src={logo2} alt="logo" className="logo2" />
        <h1>Currency Converter</h1>
        <h3 className="paragraph">
          <i>Below are some of the activities you can perform</i>
        </h3>
        <form className="main__holder__deposit" onSubmit={handleSubmit}>
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
              <option value="XAF">CNY</option>
            </select>
          </div>
          <button type="button" className="confirm">
            confirm
          </button>
        </form>

        <form className="main__holder__deposit">
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
        </form>
      </div>
    </div>
  );
}

export default Main;
