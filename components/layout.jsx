import React from 'react';
import { Footer } from './footer';
import { Header } from './header';

const MainLayout = ({ children, session }) => {
  return (
    <>
      <Header session={session} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;

