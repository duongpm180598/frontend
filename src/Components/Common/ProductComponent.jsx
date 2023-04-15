import React from 'react';
import { useNavigate } from 'react-router-dom';
const ProductComponent = (props) => {
  const navigate = useNavigate();
  const { id, base_cost, name, thumbnail } = props;

  const handleShowDetail = () => {
    navigate('/ProductDetail', { state: { id: id } });
  };
  return (
    <div onClick={handleShowDetail} className="group relative">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img src={thumbnail} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="">
          <h3 className="text-center text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </h3>
        </div>
        {/* <button className="p-2 bg-active text-white rounded hover:cursor-pointer z-10">Add To Cart</button> */}
        <p className="text-sm font-medium text-gray-900">{base_cost}</p>
      </div>
    </div>
  );
};

export default ProductComponent;
