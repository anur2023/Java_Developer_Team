import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="flex-grow-1 container py-3">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;