"use client";

import AddToCartButton from "@/components/AddToCartButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import apiService from "../shared/sharedService";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Designed_Cake() {
	const [listShape, setListShape] = useState([]);
	const [listSize, setListSize] = useState([]);
	const [listFlavour, setListFlavour] = useState([]);

	const [listFruit, setListFruit] = useState([]);
	const [listAnimal, setListAnimal] = useState([]);
	const [listSex, setListSex] = useState([]);
	const [listCandle, setListCandle] = useState([]);

	const [cakeName, setCakeName] = useState("");
	const [user, setUser] = useState("");
	const [message, setMessage] = useState("");

	const [selectFruits, setSelectFruits] = useState([]);
	const [selectAnimals, setSelectAnimals] = useState([]);
	const [selectSex, setSelectSex] = useState([]);
	const [selectCandles, setSelectCandles] = useState([]);

	const [selectedShape, setSelectedShape] = React.useState(new Set());
	const selectedShapeValue = React.useMemo(() => {
		if (selectedShape.size > 0) {
			const selected = Array.from(selectedShape)[0];
			return `${selected.shape} - $${selected.price}`;
		}
		return "Shapes";
	}, [selectedShape]);

	const [selectedSize, setSelectedSize] = React.useState(new Set());
	const selectedSizeValue = React.useMemo(() => {
		if (selectedSize.size > 0) {
			const selected = Array.from(selectedSize)[0];
			return `${selected.size} - $${selected.price}`;
		}
		return "Sizes";
	}, [selectedSize]);

	const [selectedFlavour, setSelectedFlavour] = React.useState(new Set());
	const selectedFlavourValue = React.useMemo(() => {
		if (selectedSize.size > 0) {
			const selected = Array.from(selectedFlavour)[0];
			return `${selected.flavour} - $${selected.price}`;
		}
		return "Flavours";
	}, [selectedFlavour]);

	const totalPrice = React.useMemo(() => {
		const selectedShapeItem = Array.from(selectedShape)[0];
		const selectedSizeItem = Array.from(selectedSize)[0];
		const selectedFlavourItem = Array.from(selectedFlavour)[0];
		const shapePrice = parseFloat(selectedShapeItem?.price) || 0;
		const sizePrice = parseFloat(selectedSizeItem?.price) || 0;
		const flavourPrice = parseFloat(selectedFlavourItem?.price) || 0;

		const fruitPrice = calculateFruitPrice();
		const animalPrice = calculateAnimalPrice();
		const sexPrice = calculateSexPrice();
		const candlePrice = calculateCandlePrice();

		return shapePrice + sizePrice + flavourPrice + fruitPrice + animalPrice + sexPrice + candlePrice;
	}, [selectFruits, selectAnimals, selectSex, selectCandles, selectedShape, selectedSize, selectedFlavour]);

	const [cakes, setCakes] = useState([]);

	useEffect(() => {
		getUser();
		fetchAllData();
		fetchCakes();
	}, []);

	function getUser() {
		setUser(JSON.parse(localStorage.getItem("user")));
	}

	async function fetchAllData() {
		try {
			const [shapeData, sizeData, flavourData, decorData] = await Promise.all([
				apiService.getData("shapes"),
				apiService.getData("sizes"),
				apiService.getData("flavours"),
				apiService.getData("decors"),
			]);

			setListShape(shapeData.data);
			setListSize(sizeData.data);
			setListFlavour(flavourData.data);

			const [fruits, animals, sex, candles] = ["fruits", "animals", "sex", "candles"].map((type) =>
				decorData.data
					.filter((item) => item.type === type)
					.map((item) => ({
						...item,
						imageSrc: apiService.getDecorPhotoURL(item.image),
					}))
			);
			setListFruit(fruits);
			setListAnimal(animals);
			setListSex(sex);
			setListCandle(candles);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	async function fetchCakes() {
		try {
			const cakesData = await apiService.getData("des_products");
			setCakes(cakesData.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	async function getLatestDesignedProduct() {
		try {
			const response = await apiService.getData("des_products/last");
			return response;
		} catch (error) {
			throw new Error("Failed To Fetch Latest Cake: ", error);
		}
	}

	async function createDesignedProduct(endpoint, data) {
		try {
			const response = await apiService.postData(endpoint, data);
			return response;
		} catch (error) {
			throw new Error("Failed To Create: ", error);
		}
	}

	function handleCakeNameChange(event) {
		setCakeName(event.target.value);
	}

	function handleMessageChange(event) {
		setMessage(event.target.value);
	}

	function handleFruitSelectionChange(newSelection) {
		if (newSelection.length <= 2) {
			setSelectFruits(newSelection);
		}
	}

	function handleAnimalSelectionChange(newSelection) {
		if (newSelection.length <= 1) {
			setSelectAnimals(newSelection);
		}
	}

	function handleSexSelectionChange(newSelection) {
		if (newSelection.length <= 1) {
			setSelectSex(newSelection);
		}
	}

	function handleCandleSelectionChange(newSelection) {
		if (newSelection.length <= 1) {
			setSelectCandles(newSelection);
		}
	}

	function calculateFruitPrice() {
		return selectFruits.reduce((totalPrice, each) => {
			const selectedFruit = listFruit.find((item) => item.decor_id === each);
			if (selectedFruit) {
				return totalPrice + parseFloat(selectedFruit.price);
			}
			return totalPrice;
		}, 0);
	}

	function calculateAnimalPrice() {
		return selectAnimals.reduce((totalPrice, each) => {
			const selectedAnimal = listAnimal.find((item) => item.decor_id === each);
			if (selectedAnimal) {
				return totalPrice + parseFloat(selectedAnimal.price);
			}
			return totalPrice;
		}, 0);
	}

	function calculateSexPrice() {
		return selectSex.reduce((totalPrice, each) => {
			const selectedSex = listSex.find((item) => item.decor_id === each);
			if (selectedSex) {
				return totalPrice + parseFloat(selectedSex.price);
			}
			return totalPrice;
		}, 0);
	}

	function calculateCandlePrice() {
		return selectCandles.reduce((totalPrice, each) => {
			const selectedCandle = listCandle.find((item) => item.decor_id === each);
			if (selectedCandle) {
				return totalPrice + parseFloat(selectedCandle.price);
			}
			return totalPrice;
		}, 0);
	}
	function showConfirmationMessage(message) {
		alert(message);
	}

	async function saveDesignedProduct() {
		if (!user) {
			alert("Please Sign In");
			return;
		}
		const selectedSizeId = Array.from(selectedSize)[0]?.size_id || null;
		const selectedShapeId = Array.from(selectedShape)[0]?.shape_id || null;
		const selectedFlavourId = Array.from(selectedFlavour)[0]?.flavour_id || null;

		const designedProduct = {
			cus_id: user.cus_id,
			category_id: 1,
			size_id: selectedSizeId,
			shape_id: selectedShapeId,
			flavour_id: selectedFlavourId,
			name: cakeName,
			message: message,
			price: totalPrice,
			originPrice: 1,
			status: "active",
		};
		await createDesignedProduct("des_products", designedProduct);

		const lastData = await getLatestDesignedProduct();

		const designedProductDetails = {
			des_prod_id: lastData.data.des_prod_id,
			decor_id: [selectFruits, selectAnimals, selectSex, selectCandles],
			quantity: 1,
		};
		await createDesignedProduct("des_prod_details", designedProductDetails);
		fetchCakes();
		showConfirmationMessage("We have received information about the cake you created");
	}

	async function handleDelete(id) {
		try {
			const responseProducts = await apiService.deleteData("des_products", id);
			console.log(responseProducts);
			showConfirmationMessage("You have successfully deleted the cake");
			fetchCakes();
		} catch (error) {
			console.error("Error Deleting Data:", error);
		}
	}

	return (
		<div className="main_designed_cake">
			<div className="selected_items ">
				<div className="isolate bg-white px-6 py-5 lg:px-4">
					<div className="mx-auto max-w-2xl text-center">
						<div className="title_designed_cake">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
								LET'S DESIGN YOUR CAKE
							</span>
						</div>
						<div>
							<center>
								<Image src="/images/designed_cake.jpg" alt="picture" width={100} height={100} />
							</center>
						</div>
						<p className="mt-1 text-lg leading-8 text-gray-600"></p>
					</div>
					{/* <form action="#" method="POST" className="mx-auto mt-2 max-w-xl sm:mt-2"> */}
					<div className="pl-8">
						{/* <div className="enter_name_des">
							<label
								htmlFor="message"
								className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
							>
								Let's enter your name
							</label>
							<textarea
								name="message"
								id="message"
								rows={2}
								className="block w-full md:w-2/3 h-10 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={cakeName}
								onChange={handleCakeNameChange}
							/>


						</div> */}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4" style={{ justifyItems: 'space-between' }}>
							<div className="sm:col-span-1 ">
								<label
									htmlFor="message"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900 overflow-wrap break-word pb-4"
									style={{ width: '100%' }}
								>
									Let's enter your name
								</label>

								<textarea
									name="message"
									id="message"
									rows={2}
									className="block w-full md:w-1/2 h-8 rounded-md border-0 px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
									value={cakeName}
									onChange={handleCakeNameChange}
								/>

							</div>
							<div className="sm:col-span-1 ">
								<label
									htmlFor="shape"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Shape
								</label>
								<div className="mt-2.5">
									<Dropdown>
										<DropdownTrigger>
											<Button variant="bordered" className="capitalize">
												{selectedShapeValue}
											</Button>
										</DropdownTrigger>
										<DropdownMenu
											aria-label="Single selection example"
											variant="flat"
											disallowEmptySelection
											selectionMode="single"
											selectedKeys={selectedShape}
											onSelectionChange={(key) => {
												const selected = listShape.find(
													(each) => each.shape === key.currentKey
												);
												setSelectedShape(new Set([selected]));
											}}
										>
											{Array.isArray(listShape) &&
												listShape.map((each) => (
													<DropdownItem
														key={each.shape}
														data-price={each.price}
														value={each.shape}
														textValue={`${each.shape} - ${each.price}`}
													>
														{each.shape} - ${each.price}
													</DropdownItem>
												))}
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>

							<div className="sm:col-span-1">
								<label
									htmlFor="size"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Size
								</label>
								<div className="mt-2 ">
									<Dropdown>
										<DropdownTrigger>
											<Button variant="bordered" className="capitalize">
												{selectedSizeValue}
											</Button>
										</DropdownTrigger>
										<DropdownMenu
											aria-label="Single selection example"
											variant="flat"
											disallowEmptySelection
											selectionMode="single"
											selectedKeys={selectedSize}
											onSelectionChange={(key) => {
												const selected = listSize.find(
													(each) => each.size === key.currentKey
												);
												setSelectedSize(new Set([selected]));
											}}
										>
											{Array.isArray(listSize) &&
												listSize.map((each) => (
													<DropdownItem
														key={each.size}
														data-price={each.price}
														value={each.size}
														textValue={`${each.size} - ${each.price}`}
													>
														{each.size} - ${each.price}
													</DropdownItem>
												))}
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>

							<div className="sm:col-span-1">
								<label
									htmlFor="flavour"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Flavour
								</label>
								<div className="mt-2.5">
									<div>
										<Dropdown>
											<DropdownTrigger>
												<Button variant="bordered" className="capitalize">
													{selectedFlavourValue}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												aria-label="Single selection example"
												variant="flat"
												disallowEmptySelection
												selectionMode="single"
												selectedKeys={selectedFlavour}
												onSelectionChange={(key) => {
													const selected = listFlavour.find(
														(each) => each.flavour === key.currentKey
													);
													setSelectedFlavour(new Set([selected]));
												}}
											>
												{Array.isArray(listFlavour) &&
													listFlavour.map((each) => (
														<DropdownItem
															key={each.flavour}
															data-price={each.price}
															value={each.flavour}
															textValue={`${each.shape} - ${each.price}`}
														>
															{each.flavour} - ${each.price}
														</DropdownItem>
													))}
											</DropdownMenu>
										</Dropdown>
									</div>
								</div>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="sticker"
								className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
							>
								Decorations
							</label>
							<div className="relative mt-1.5">
								<div>
									<label>Fruits</label>
								</div>
								<div>
									<CheckboxGroup
										orientation="horizontal"
										color="secondary"
										value={selectFruits}
										onChange={handleFruitSelectionChange}
									>
										{listFruit.map((each) => (
											<Checkbox key={each.decor_id} value={each.decor_id}>
												<div className="fruit-checkbox">
													<img
														src={each.imageSrc}
														alt={each.name}
														width={80}
														height={100}
													/>
												</div>
											</Checkbox>
										))}
									</CheckboxGroup>
								</div>
							</div>
							<div className="relative mt-2.5">
								<div>
									<label>Animals</label>
								</div>
								<div>
									<CheckboxGroup
										orientation="horizontal"
										color="secondary"
										value={selectAnimals}
										onChange={handleAnimalSelectionChange}
									>
										{listAnimal.map((each) => (
											<Checkbox key={each.decor_id} value={each.decor_id}>
												<div className="animal-checkbox">
													<img
														src={each.imageSrc}
														alt={each.name}
														width={70}
														height={70}
													/>
												</div>
											</Checkbox>
										))}
									</CheckboxGroup>
									{/* <p>Total Price: ${calculateTotalPrice()}</p> */}
								</div>
							</div>
							<div className="relative mt-2.5">
								<div>
									<label>Drawing</label>
								</div>
								<div>
									<CheckboxGroup
										className="container_image_designed_cake"
										orientation="horizontal"
										color="secondary"
										defaultValue={[]}
										value={selectSex}
										onChange={handleSexSelectionChange}
									>
										{listSex.map((each) => (
											<Checkbox key={each.decor_id} value={each.decor_id}>
												<div className="sex-checkbox">
													<img
														src={each.imageSrc}
														alt={each.name}
														width={70}
														height={70}
													/>
												</div>
											</Checkbox>
										))}
									</CheckboxGroup>
									{/* <p>Total Price: ${calculateTotalPrice()}</p> */}
								</div>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="sticker"
							// className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Candles (Accessory)
							</label>
							<div className="relative mt-1.5">
								<div>
									<CheckboxGroup
										className="container_image_designed_cake"
										orientation="horizontal"
										color="secondary"
										defaultValue={[]}
										value={selectCandles}
										onChange={handleCandleSelectionChange}
									>
										{listCandle.map((each) => (
											<Checkbox key={each.decor_id} value={each.decor_id}>
												<div className="candle-checkbox">
													<img
														src={each.imageSrc}
														alt={each.name}
														width={70}
														height={70}
													/>
												</div>
											</Checkbox>
										))}
									</CheckboxGroup>
								</div>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="message"
								className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
							>
								Message
							</label>
							<div className="mt-2.5 pb-7 " style={{ maxWidth: "450px" }}>
								<textarea
									name="message"
									id="message"
									rows={2}
									className="block w-full rounded-md border-0 px-3.5 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={message}
									onChange={handleMessageChange}
								/>
							</div>
							<table className="table_designed_cake">
								<thead>
									<tr>
										<th>
											<div className="text-center">Name</div>
										</th>
										<th>
											<div className="text-center">Total Price</div>
										</th>
										<th>
											<div className="text-center">Actions</div>
										</th>
									</tr>
								</thead>
								<tbody>
									{Array.isArray(cakes) &&
										cakes.map((cake) => (
											<tr key={cake.des_prod_id}>
												<td>{cake.name}</td>
												<td>${cake.price}</td>
												<td>
													<AddToCartButton
														variant="bordered"
														color="#ff0000"
														data={cake}
													>
														Add To Cart
													</AddToCartButton>
													<button
														className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
														onClick={() => handleDelete(cake.des_prod_id)}
														style={{
															backgroundColor: "#ff0000",
															color: "#fff",
															border: "none",
															padding: "8px 16px",
															borderRadius: "4px",
															cursor: "pointer",
														}}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
					{/* </form> */}
				</div>
			</div>
			<div className="detail_designed_cake">
				<div className="title_designed_cake mx-auto max-w-2xl text-center pt-5">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
						A DESIGNED CAKE INFORMATION
					</span>
				</div>
				<div className="information_designed_cake">
					<div className="body_designed_cake">
						<div className="name_designed_cake">Shape: </div>
						<div>{selectedShapeValue}</div>
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="body_designed_cake">
						<div className="name_designed_cake">Size: </div>
						<div>{selectedSizeValue}</div>
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="body_designed_cake">
						<div className="name_designed_cake">Flavour: </div>
						<div>{selectedFlavourValue}</div>
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="name_designed_cake decoration_container">Decorations: </div>
					<div>
						{selectFruits.length > 0 ? (
							selectFruits.map((value, index) => {
								const fruit = listFruit.find((item) => item.decor_id === value);
								return (
									<div className="fruit_price" key={index}>
										{fruit ? (
											<div>
												<span>
													{fruit.name} - ${fruit.price}
												</span>
											</div>
										) : null}
									</div>
								);
							})
						) : (
							<div>No Fruits</div>
						)}
					</div>
					<div>
						{selectAnimals.length > 0 ? (
							selectAnimals.map((value, index) => {
								const animal = listAnimal.find((item) => item.decor_id === value);
								return (
									<div className="animal_price" key={index}>
										{animal ? (
											<div>
												<span>
													{animal.name} - ${animal.price}
												</span>
											</div>
										) : null}
									</div>
								);
							})
						) : (
							<div>No Animals</div>
						)}
					</div>
					<div>
						{selectSex.length > 0 ? (
							selectSex.map((value, index) => {
								const sex = listSex.find((item) => item.decor_id === value);
								return (
									<div className="sex_price" key={index}>
										{sex ? (
											<div>
												<span>
													{sex.name} - ${sex.price}
												</span>
											</div>
										) : null}
									</div>
								);
							})
						) : (
							<div>No Drawing</div>
						)}
					</div>
					<div>
						{selectCandles.length > 0 ? (
							selectCandles.map((value, index) => {
								const candle = listCandle.find((item) => item.decor_id === value);
								return (
									<div className="candle_price" key={index}>
										{candle ? (
											<div>
												<span>
													{candle.name} - ${candle.price}
												</span>
											</div>
										) : null}
									</div>
								);
							})
						) : (
							<div>No Candles</div>
						)}
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="body_designed_cake">
						{" "}
						<div className="name_designed_cake">Message: </div>
						<div>{message}</div>
					</div>{" "}
					<div style={{ borderBottom: "2px solid #000" }}></div>
				</div>

				<div className="price_of_designed_cake">
					<div className="title_designed_cake mx-auto max-w-2xl text-center pt-5">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
							PRICE OF DESIGNED CAKE
						</span>
					</div>

					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="total_price" id="title_designed_cake_price">
						<div className="text_title_designed_cake_price">Total Price:</div>
						<div>${totalPrice}</div>
					</div>
				</div>

				<div>
					<div className="flex justify-center">
						<button
							className="bg-white border border-purple-500 hover:bg-purple-500 hover:text-white font-bold py-2 px-4 rounded-full"
							onClick={saveDesignedProduct}
						>
							Create
						</button>

						{/* <AddToCartButton
							variant="bordered"
							color="secondary"
							data={() => saveDesignedProduct()}
						>
							Add To Cart
						</AddToCartButton> */}
					</div>
				</div>

				<div className="image_footer_designed_cake">
					{" "}
					<center>
						<Image src="/images/logo2.jpg" alt="picture" width={200} height={80} />
					</center>
				</div>
				<ScrollToTopButton />
			</div>
		</div>
	);
}
