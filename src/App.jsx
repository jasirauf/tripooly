import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stays from './pages/Stays';
import Connection from './pages/Connection';
import PackageDetails from './pages/PackageDetails';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stays" element={<Stays />} />
            <Route path="/connections" element={<Connection />} />
            <Route path="/package/:id" element={<PackageDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
