import Modal from '@mui/material/Modal';
import { APIClient } from '../../helper/api_helper';
import { useNavigate } from 'react-router-dom';
export default function RemoveComponent({ open, setOpen, name, id, count, setCheckCall, path, setCount, notify }) {
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleRemove = () => {
    new APIClient()
      .deleteWithToken(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((res) => {
        alert('Xóa Thành Công');
        setOpen(false);
        setCheckCall(true);
        if (path && path === 'list') {
          setCount(count + 1);
        } else {
            navigate('/manager/products');
        }
      })
      .catch((e) => {
        notify('Xóa Thất Bại', 'error');
      });
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center"
      >
        <div className="w-[30%] h-[30%] bg-gray-400 mt-[200px] p-10">
          <p className="text-gray-800">
            Sản Phẩm Tên Là : <span className="font-semibold text-black">{name} </span>sẽ bị xóa
          </p>
          <div className="mt-20 float-right">
            <button
              onClick={handleRemove}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Xác Nhận
            </button>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            >
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
