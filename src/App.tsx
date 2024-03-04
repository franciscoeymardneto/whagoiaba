import React, { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'

import "./i18n/i18n"

function App() {

  return (
    <>
    <React.Suspense fallback="loading">
      <RouterProvider router={routes}/>

    </React.Suspense>
    </>
  )
}

export default App
