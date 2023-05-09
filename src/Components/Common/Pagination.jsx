import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import PaginationCase from './PaginationCase';
import { useNavigate } from 'react-router-dom';

export default function Pagination({ link, currentPage, totalPages, setParams, setCurrentPage, ordersPerPage }) {
  const totalPageShow = 5;
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-20">
      <div className="-mt-px flex w-0 flex-1">
        <button
          disabled={currentPage === 1 ? true : false}
          onClick={() => {
            const updatePage = currentPage - 1;
            setCurrentPage(updatePage);
            setParams((prev) => ({ ...prev, offset: (updatePage - 1) * ordersPerPage }));
            updatePage === 1 ? navigate(`${link}`) : navigate(`${link}/?page=${currentPage - 1}`);
          }}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        <PaginationCase
          link={link}
          totalPageShow={totalPageShow}
          currentPage={currentPage}
          totalPages={totalPages}
          ordersPerPage={ordersPerPage}
          setCurrentPage={setCurrentPage}
          setParams={setParams}
        ></PaginationCase>
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          disabled={currentPage === totalPages ? true : false}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setParams((prev) => ({ ...prev, offset: currentPage * ordersPerPage }));
            navigate(`${link}/?page=${currentPage + 1}`);
          }}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
