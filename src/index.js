import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CategoryPage from './pages/Category';
import ProductPage from './pages/Product';
import CheckoutPage from './pages/Checkout';
import AppProvider from './App.provider';
import ScrollToTop from './utils/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <React.StrictMode>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='/:category' element={<CategoryPage/>}/>
          <Route path='/:category/:product' element={<ProductPage/>}/>
          <Route path='*' element={<Navigate to='/' replace />}/>
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </AppProvider>
);