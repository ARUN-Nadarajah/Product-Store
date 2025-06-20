import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-900 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          {/* LEFT: Product Store title */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center">
              <Link to="/">
                <span className="text-white dark:text-gray-200 text-xl font-bold">
                  Product Store
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: Theme toggle & Add product */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-white hover:text-yellow-400 transition"
              title="Toggle Theme"
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
            </button>
            <Link
              to="/addProduct"
              className="text-white hover:text-indigo-400 transition"
              title="Add Product"
            >
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </Link>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="px-2 pb-3 pt-2">{/* Mobile nav if needed */}</div>
      </DisclosurePanel>
    </Disclosure>
  );
}
