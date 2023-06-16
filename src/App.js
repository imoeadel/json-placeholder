import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageTemplate from './components/PageTemplate';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <PageTemplate>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </PageTemplate>
    </BrowserRouter>
  );
}

export default App;
