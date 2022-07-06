import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '../containers/Layout';
import HomePage from '../pages/HomePage';
import BuyOrRentPage from '../pages/BuyOrRentPage';
import AddPropertyPage from '../pages/AddPropertyPage';
import PropertyPage from '../pages/PropertyPage';
import SellPage from '../pages/SellPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const RoutesComponent = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyOrRentPage currentPage="buy" />} />
          <Route path="/rent" element={<BuyOrRentPage currentPage="rent" />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/add-property" element={<AddPropertyPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  </BrowserRouter>
);

export default RoutesComponent;
