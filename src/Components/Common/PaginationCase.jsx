import { classNames } from '../../utils';
import _ from 'lodash';

export default function PaginationCase({ totalPageShow, currentPage, totalPages }) {
  const pageMiddle = Math.ceil(totalPageShow / 2);
  // TH1 : Tống số trang nhỏ hơn hoặc số lượng trang hiển thị thì show hết ra
  if (totalPages <= totalPageShow)
    return Array.from(Array(totalPages).keys()).map((x) => (
      <span
        key={x}
        className={classNames(
          'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
          x + 1 === currentPage ? 'border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600' : ''
        )}
      >
        {x + 1}
      </span>
    ));
  // TH2 : Tổng số trang lớn hơn số lượng trang hiển thị
  //   min = currpage - middle + 1
  //   neu min <=1  ==> min = 1
  //  neu min >= middle + 1 ==> min = middle + 1
  //  max = min + totalPageShow - 1
  let min = currentPage - pageMiddle + 1;
  if (min <= 1) min = 1;
  else if (min >= totalPages - totalPageShow + 1) min = totalPages - totalPageShow + 1;
  return _.range(min, min + totalPageShow, 1).map((x) => (
    <span
      key={x}
      className={classNames(
        'inline-flex items-center border-t-2  px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
        x === currentPage ? 'border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600' : ''
      )}
    >
      {x}
    </span>
  ));
}
