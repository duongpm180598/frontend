import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getVariantAttribute } from '../../redux/selector';
import { APIClient } from '../../helper/api_helper';
import axios from 'axios';

function AddImage() {
  const currProduct = useSelector(getProducts);
  const [idProduct, setIdProduct] = useState(currProduct[0].id);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const formData = new FormData();
  const handleSubmit = () => {
    const tokenStr = localStorage.getItem('token');
    const token = tokenStr ? JSON.parse(tokenStr) : null;
    axios
      .post(`${process.env.REACT_APP_API_URL}/products/${idProduct}/images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        alert('Thêm Ảnh Thành Công');
      })
      .catch((e) => console.log('er ::', e));
  };
  const handleFileChange = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append('images', event.target.files[0]);
    }
  };

  return (
    <div className="w-full flex justify-start p-5 flex-col gap-y-10">
      <div className="w-[30%]">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium  dark:text-gray-800">
          Chọn Sản Phẩm
        </label>
        <select
          onChange={(e) => {
            setIdProduct(e.target.value);
          }}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-600"
        >
          {currProduct.map((x, index) => (
            <option key={index} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[30%] ">
        <input type="file" onChange={handleFileChange} placeholder="Chọn Ảnh" multiple />
        <div className="mt-10">
          <button
            type="button"
            onClick={handleSubmit}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddImage;
