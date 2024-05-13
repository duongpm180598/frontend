import { useEffect, useState, Fragment } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { authActions } from '../auth/auth.action';
import { useNavigate, NavLink } from 'react-router-dom';
import { userRole } from '../Services/auth.service';
import { useSelector } from 'react-redux';
import { getTotalQuantity } from '../redux/selector';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [totalQuantity, setTotalQuantity] = useState();
  const quantity = useSelector(getTotalQuantity);
  const navigation =
    userRole() !== 'BUYER'
      ? [
          { name: 'Trang Chủ', link: '/' },
          { name: 'Giỏ Hàng', link: '/cart' },
          { name: 'Quản Lý', link: '/manager/order' },
        ]
      : [
          { name: 'Trang Chủ', link: '/' },
          { name: 'Giỏ Hàng', link: '/cart' },
          { name: 'Đơn Hàng', link: '/order' },
        ];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTotalQuantity(quantity);
  }, [quantity]);

  const handleLogout = () => {
    authActions()
      .logout()
      .then((res) => {
        navigate('/login');
      })
      .catch((e) => {
        navigate('/login');
      });
  };

  return (
    <>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.map((x) => (
                    <div key={x.name} className="flow-root">
                      <NavLink to={x.link} className="-m-2 block p-2 font-medium text-gray-900">
                        {x.name}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <header className="relative">
        <nav aria-label="Top">
          {/* Secondary navigation */}
          <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:items-center">
                  <span>
                    <span className="sr-only">Your Company</span>
                    <img className="h-16 w-auto" src={require('../../src/asset/image/logo.png')} alt="#error_picture" />
                  </span>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Mega menus */}
                  <Popover.Group className="ml-8">
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.map((x) => (
                        <NavLink
                          to={x.link}
                          key={x.name}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {x.name}
                        </NavLink>
                      ))}
                    </div>
                  </Popover.Group>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Search */}
                  {/* <input type="text" /> */}
                  {/* <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a> */}
                </div>

                {/* Logo (lg-) */}
                <span className="lg:hidden">
                  <span className="sr-only">Your Company</span>
                  <img src={require('../asset/image/logo.png')} alt="" className="h-16 w-auto" />
                </span>

                <div className="flex flex-1 items-center justify-end">
                  <div className="flex items-center lg:ml-8">
                    <div className="flex space-x-8">
                      {/* <div className="hidden lg:flex">
                        <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Search</span>
                          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      </div> */}

                      <div className="flex">
                        <NavLink to="/cart" className="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            {totalQuantity}
                          </span>
                          <span className="sr-only">items in cart, view bag</span>
                        </NavLink>
                      </div>
                    </div>

                    <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                    <div className="flow-root">
                      <button onClick={handleLogout} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Logout</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
