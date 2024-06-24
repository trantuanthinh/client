"use client";

import { useEffect, useState } from "react";
import apiService from "../shared/sharedService";

function AuthPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [listCustomers, setListCustomers] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		getCustomers();
		console.log(typeof (JSON.parse(localStorage.getItem("isLoggedIn"))));
		setIsLoggedIn(localStorage.getItem("isLoggedIn"));
	}, []);

	async function getCustomers() {
		try {
			const customers = await apiService.getData("customers");
			setListCustomers(customers.data);
		} catch (error) {
			console.error("Failed to fetch customers: ", error);
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (formData.email && formData.password) {
			const found = listCustomers.find(
				(each) => each.email === formData.email && each.password === formData.password
			);
			if (found) {
				localStorage.setItem("user", JSON.stringify(found));
				localStorage.setItem("isLoggedIn", true);
				setIsLoggedIn(true);
				window.location.reload();
			} else {
				alert("Invalid email or password");
			}
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				{isLoggedIn ? (
					<p className="text-center">Login Successful!</p>
				) : (
					<form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={formData.email}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={formData.password}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}

export default AuthPage;
