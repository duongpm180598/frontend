import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../utils';
import { APIClient } from '../../helper/api_helper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingCategory } from '../../redux/middleware';
import { getCategory } from '../../redux/selector';
const sortOptions = [
  { name: 'Thời Gian Tạo (Giảm Dần)', value: { sort_by: 'created_at', order: 'desc' } },
  { name: 'Giá Tiền (Giảm Dần)', value: { sort_by: 'base_cost', order: 'desc' } },
  { name: 'Thời Gian Tạo (Tăng Dần)', value: { sort_by: 'created_at', order: 'asc' } },
  { name: 'Giá Tiền (Tăng Dần)', value: { sort_by: 'base_cost', order: 'asc' } },
];

export default function FilterHome() {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({ sort_by: '', order: '' });
  const dispatch = useDispatch();
  const category = useSelector(getCategory);
  useEffect(() => {
    dispatch(fetchingCategory());
  }, []);

  console.log('category ::', category);

  const options = category?.map((x) => {
    return { value: x.name, lable: x.name };
  });

  return (
    <div className="bg-gray-50">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
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
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Lọc Sản Phẩm</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                            <span className="font-medium text-gray-900">Category</span>
                            <span className="ml-6 flex items-center">
                              <ChevronDownIcon
                                className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                aria-hidden="true"
                              />
                            </span>
                          </Disclosure.Button>
                        </h3>

                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {category.map((option, optionIdx) => (
                              <div key={option.name} className="flex items-center">
                                <input
                                  id={option.name}
                                  name={option.name}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`${option.name}`} className="ml-3 text-sm text-gray-500">
                                  {option.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/* ))} */}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Xin Chào </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
            Hãy bỏ ưu tư phiền muộn và sản phẩm vào giỏ hàng để chúng tôi xử lý chúng nhé
            {/* <img className="w-10 h-10 object-contain" src={require('../../asset/image/cloud.png')} alt="" /> */}
          </p>
        </div>

        <section aria-labelledby="filter-heading" className="border-t border-gray-200 py-6">
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Tìm Kiếm
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-[200px] origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm font-medium text-gray-900'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Lọc Sản Phẩm
            </button>

            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
              <Popover as="div" className="relative inline-block text-left">
                <div>
                  <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span>Category</span>
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                      {category.map((option, optionIdx) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            id={option.name}
                            name={option.name}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`${category.name}`}
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </form>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            {/* <>
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div class="relative">
                <input
                  type="text"
                  id="default-search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-700 focus:border-gray-700"
                  placeholder="Tìm Sản Phẩm"
                  required
                />
              </div>
            </> */}
          </div>
        </section>
      </div>
    </div>
  );
}
