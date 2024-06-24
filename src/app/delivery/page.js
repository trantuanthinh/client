"use client";
import React from "react";

export default function Delivery() {
    return (
        <div className="delivery-container">
            <div className="delivery-content">
                <div className="delivery-text">
                    <h2 className="delivery-title">Delivery Policy</h2>
                    <p className="delivery-info">
                        We are committed to providing quality and reliable delivery service. Below are the terms and conditions that apply to the delivery process:
                    </p>
                    <ul className="delivery-list">
                        <li>- We only ship to orders with addresses less than 12km .</li>
                        <li>- Estimated delivery time: 2-3 working days within city areas and 3-5 working days for other regions.</li>
                        <li>- We will contact you via email or phone to confirm the order and delivery time.</li>
                    </ul>
                </div>
                <img src="https://i.pinimg.com/564x/ac/59/ff/ac59ffbbfed723c697506495a10d0f9b.jpg" alt="Delivery" className="delivery-image" />
            </div>
        </div>
    );
}
