import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/global.scss';
import Navbar from './components/Navbar/Navbar';
import Routes from './routes/';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      {/* Global configuration for the toast container */}
      <ToastContainer position='top-center' />
      <div className='container'>
        <div className='page-wrapper'>
          <Routes />
        </div>
      </div>
    </>
  );
};
export default App;
