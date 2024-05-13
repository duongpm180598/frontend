import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Popover, Transition, Listbox } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../utils';
import { APIClient } from '../../helper/api_helper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingCategory } from '../../redux/middleware';
import { getCategory } from '../../redux/selector';
import _ from 'lodash';

const sortOptions = [
  { name: 'Default', value: {} },
  { name: 'Thời Gian Tạo Gần Đây', value: { sort_by: 'created_at', order: 'desc' } },
  { name: 'Giá Tiền (Giảm Dần)', value: { sort_by: 'base_cost', order: 'desc' } },
  { name: 'Giá Tiền (Tăng Dần)', value: { sort_by: 'base_cost', order: 'asc' } },
];

export default function FilterHome({ params, setParams }) {
  const dispatch = useDispatch();
  const [currCategory, setCurrCategory] = useState('Phân Loại');
  const [currSort, setCurrSort] = useState('Sắp Xếp');
  const reduxCategory = useSelector(getCategory);
  const formatCategory = [{ id: '', name: 'Default' }, ...reduxCategory.map((x) => ({ id: x.id, name: x.name }))];

  useEffect(() => {
    dispatch(fetchingCategory());
  }, []);

  return (
    <div className="bg-gray-50 mt-3">
      <div className="mx-auto max-w-3xl py-2 text-center  lg:max-w-7xl">
        <section aria-labelledby="filter-heading" className="border-t border-gray-200 py-6">
          <div className="grid md:grid-cols-12 lg:gap-x-8 lg:py-8 md:gap-x-6 ssm:gap-y-3 items-center">
            {/* filter name */}
            <div className="rounded-lg lg:col-span-4 md:col-span-6">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="default-search"
                  name="name"
                  value={params.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setParams({ ...params, name: value });
                  }}
                  className="shadow-md block w-full px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus-visible:border-gray-400 focus-visible:ring-white "
                  placeholder="Tìm Sản Phẩm"
                />
              </div>
            </div>

            <div className="grid lg:col-span-8 lg:grid-cols-12 md:col-span-12 md:grid-cols-12 md:gap-x-6 ssm:gap-y-3">
              {/* category */}
              <div className="md:col-span-6 z-10 ssm:w-full">
                <Listbox
                  value={currCategory}
                  onChange={(e) => {
                    setParams({ ...params, category_id: e.id });
                    setCurrCategory(e.name);
                  }}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{currCategory}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {formatCategory.map((x, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                              }`
                            }
                            value={x}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate text-left ${selected ? 'font-medium' : 'font-normal'}`}
                                >
                                  {x.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              {/* sort by */}
              <div className="md:col-span-6 z-10 ssm:w-full">
                <Listbox
                  value={currSort}
                  onChange={(e) => {
                    setParams({ ...params, ...e.value });
                    setCurrSort(e.name);
                  }}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{currSort}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className=" absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {sortOptions.map((x, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4  ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                              }`
                            }
                            value={x}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block text-left truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                >
                                  {x.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
