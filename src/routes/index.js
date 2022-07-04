import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '../containers/Layout';
import HomePage from '../pages/HomePage';
import BuyPage from '../pages/BuyPage';
import AddPropertyPage from '../pages/AddPropertyPage';
import PropertyPage from '../pages/PropertyPage';

const queryClient = new QueryClient();

const RoutesComponent = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/add-property" element={<AddPropertyPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  </BrowserRouter>
);

export default RoutesComponent;
