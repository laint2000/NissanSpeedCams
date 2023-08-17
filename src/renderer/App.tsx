import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from './MainPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
