import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { QuestionProvider } from './Context';

import Home from './Home/Home';
import Main from './Main/Main';

function App() {
  const [total, setTotal] = useState('100.76 XAF');
  const [select, setSelect] = useState();
  const [message1, setMessage1] = useState(30);
  const [message2, setMessage2] = useState(72.5);
  const [message3, setMessage3] = useState(33.0);
  const [message4, setMessage4] = useState(21.9);
  return (
    <div className="App">
      <BrowserRouter>
        <QuestionProvider
          value={{
            setTotal,
            total,
            message1,
            setMessage1,
            message2,
            setMessage2,
            message3,
            setMessage3,
            message4,
            setMessage4,
            select,
            setSelect,
          }}
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
