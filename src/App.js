import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.scss';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <div data-testid = "app">
        <Navbar />
        <div className="container" data-testid="" >
          <PageTitle>TODO List</PageTitle>
          <div className={styles.app__wrapper}>
            <AppHeader />
            <AppContent />
          </div>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontSize: '1.4rem',
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
