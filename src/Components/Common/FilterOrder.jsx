import { Fragment, useState } from 'react';
import { Transition, Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { userRole } from '../../Services/auth.service';

const sortOptions = [
  { name: 'Default', value: {} },
  { name: 'Mới Nhất', value: { sort_by: 'created_at', order: 'desc' } },
  { name: 'Cũ Nhất', value: { sort_by: 'created_at', order: 'asc' } },
];

const statusOrder = [
  { name: 'Chờ Xác Nhận', value: 'PENDING' },
  { name: 'Đang Lấy Hàng', value: 'READY_TO_PICK' },
  { name: 'Đang Giao Hàng', value: 'SHIPPING' },
  { name: 'Đã Nhận Hàng', value: 'DONE' },
  { name: 'Đã Hủy', value: 'CANCEL' },
];

export default function FilterOrder({ params, setParams }) {
  const { status, sort_by, order } = params;
  const [currStatus, setCurrStatus] = useState('Trạng Thái Đơn');
  const [currSort, setCurrSort] = useState('Sắp Xếp');

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8 lg:pt-2">
        <section aria-labelledby="filter-heading" className="pt-6">
          <div className="grid md:grid-cols-12 lg:gap-x-8 lg:py-8 md:gap-x-6 ssm:gap-y-3 items-center ssm:px-3 sm:px-0">
            {/* stauts */}
            <div className="md:col-span-6 z-10 ssm:w-full">
              <Listbox
                value={currStatus}
                onChange={(e) => {
                  setParams({ ...params, status: e.value });
                  setCurrStatus(e.name);
                }}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{currStatus}</span>
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
                      {statusOrder.map((x, index) => (
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
                              <span className={`block truncate text-left ${selected ? 'font-medium' : 'font-normal'}`}>
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
                  // console.log(e);
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
                              <span className={`block text-left truncate ${selected ? 'font-medium' : 'font-normal'}`}>
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
        </section>
      </div>
    </div>
  );
}
