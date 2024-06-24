import { useState } from "react";

const StarRating = ({ initialValue, onChange }) => {
    const [rating, setRating] = useState(initialValue);

    const handleClick = (value) => {
        setRating(value);
        onChange(value);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((value) => (
                <span
                    key={value}
                    onClick={() => handleClick(value)}
                    style={{ cursor: "pointer", color: value <= rating ? "gold" : "gray" }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
