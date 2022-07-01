import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../containers/Layout';
import HomePage from '../pages/HomePage';

const RoutesComponent = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default RoutesComponent;
