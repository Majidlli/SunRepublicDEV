import React, { useState, useCallback, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '../containers/Layout';
import HomePage from '../pages/HomePage';
import BuyOrRentPage from '../pages/BuyOrRentPage';
import AddPropertyPage from '../pages/AddPropertyPage';
import PropertyPage from '../pages/PropertyPage';
import SellPage from '../pages/SellPage';
import PropertyListPage from '../pages/PropertyListPage';
import ContactUsPage from '../pages/ContactUsPage';

// import i18n from '../i18n';
import { UIContext } from '../context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const RoutesComponent = () => {
  const [layoutKey, setLayoutKey] = useState(Math.random());
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const forceUpdate = useCallback(() => {
    setLayoutKey(Math.random());
  }, []);

  /*   useLayoutEffect(() => {
    if (i18n.language === 'en') {
      document.body.style.fontFamily = `'Smooch Sans', sans-serif`;
    } else if (i18n.language === 'ru') {
      document.body.style.fontFamily = `'Alumni Sans', sans-serif`;
    }
  }, [layoutKey]); */

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UIContext.Provider
          value={useMemo(() => {
            return {
              forceUpdate,
              searchTerm,
              setSearchTerm,
              isSearched,
              setIsSearched,
            };
          }, [forceUpdate, isSearched, searchTerm])}
        >
          <Layout key={layoutKey}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/buy"
                element={<BuyOrRentPage currentPage="sell" />}
              />
              <Route
                path="/rent"
                element={<BuyOrRentPage currentPage="rent" />}
              />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/add-property" element={<AddPropertyPage />} />
              <Route path="/property-list" element={<PropertyListPage />} />
              <Route path="/property/:id" element={<PropertyPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
            </Routes>
          </Layout>
        </UIContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default RoutesComponent;
