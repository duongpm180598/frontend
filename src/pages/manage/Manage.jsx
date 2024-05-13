import React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { userRole } from '../../Services/auth.service';
import {
  FolderIcon,
  ServerIcon,
  XMarkIcon,
  HomeIcon,
  ShoppingCartIcon,
  DocumentArrowDownIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { NavLink, Outlet } from 'react-router-dom';
import { classNames } from '../../utils';

function ManageComponent() {
  const role = userRole();

  const navigation =
    role === 'ADMIN'
      ? [
        { name: 'Đơn Hàng', link: 'order', icon: ShoppingCartIcon },
        { name: 'Dánh sách sản phẩm', link: 'products', icon: FolderIcon },
          //   { name: 'Chỉnh Sửa Sản Phẩm', link: 'update', icon: ServerIcon },
          { name: 'Thống kê sản phẩm', link: 'product-statistic', icon: ChartPieIcon },
          { name: 'Thống kê doanh thu', link: 'revenue-statistic', icon: ChartPieIcon },
          { name: 'Trang Chủ', link: '../', icon: HomeIcon },
        ]
      : role === 'SELLER'
      ? [
          { name: 'Đơn Hàng', link: 'order', icon: ShoppingCartIcon },
          { name: 'Trang Chủ', link: '../', icon: HomeIcon },
        ]
      : [
          { name: 'Dánh sách sản phẩm', link: 'products', icon: FolderIcon },
          //   { name: 'Tạo Sản Phẩm', link: 'create-product', icon: FolderIcon },
          //   { name: 'Chỉnh Sửa Sản Phẩm', link: 'update', icon: ServerIcon },
          { name: 'Nhập hàng', link: 'import', icon: DocumentArrowDownIcon },
          { name: 'Trang Chủ', link: '../', icon: HomeIcon },
        ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen absolute inset-0 z-10 bg-gray-50">
      <>
        <div className="">
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-50/80" />
              </Transition.Child>

              <div className="fixed inset-0 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 ring-1 ring-white/10">
                      <div className="flex h-16 shrink-0 items-center">
                        <img className="h-14 w-auto" src={require('../../asset/image/logo.png')} alt="Your Company" />
                      </div>
                      <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                              {navigation.map((item) => (
                                <li key={item.name}>
                                  <NavLink
                                    to={item.link}
                                    className={classNames(
                                      item.current
                                        ? 'bg-gray-400 text-white'
                                        : 'text-gray-800 hover:text-black hover:bg-gray-400',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                                    )}
                                  >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {item.name}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col h-auto">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50/10 px-6 ring-1 ring-white/5">
              <div className="flex h-16 shrink-0 items-center">
                <img className="h-12 w-auto" src={require('../../asset/image/logo.png')} alt="Your Company" />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <NavLink
                            to={item.link}
                            className={(navClass) => {
                              return navClass.isActive
                                ? 'bg-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                                : ' text-gray-700 hover:text-black hover:bg-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer bg-none';
                            }}
                            end
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="xl:pl-72 h-screen overflow-y-scroll">
            {/* Sticky search header */}
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-50 lg:bg-[#f6f6f6] px-4 shadow-sm sm:px-6 lg:px-8">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-800 xl:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <main className="w-full bg-[#f6f6f6] border-t-0  border rounded min-h-screen">
              <Outlet></Outlet>
            </main>
          </div>
        </div>
      </>
    </div>
  );
}

export default ManageComponent;
