"use client";
import React from "react";

export default function Contact() {
    return (
        <div className="contact-container">
            <div className="contact-content">
                <div className="contact-text">
                    <h2 className="contact-title">Contact Us</h2>
                    <p className="contact-info">
                        We are always ready to listen and answer any questions you may have. Feel free to get in touch with us using the information below:
                    </p>
                    <ul className="contact-list">
                        <li>Email: tramy2454@gmail.com</li>
                        <li>Phone: (+84) 933 936 945</li>
                        <li>Address: Binh Duong</li>
                    </ul>
                </div>
                <div className="contact-image">
                    {/* <img src="https://i.pinimg.com/564x/0a/b9/81/0ab981a742da810d7f9f46d8a20eb5c4.jpg" alt="Delivery" /> */}
                </div>
            </div>
        </div>
    );
}
