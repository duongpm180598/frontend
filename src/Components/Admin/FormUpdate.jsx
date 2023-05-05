import { useEffect, useState } from 'react';
import { APIClient } from '../../helper/api_helper';
import Loading from '../Common/Loading';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function FormUpdate({ id, notify, setCheckCall }) {
  const [product, setProduct] = useState({ name: '', category_id: '', base_cost: 0, thumbnail: '' });
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setProduct({ ...product, thumbnail: reader.result });
    };
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  useEffect(() => {
    if (!id) return;
    new APIClient()
      .getWithToken(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((res) => {
        setThumbnail(res.thumbnail);
        setProduct({
          name: res.name,
          category_id: res.category_id,
          base_cost: res.base_cost,
        });
        setDescription(res.description);
      })
      .catch((e) => console.log(e));
  }, [id]);

  useEffect(() => {
    new APIClient()
      .get(`${process.env.REACT_APP_API_URL}/categories`)
      .then((res) => {
        setCategory(res);
      })
      .catch((e) => console.log('err ::', e));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { ...product, description: description };
    new APIClient()
      .updateWithToken(`${process.env.REACT_APP_API_URL}/products/${id}`, data)
      .then((res) => {
        notify('Thay Đổi Thành Công', 'success');
        setCheckCall(true);
      })
      .catch((e) => {
        notify('Thay Đổi Thất Bại', 'error');
      });
  };
  if (!id) return;
  if (!product) return <Loading></Loading>;
  return (
    <form className=" mt-5 border p-5 rounded bg-white" onSubmit={onSubmit}>
      <div className="mb-6 w-[40%]">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Tên Sản Phẩm Hiện Tại
        </label>
        <input
          type="text"
          id="email"
          value={product.name}
          onChange={(e) => {
            setProduct({ ...product, name: e.target.value });
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          placeholder="Tên Sản Phẩm"
          required
        />
      </div>

      <div className="mb-6 w-[40%]">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Giá Cơ Sở
        </label>
        <input
          type="number"
          id="password"
          value={product.base_cost}
          onChange={(e) => {
            setProduct({ ...product, base_cost: Number(e.target.value) });
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          required
        />
      </div>

      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
        Phân Loại
      </label>
      <select
        onChange={(e) => {
          setProduct({ ...product, category_id: e.target.value });
        }}
        value={product.category_id}
        id="countries"
        className="w-[40%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block  p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
      >
        {category.map((x) => (
          <option value={x.id} key={x.id}>
            {x.name}
          </option>
        ))}
      </select>

      <div className="mt-5 w-[80%]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Mô Tả</label>
        <ReactQuill className="bg-white" theme="snow" value={description} onChange={setDescription} />
      </div>

      {product.thumbnail ? (
        <div className="w-[200px] h-[200px] border border-solid mt-10 border-[#333] p-1 relative mb-[50px]">
          <img
            name="thumbnail"
            className="w-[190px] h-[190px] object-contain"
            src={product.thumbnail}
            alt="#thumbnail"
          />
        </div>
      ) : (
        <div className="h-[200px] w-[250px] mt-10 mb-[50px]" {...getRootProps()}>
          <input {...getInputProps()} accept="image/jpeg,image/png,image/gif" />
          <p className="text-sm mb-3 text-gray-400 font-semibold">Chọn Ảnh Thumbnail thay thế</p>
          <img className="h-[150px] w-[150px] object-contain cursor-pointer" src={thumbnail} alt="..." />
        </div>
      )}

      <button
        type="submit"
        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Cập Nhật
      </button>
    </form>
  );
}
