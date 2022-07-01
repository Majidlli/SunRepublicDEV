import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../containers/Layout';
import HomePage from '../pages/HomePage';
import BuyPage from '../pages/BuyPage';

const RoutesComponent = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<BuyPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default RoutesComponent;
