import { useEffect, useState, Fragment } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { authActions } from '../auth/auth.action';
import { useNavigate, NavLink } from 'react-router-dom';
import { isAdmin } from '../Services/auth.service';
import { useSelector } from 'react-redux';
import { getTotalQuantity } from '../redux/selector';
import { classNames } from '../utils';
// import { Fragment, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const navigation =
  isAdmin() == 'ADMIN'
    ? [
        { name: 'Home', link: '/' },
        { name: 'Features', link: '/feature' },
        { name: 'Cart', link: '/cart' },
        { name: 'Checkout', link: '/checkout' },
        { name: 'Manager', link: '/manager' },
      ]
    : [
        { name: 'Home', link: '/' },
        { name: 'Features', link: '/feature' },
        { name: 'cart', link: '/cart' },
        { name: 'Checkout', link: '/checkout' },
      ];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [totalQuantity, setTotalQuantity] = useState();
  const quantity = useSelector(getTotalQuantity);
  const navigation =
    isAdmin() == 'ADMIN'
      ? [
          { name: 'Home', link: '/' },
          { name: 'Features', link: '/feature' },
          { name: 'Cart', link: '/cart' },
          { name: 'Checkout', link: '/checkout' },
          { name: 'Manager', link: '/manager' },
        ]
      : [
          { name: 'Home', link: '/' },
          { name: 'Features', link: '/feature' },
          { name: 'cart', link: '/cart' },
          { name: 'Checkout', link: '/checkout' },
        ];

  // 2
  const [open, setOpen] = useState(false);

  // const navigation = {
  //   categories: [
  //     {
  //       name: 'Women',
  //       featured: [
  //         { name: 'Sleep', href: '#' },
  //         { name: 'Swimwear', href: '#' },
  //         { name: 'Underwear', href: '#' },
  //       ],
  //       collection: [
  //         { name: 'Everything', href: '#' },
  //         { name: 'Core', href: '#' },
  //         { name: 'New Arrivals', href: '#' },
  //         { name: 'Sale', href: '#' },
  //       ],
  //       categories: [
  //         { name: 'Basic Tees', href: '#' },
  //         { name: 'Artwork Tees', href: '#' },
  //         { name: 'Bottoms', href: '#' },
  //         { name: 'Underwear', href: '#' },
  //         { name: 'Accessories', href: '#' },
  //       ],
  //       brands: [
  //         { name: 'Full Nelson', href: '#' },
  //         { name: 'My Way', href: '#' },
  //         { name: 'Re-Arranged', href: '#' },
  //         { name: 'Counterfeit', href: '#' },
  //         { name: 'Significant Other', href: '#' },
  //       ],
  //     },
  //     {
  //       name: 'Men',
  //       featured: [
  //         { name: 'Casual', href: '#' },
  //         { name: 'Boxers', href: '#' },
  //         { name: 'Outdoor', href: '#' },
  //       ],
  //       collection: [
  //         { name: 'Everything', href: '#' },
  //         { name: 'Core', href: '#' },
  //         { name: 'New Arrivals', href: '#' },
  //         { name: 'Sale', href: '#' },
  //       ],
  //       categories: [
  //         { name: 'Artwork Tees', href: '#' },
  //         { name: 'Pants', href: '#' },
  //         { name: 'Accessories', href: '#' },
  //         { name: 'Boxers', href: '#' },
  //         { name: 'Basic Tees', href: '#' },
  //       ],
  //       brands: [
  //         { name: 'Significant Other', href: '#' },
  //         { name: 'My Way', href: '#' },
  //         { name: 'Counterfeit', href: '#' },
  //         { name: 'Re-Arranged', href: '#' },
  //         { name: 'Full Nelson', href: '#' },
  //       ],
  //     },
  //   ],
  //   pages: [
  //     { name: 'Company', href: '#' },
  //     { name: 'Stores', href: '#' },
  //   ],
  // };
  //
  useEffect(() => {
    setTotalQuantity(quantity);
  }, [quantity]);

  const handleLogout = () => {
    authActions()
      .logout()
      .then((res) => {
        console.log(res);
        navigate('/login');
      })
      .catch((e) => {
        console.log('called in header: ', e);
      });
  };

  // <header className="bg-white">
  //   <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
  //     <div className="flex lg:flex-1">
  //       <a href="#" className="-m-1.5 p-1.5">
  //         <span className="sr-only">Your Company</span>
  //         <img className="h-8 w-auto" src={require('./../asset/image/logo.png')} alt="" />
  //       </a>
  //     </div>
  //     <div className="flex lg:hidden">
  //       <button
  //         type="button"
  //         className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
  //         onClick={() => setMobileMenuOpen(true)}
  //       >
  //         <span className="sr-only">Open main menu</span>
  //         <Bars3Icon className="h-6 w-6" aria-hidden="true" />
  //       </button>
  //     </div>

  //     <div className="hidden lg:flex lg:gap-x-12">
  //       {navigation.map((item) => {
  //         return item.name == 'Cart' ? (
  //           <NavLink
  //             key={item.name}
  //             to={item.link}
  //             className="relative text-sm font-semibold leading-6 text-gray-900"
  //           >
  //             {item.name}
  //             <div className=" flex justify-center items-center absolute w-8 h-8 top-[-18px] right-[-30px] p-1.5 rounded-[50%] bg-active text-white">
  //               {totalQuantity}
  //             </div>
  //           </NavLink>
  //         ) : (
  //           <NavLink key={item.name} to={item.link} className="text-sm font-semibold leading-6 text-gray-900">
  //             {item.name}
  //           </NavLink>
  //         );
  //       })}
  //     </div>
  //     <div className="hidden lg:flex lg:flex-1 lg:justify-end">
  //       <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
  //         Log Out <span aria-hidden="true">&rarr;</span>
  //       </button>
  //     </div>
  //   </nav>
  //   <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
  //     <div className="fixed inset-0 z-10" />
  //     <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
  //       <div className="flex items-center justify-between">
  //         <a href="#" className="-m-1.5 p-1.5">
  //           <span className="sr-only">Your Company</span>
  //           <img className="h-8 w-auto" src={require('./../asset/image/logo.png')} alt="" />
  //         </a>
  //         <button
  //           type="button"
  //           className="-m-2.5 rounded-md p-2.5 text-gray-700"
  //           onClick={() => setMobileMenuOpen(false)}
  //         >
  //           <span className="sr-only">Close menu</span>
  //           <XMarkIcon className="h-6 w-6" aria-hidden="true" />
  //         </button>
  //       </div>
  //       <div className="mt-6 flow-root">
  //         <div className="-my-6 divide-y divide-gray-500/10">
  //           <div className="space-y-2 py-6">
  //             {navigation.map((item) => (
  //               <NavLink
  //                 key={item.name}
  //                 to={item.link}
  //                 className="-mx-3 cursor-pointer  block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
  //               >
  //                 {item.name}
  //               </NavLink>
  //             ))}
  //           </div>
  //           <div className="py-6">
  //             <a
  //               href="#"
  //               className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
  //             >
  //               Log in
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </Dialog.Panel>
  //   </Dialog>
  // </header>
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
                      <a className="-m-2 block p-2 font-medium text-gray-900">{x.name}</a>
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
          {/* Top navigation */}

          {/* Secondary navigation */}
          <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:items-center">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Mega menus */}
                  <Popover.Group className="ml-8">
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.categories.map((category, categoryIdx) => (
                        <Popover key={category.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  className={classNames(
                                    open
                                      ? 'border-indigo-600 text-indigo-600'
                                      : 'border-transparent text-gray-700 hover:text-gray-800',
                                    'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                  )}
                                >
                                  {category.name}
                                </Popover.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute inset-x-0 top-full -translate-y-px transform bg-white text-sm text-gray-500">
                                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                  <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                  {/* Fake border when menu is open */}
                                  <div
                                    className="absolute inset-0 top-0 z-10 mx-auto h-px max-w-7xl px-8"
                                    aria-hidden="true"
                                  >
                                    <div
                                      className={classNames(
                                        open ? 'bg-gray-200' : 'bg-transparent',
                                        'h-px w-full transition-colors duration-200 ease-out'
                                      )}
                                    />
                                  </div>

                                  <div className="relative">
                                    <div className="mx-auto max-w-7xl px-8">
                                      <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                          <div>
                                            <p
                                              id={`desktop-featured-heading-${categoryIdx}`}
                                              className="font-medium text-gray-900"
                                            >
                                              Featured
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {category.featured.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <a href={item.href} className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                          <div>
                                            <p id="desktop-categories-heading" className="font-medium text-gray-900">
                                              Categories
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby="desktop-categories-heading"
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {category.categories.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <a href={item.href} className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                          <div>
                                            <p id="desktop-collection-heading" className="font-medium text-gray-900">
                                              Collection
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby="desktop-collection-heading"
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {category.collection.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <a href={item.href} className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>

                                          <div>
                                            <p id="desktop-brand-heading" className="font-medium text-gray-900">
                                              Brands
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby="desktop-brand-heading"
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {category.brands.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <a href={item.href} className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}

                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </a>
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
                  <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Logo (lg-) */}
                <a href="#" className="lg:hidden">
                  <span className="sr-only">Your Company</span>
                  <img
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                    className="h-8 w-auto"
                  />
                </a>

                <div className="flex flex-1 items-center justify-end">
                  <div className="flex items-center lg:ml-8">
                    <div className="flex space-x-8">
                      <div className="hidden lg:flex">
                        <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Search</span>
                          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      </div>

                      <div className="flex">
                        <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Account</span>
                          <UserIcon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                    <div className="flow-root">
                      <a href="#" className="group -m-2 flex items-center p-2">
                        <ShoppingCartIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
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
