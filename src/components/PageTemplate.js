import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PageTemplate = ({ children }) => {
  return (
    <>
      <Header />
      <div
        className="w-full h-full inline-block z-0 bg-light p-32 dark:bg-dark 
                   xl:p-24 lg:p-16 md:p-12 sm:p-8"
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default PageTemplate;
