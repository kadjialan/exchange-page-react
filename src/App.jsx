import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { QuestionProvider } from './Context';

import Navigation from './components/Navigation/Navigation';
import Home from './Home/Home';
import Main from './Main/Main';
import Shop from './components/Shop/Shop';

function App() {
  const [total, setTotal] = useState('100.76 XAF');
  const [select, setSelect] = useState();
  const [message1, setMessage1] = useState(100); // Increased starting balance
  const [message2, setMessage2] = useState(150); // Increased starting balance
  const [message3, setMessage3] = useState(75000); // Increased starting balance
  const [message4, setMessage4] = useState(500); // Increased starting balance

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
          <Navigation />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/exchange" element={<Main />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </QuestionProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
