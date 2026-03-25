import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/cart/Cart";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PharmacistDashboard from "./pages/pharmacist/PharmacistDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />
                    {/*<Route path="/pharmacist" element={<h2>Pharmacist Page</h2>} />*/}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/pharmacist" element={<PharmacistDashboard />} />
                    <Route path="/customer" element={<CustomerDashboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;