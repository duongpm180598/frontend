import { useEffect, useState } from 'react';
import { APIClient } from '../../helper/api_helper';
import Loading from '../Common/Loading';
import FormUpdate from './FormUpdate';
import RemoveComponent from './Remove';
import { classNames } from '../../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
export default function UpdateComponent() {
  const { id } = useParams();
  //   const [listProduct, setListProduct] = useState([]);
  const [product, setProduct] = useState(null);
  const [productSelected, setProductSelected] = useState();
  const [check, setCheck] = useState({ update: false, delete: false });
  const [checkCall, setCheckCall] = useState(true);
  //  open modal
  const [open, setOpen] = useState(false);

  const notify = (message, type) => toast(message, { type });
  useEffect(() => {
    if (!checkCall) return;
    const tokenStr = localStorage.getItem('token');
    const token = tokenStr ? JSON.parse(tokenStr) : null;
    if (token) {
      new APIClient()
        .getWithToken(`${process.env.REACT_APP_API_URL}/products/${id}`)
        .then((res) => {
          setProduct(res);
          setProductSelected(res.id);
          setCheckCall(false);
          setCheck((prev) => ({ ...prev, update: true }));
        })
        .catch((e) => console.log('err ::', e));
    }
  }, [id, checkCall]);

  if (!product) return <Loading></Loading>;
  return (
    <div className="p-5">
      <div className="flex justify-end">
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
      {check.delete && (
        <RemoveComponent
          open={open}
          setOpen={setOpen}
          setCheckCall={setCheckCall}
          notify={notify}
          id={productSelected}
          name={product.name}
        />
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
}
