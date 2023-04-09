import React, { useEffect } from 'react';
import CreateProduct from '../../Components/Common/CreateProduct';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingCategory } from '../../redux/middleware/category.middleware';
import { getCategory } from '../../redux/selector';
function ManageComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingCategory());
  }, []);
  // const category = useSelector(getCategory);
  // console.log('category :: ', category);
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <div>Create Product</div>
          <div>Create Category</div>
        </div>
        <div>
          <CreateProduct></CreateProduct>
        </div>
      </div>
    </>
  );
}

export default ManageComponent;
