/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
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

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    // eslint-disable-next-line no-console
    console.log('submitting', values);
    if (values.currency === 'USD') {
      ans1(message1 + +values.Amount);
      setMessage1(ans1);
    } else if (values.currency === 'EUR') {
      const ans2 = message2 + +values.Amount;
      setMessage2(ans2);
    } else if (values.currency === 'XAF') {
      const ans3 = message3 + +values.Amount;
      setMessage3(ans3);
    } else if (values.currency === 'CNY') {
      const ans4 = message4 + +values.Amount;
      setMessage4(ans4);
    }

    if (values.defaultCurrency === 'USD') {
      setTotal(ans1 + ans2 * 0.93 + ans3 * 611.64 + ans4 * 6.79);
    }
  };

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

        <button className="save" type="button">
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
          <div className="main__heading">
            <p>
              <b>Default Currenncy:</b>
            </p>
            <select name="defaultCurrency" id="currencies">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="XAF">XAF</option>
              <option value="XAF">CNY</option>
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
