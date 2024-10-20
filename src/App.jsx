import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, useLocation,
} from 'react-router-dom';
import CountryDetail from './pages/CountryDetailPage';
import CooperationList from './pages/CooperationListPage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PoweredBy from './components/PoweredBy';
import Home from './pages/HomePage';
import Footer from './components/Footer';

function AppLayout() {
  const location = useLocation();
  const isCountryDetailPage = location.pathname.includes('/country');

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <div className="grow">
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Hero />
                <PoweredBy />
                <Home />
              </>
            )}
          />
          <Route path="/country/:countryCode" element={<CountryDetail />} />
          <Route path="/cooperation" element={<CooperationList />} />
        </Routes>
      </div>

      {!isCountryDetailPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
