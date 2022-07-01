import React from 'react';

import Header from './Header';
import Footer from './Footer';
import classes from './styles.module.scss';

export default function Layout({ children }) {
  return (
    <div className={classes.Layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
