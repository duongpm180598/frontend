import React from 'react';
import CreateProduct from '../../Components/Common/CreateProduct';
function ManageComponent() {
  return (
    <>
      <div className="flex ">
        <div className="flex-none min-w-[150px] mr-5">
          <div>Create Product</div>
          <div>Create Category</div>
        </div>
        <div className="flex-auto">
          <CreateProduct></CreateProduct>
        </div>
      </div>
    </>
  );
}

export default ManageComponent;
