"use client";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
useEffect(() => {
  const storedFormData = localStorage.getItem("formData");
  if (storedFormData) {
    setFormData(JSON.parse(storedFormData));
  }
}, []);
export default function Page() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dayOfBirth: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      "We have received your information, the store will contact you later via your phone number. Thank you!"
    );
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      dayOfBirth: "",
    });
  };

  return (
    <div className="isolate bg-white px-6 py-5 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Register
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
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.firstName} // Hiển thị giá trị của trường firstName
                onChange={handleChange}
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
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.lastName}
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
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
                {/* <ChevronDownIcon
                    className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                /> */}
              </div>
              <input
                type="tel"
                name="phoneNumber"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.email}
              />
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
                  checked={formData.gender === "male"}
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
                  checked={formData.gender === "female"}
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
                  checked={formData.gender === "other"}
                />
                <span className="text-sm font-medium text-gray-900">Other</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="day-of-birth"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dayOfBirth"
                id="day-of-birth"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.dayOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
}
