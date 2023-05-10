import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../utils';
const ProductComponent = (props) => {
  const navigate = useNavigate();
  const { id, base_cost, name, thumbnail, slug } = props;

  const handleShowDetail = () => {
    navigate(`/product-detail/${slug}`, { state: { slug: slug } });
  };
  return (
    <div onClick={handleShowDetail} className="group relative cursor-pointer border p-2 rounded">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img src={thumbnail} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
      </div>

      <div className="mt-4 flex justify-between items-center flex-col">
        <div className="min-h-[48px]">
          <h3 className="text-sm text-gray-700 max-w-[200px] text-center">
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{formatMoney(base_cost)}</p>
      </div>
    </div>
  );
};

export default ProductComponent;
