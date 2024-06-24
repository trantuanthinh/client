// import { useEffect, useState } from "react";

// export default function Feedback() {
//     const [feedbackData, setFeedbackData] = useState({});
//     const [feedbackList, setFeedbackList] = useState([]);
//     const [cartItems, setCartItems] = useState([]);


//     useEffect(() => {
//         // Lấy dữ liệu giỏ hàng từ localStorage khi component được tải lần đầu tiên
//         const storedCartItems = localStorage.getItem('cart');
//         if (storedCartItems) {
//             setCartItems(JSON.parse(storedCartItems));
//         }

//         // Lấy dữ liệu phản hồi từ localStorage khi component được tải lần đầu tiên
//         const storedFeedbackData = localStorage.getItem('feedbackData');
//         if (storedFeedbackData) {
//             setFeedbackData(JSON.parse(storedFeedbackData));
//         }
//         const storedFeedbackList = localStorage.getItem('feedbackList');
//         if (storedFeedbackList) {
//             setFeedbackList(JSON.parse(storedFeedbackList));
//         }
//     }, []);
//     return (
//         <section>
//             <div>
//                 <div className="title_banner2">
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Feedback</span>
//                 </div>
//                 <p>Product Name: {feedbackData.productName}</p>
//                 <p>Comment: {feedbackData.comment}</p>
//                 <p>Rating: {feedbackData.rating}</p>
//             </div>
//         </section>
//     );
// }
import { useEffect, useState } from "react";

export default function Home() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [newFeedback, setNewFeedback] = useState({ productName: "", comment: "", rating: 0 });

    useEffect(() => {
        // Load feedback list from localStorage
        const storedFeedbackList = localStorage.getItem("feedbackList");
        if (storedFeedbackList) {
            setFeedbackList(JSON.parse(storedFeedbackList));
        }
    }, []);

    // Function to handle form submission for feedback
    const handleSubmitFeedback = (event) => {
        event.preventDefault();
        // Add the new feedback to the list
        const newFeedbackList = [...feedbackList, newFeedback];
        setFeedbackList(newFeedbackList);
        // Update localStorage with the new feedback list
        localStorage.setItem("feedbackList", JSON.stringify(newFeedbackList));
        // Reset the form after submission
        setNewFeedback({ productName: "", comment: "", rating: 0 });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewFeedback({ ...newFeedback, [name]: value });
    };

    // Get the 5 most recent feedback items
    const recentFeedbackList = feedbackList.slice(-5);

    return (
        <div>
            <div className="title_banner2"><span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Feedback</span></div>
            <ul className="feedback-list">
                {recentFeedbackList.map((feedback, index) => (
                    <li key={index} className="feedback-item">
                        <p className="feedback-product-name">Product Name: {feedback.productName}</p>
                        <p className="feedback-comment">Comment: {feedback.comment}</p>
                        <p className="feedback-rating">Rating: {getStarRating(feedback.rating)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Function to get star rating based on numeric rating
const getStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<span key={i} className="star">&#9733;</span>);
    }
    return stars;
};
