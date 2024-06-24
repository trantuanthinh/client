"use client";
import { useState } from "react";
import apiService from "../shared/sharedService";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Page() {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const initialUserData = {
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		password: "",
		gender: "",
		dateOfBirth: "",
		address: "",
	};

	const [user, setUser] = useState(initialUserData);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		localStorage.setItem("user", JSON.stringify(user));
		setUser(initialUserData);
		createNewCus();
		alert("Successfully Sign Up.");
	};

	async function createNewCus() {
		try {
			const response = await apiService.postData("customers", user)
			console.log("Successfully to create: ", response);
		} catch (error) {
			console.error("Failed to create: ", error);
		}
	}

	return (
		<div className="isolate bg-white px-6 py-5 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Sign up
				</h2>
				<p className="mt-2 text-lg leading-8 text-gray-600"></p>
			</div>
			<form
				action="#"
				method="POST"
				onSubmit={handleSubmit}
				className="mx-auto mt-16 max-w-xl sm:mt-20"
			>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label
							htmlFor="first-name"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							First name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="first_name"
								id="first-name"
								autoComplete="given-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={user.first_name}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="last-name"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Last name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="last_name"
								id="last-name"
								autoComplete="family-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={user.last_name}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="phone-number"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Phone number
						</label>
						<div className="relative mt-2.5">
							<div className="absolute inset-y-0 left-0 flex items-center">
								<label htmlFor="country" className="sr-only">
									Country
								</label>
								<select
									id="country"
									name="country"
									className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
								>
									<option>VN</option>
								</select>
								{/* <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
							</div>
							<input
								type="tel"
								name="phone"
								id="phone-number"
								autoComplete="tel"
								className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={user.phone}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Email <span className="text-red-500">*</span>
						</label>
						<div className="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={handleChange}
								value={user.email}
								required
							/>
						</div>
					</div>
					<div className="mt-2.5 relative">
						<label
							htmlFor="password"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Password <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								autoComplete="current-password"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={handleChange}
								value={user.password}
								required
							/>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute inset-y-0 right-0 flex items-center px-2"
								style={{ top: "50%", transform: "translateY(-50%)" }}
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						</div>
					</div>

					<div className="sm:col-span-2">
						<label
							htmlFor="gender"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Gender
						</label>
						<div className="mt-2.5 flex items-center space-x-4">
							<label htmlFor="male" className="flex items-center space-x-2">
								<input
									type="radio"
									id="male"
									name="gender"
									value="male"
									className="text-indigo-600 focus:ring-indigo-600"
									onChange={handleChange}
									checked={user.gender === "male"}
								/>
								<span className="text-sm font-medium text-gray-900">Male</span>
							</label>
							<label htmlFor="female" className="flex items-center space-x-2">
								<input
									type="radio"
									id="female"
									name="gender"
									value="female"
									className="text-indigo-600 focus:ring-indigo-600"
									onChange={handleChange}
									checked={user.gender === "female"}
								/>
								<span className="text-sm font-medium text-gray-900">
									Female
								</span>
							</label>
							<label htmlFor="other" className="flex items-center space-x-2">
								<input
									type="radio"
									id="other"
									name="gender"
									value="other"
									className="text-indigo-600 focus:ring-indigo-600"
									onChange={handleChange}
									checked={user.gender === "other"}
								/>
								<span className="text-sm font-medium text-gray-900">Other</span>
							</label>
						</div>
					</div>
					<div className="sm:col-span-2 pt-5">
						<label
							htmlFor="day-of-birth"
							className="block text-sm font-semibold leading-6 text-gray-900 pb-2"
						>
							Date of Birth
						</label>
						<input
							type="date"
							name="dateOfBirth"
							id="day-of-birth"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							value={user.dateOfBirth}
							onChange={handleChange}
						/>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="address"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Address
						</label>
						<div className="mt-2.5">
							<textarea
								name="address"
								id="address"
								rows={4}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={user.address}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
				</div>
				<div className="mt-10">
					<button
						type="submit"
						className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Sign up
					</button>
				</div>
			</form>
		</div>
	);
}
