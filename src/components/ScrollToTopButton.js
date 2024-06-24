import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Xử lý việc hiển thị hoặc ẩn nút scroll
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    // Xử lý scroll lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md"
                    onClick={scrollToTop}
                >
                    Scroll Top
                </button>
            )}
        </>
    );
}
