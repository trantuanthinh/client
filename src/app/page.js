"use client";

import environment from "@/app/environment/environment.js";
import AddToCartButton from "@/components/AddToCartButton";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import Feedback from "@/components/Feedback";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Button, Card, CardBody, CardFooter, Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
const ITEMS_PER_PAGE = 9;
export default function Home() {
	const [data, setData] = useState(null);
	const { push } = useRouter();
	const [cartItems, setCartItems] = useState([]);
	const [feedbackData, setFeedbackData] = useState({});
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let api_url = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/products`;
				let rest_api = { method: "GET" };
				const res = await fetch(api_url, rest_api);
				const dataImg = await res.json();
				for (let item of dataImg.data) {
					item.src = getProdPhotoURL(item.image);
				}
				setData(dataImg.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const storedFeedbackData = localStorage.getItem("feedbackData");
		if (storedFeedbackData) {
			setFeedbackData(JSON.parse(storedFeedbackData));
		}
	}, []);

	function getProdPhotoURL(nameImg) {
		return `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/prod_photo/${nameImg}`;
	}
	const totalPages = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0;
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedData = data ? data.slice(startIndex, endIndex) : [];
	return (
		<main>
			<Banner />
			<section>
				<div className="grid grid-cols-3 gap-4 px-2 py-3">
					{paginatedData.map((value) => (
						<Card
							shadow="sm"
							key={value.id}
							isPressable
							className="card-hover"
							onPress={() => {
								if (value.attributes && value.attributes.slug) {
									push(`/product/${value.attributes.slug}`);
								}
							}}
						>

							<CardBody className="overflow-visible p-0 imageContainer">
								{/* <img
                                    className="w-full h-auto"
                                    alt={value.attributes.name}
                                    src={`http://localhost:1337${value.attributes.image.data.attributes.url}`}
                                /> */}
								{/* Check if value.src exists and render the image */}
								{value.src && (
									<img className="w-full h-auto img-preview" src={value.src} />
								)}
							</CardBody>
							<CardFooter className="text-small flex-col gap-2 card-footer-hover">
								<div className="flex felx-row justify-between gap-2 w-full">
									<b className="truncate">{value.name}</b>
									<p className="text-default-500">${value.price}</p>
								</div>
								<div className="flex flex-row w-full justify-end">
									<AddToCartButton
										variant="bordered"
										color="secondary"
										data={value}
									>
										Add To Cart
									</AddToCartButton>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
				<div className="flex flex-col items-center mt-4 gap-2">
					<Pagination
						total={totalPages}
						color="secondary"
						page={currentPage}
						onChange={setCurrentPage}
					/>
					<div className="flex gap-2">
						<Button
							size="sm"
							variant="flat"
							color="secondary"
							onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
						>
							Previous
						</Button>
						<Button
							size="sm"
							variant="flat"
							color="secondary"
							onPress={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
						>
							Next
						</Button>
					</div>
				</div>
			</section>
			<section className="pt-5">
				<Banner2 />
			</section>
			<section>
				<div className="pt-7 pl-3">
					<Feedback />
					{/* Hiển thị dữ liệu giỏ hàng
          <h2>Cart Items:</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul> */}
					{/* Hiển thị dữ liệu phản hồi */}
					{/* <h2>User Feedback:</h2>
          <p>Product Name: {feedbackData.productName}</p>
          <p>Comment: {feedbackData.comment}</p>
          <p>Rating: {feedbackData.rating}</p> */}
				</div>
			</section>
			<ScrollToTopButton />
		</main>
	);
}
