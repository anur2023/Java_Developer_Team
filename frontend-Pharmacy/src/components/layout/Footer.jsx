import React from "react";

const Footer = () => {
    return (
        <footer className="bg-success text-white mt-auto">
            <div className="container py-4">
                <div className="row">

                    {/* Logo & About */}
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">PharmaCare</h5>
                        <p className="small">
                            Your trusted online pharmacy for safe and quick medicine delivery.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="col-md-4 mb-3">
                        <h6 className="fw-semibold">Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="/products" className="text-white text-decoration-none">Medicines</a></li>
                            <li><a href="/cart" className="text-white text-decoration-none">Cart</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-4 mb-3">
                        <h6 className="fw-semibold">Contact</h6>
                        <p className="small mb-1">📍 Kanpur, India</p>
                        <p className="small mb-1">📧 support@pharmacare.com</p>
                        <p className="small">📞 +91 9876543210</p>
                    </div>

                </div>

                <hr className="border-light" />

                <div className="text-center small">
                    © {new Date().getFullYear()} PharmaCare. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;