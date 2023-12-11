import './App.scss';
import { Route, Routes } from 'react-router-dom';

import WebSocketPage from '@/pages/WebSocketPage/WebSocketPage';
import Home from '@/pages/Home/Home';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/websocket" element={<WebSocketPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  );
}

export default App;
