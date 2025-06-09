import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import React from 'react'

const Layout = () => {
  return (
    <main className="App">
        <Header />
        <Outlet />
        <Footer />
    </main>
  )
}

export default Layout