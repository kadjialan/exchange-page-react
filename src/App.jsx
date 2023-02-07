import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { QuestionProvider } from './Context';

import Home from './Home/Home';
import Main from './Main/Main';

function App() {
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState({
    USD: 0,
    EUR: 0,
    XAF: 0,
    CNY: 0,
  });
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <BrowserRouter>
        <QuestionProvider
          value={{ setTotal, total, message, setMessage, count, setCount }}
        >
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/exchange" element={<Main />} />
          </Routes>
        </QuestionProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
