
import React, { useState, useEffect } from "react";
const fetchData = async () => {
    try {
        const res = await fetch(
            "http://localhost:1337/api/products?populate=*&pagination[pageSize]=6",
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer YOUR_ACCESS_TOKEN",
                },
            }
        );
        const data = await res.json();
        return data.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default fetchData;
