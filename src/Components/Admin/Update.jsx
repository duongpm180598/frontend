import { useEffect, useState } from 'react';
import { APIClient } from '../../helper/api_helper';
import Loading from '../Common/Loading';
import FormUpdate from './FormUpdate';
import RemoveComponent from './Remove';
import { classNames } from '../../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function UpdateComponent() {
  const [listProduct, setListProduct] = useState([]);
  const [productSelected, setProductSelected] = useState();
  const [check, setCheck] = useState({ update: false, delete: false });
  const [checkCall, setCheckCall] = useState(true);
  //  open modal
  const [open, setOpen] = useState(false);

  const getProductNameById = (id) => {
    const element = listProduct.find((x) => x.id == id);
    return element.name;
  };
  const notify = (message, type) => toast(message, { type });
  useEffect(() => {
    if (!checkCall) return;
    new APIClient()
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => {
        const listData = res.products.map((x) => ({ id: x.id, name: x.name }));
        setListProduct(listData);
        setCheckCall(false);
      })
      .catch((e) => console.log('err ::', e));
  }, [checkCall]);

  if (!listProduct) return <Loading></Loading>;
  return (
    <div className="p-5">
      <label htmlFor="countries" className="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-500">
        Chọn Sản Phẩm Cần Thay Đổi
      </label>
      <select
        onChange={(e) => {
          setProductSelected(e.target.value);
        }}
        id="countries"
        className="w-[calc(40%_-_10px)] ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
      >
        <option value="" className="hidden">
          Chọn Sản Phẩm
        </option>
        {listProduct.map((x) => (
          <option value={x.id} key={x.id}>
            {x.name}
          </option>
        ))}
      </select>

      <div className="pl-4 mt-3">
        <button
          onClick={() => setCheck({ ...check, update: true })}
          type="button"
          disabled={productSelected ? false : true}
          className={classNames(
            productSelected ? '' : 'opacity-60',
            'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
          )}
        >
          Cập Nhật
        </button>
        <button
          onClick={() => {
            setCheck({ ...check, delete: true });
            setOpen(true);
          }}
          type="button"
          disabled={productSelected ? false : true}
          className={classNames(
            productSelected ? '' : 'opacity-60',
            'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
          )}
        >
          Xóa
        </button>
      </div>
      {check.update ? <FormUpdate id={productSelected} setCheckCall={setCheckCall} notify={notify} /> : null}
      {check.delete ? (
        <RemoveComponent
          open={open}
          setOpen={setOpen}
          setCheckCall={setCheckCall}
          notify={notify}
          id={productSelected}
          name={getProductNameById(productSelected)}
        />
      ) : null}
      <ToastContainer></ToastContainer>
    </div>
  );
}
