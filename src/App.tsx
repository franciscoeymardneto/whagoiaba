import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import "./i18n/i18n"
import {store, persistor } from './store/store';

function App() {

  return (
    <>
      <React.Suspense fallback="loading">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={routes} />
            <ToastContainer />
          </PersistGate>
        </Provider>
      </React.Suspense>
    </>
  )
}

export default App
