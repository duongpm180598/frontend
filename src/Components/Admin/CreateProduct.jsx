import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getVariantAttribute } from '../../redux/selector';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { fetchingCategoryAndAttribute } from '../../redux/middleware';
import { APIClient } from '../../helper/api_helper';
import addImage from '../../asset/image/image.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AddImage from './AddImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPresignedUrl, uploadIntoCloudinary } from './helper';

function CreateProduct() {
  // data
  const category = useSelector(getCategory);
  const variantAttribute = useSelector(getVariantAttribute);

  const tokenStr = localStorage.getItem('token');
  const token = tokenStr ? JSON.parse(tokenStr) : null;
  // initial value
  const variant_attributes = variantAttribute?.map((e) => {
    return { attribute_id: e.id, value: '' };
  });
  // state
  const [productVariant, setProductVariant] = useState({
    inventory: '',
    price: '',
    weight: '',
    variant_attributes: variant_attributes,
  });
  const [productVariantList, setProductVariantList] = useState([]);
  const [description, setDescription] = useState('');
  const [product, setProduct] = useState({
    name: '',
    category_id: '',
    base_cost: 0,
    thumbnail: '',
  });

  const [selectedImages, setSelectedImages] = useState([]);
  // tool
  const dispatch = useDispatch();

  // call API
  useEffect(() => {
    dispatch(fetchingCategoryAndAttribute());
  }, []);

  const onDrop = async (acceptedFiles) => {
    const presignedUrl = await getPresignedUrl(1);
    const uploadFiles = await uploadIntoCloudinary(presignedUrl, acceptedFiles);
    setProduct((prev) => ({ ...prev, thumbnail: uploadFiles[0].secure_url }));
  };

  const handleChangeImageURL = () => {
    setProduct({ ...product, thumbnail: null });
  };

  const handleChangeCategory = (e) => {
    const currentCategory = category.find((x) => x.name == e.target.value);
    setProduct({ ...product, category_id: currentCategory.id });
  };
  const handleChangeVariantAttribute = (e, attr_id) => {
    const currVariantAttr = productVariant.variant_attributes?.find((x) => x.attribute_id == attr_id);
    if (currVariantAttr) {
      currVariantAttr.value = e.target.value;
      const newVariantAttr = productVariant.variant_attributes.filter((x) => x.attribute_id != attr_id);
      newVariantAttr.push(currVariantAttr);
      setProductVariant({
        ...productVariant,
        variant_attributes: newVariantAttr,
      });
    } else {
      setProductVariant({
        ...productVariant,
        variant_attributes: [...productVariant.variant_attributes, { attribute_id: attr_id, value: e.target.value }],
      });
    }
  };

  const getCurrentValue = (id) => {
    const currVariant = productVariant.variant_attributes?.find((e) => e.attribute_id == id);
    return currVariant?.value;
  };

  const handleSubmit = () => {
    const data = { ...product, description, product_variants: productVariantList, product_images: selectedImages };
    new APIClient()
      .createWithToken(`${process.env.REACT_APP_API_URL}/products`, data)
      .then((res) => {
        notify('Thêm Thành Công', 'success');
      })
      .catch((e) => {
        notify('Thêm Thất Bại', 'error');
      });
  };

  const handleAddVariant = () => {
    setProductVariantList([...productVariantList, productVariant]);
    setProductVariant({ inventory: '', price: '', weight: '', variant_attributes: variant_attributes });
  };

  const notify = (message, type) => toast(message, { type });
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });
  return (
    <div className="w-full flex justify-start p-5">
      <form
        className="grid grid-cols-12 gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="col-span-12 lg:col-span-6">
          {/* Ten San Pham */}
          <div className="relative z-0 w-full mb-8 group">
            <input
              name="name"
              onChange={(e) => {
                setProduct({ ...product, [e.target.name]: e.target.value });
              }}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-black dark:black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tên Sản Phẩm
            </label>
          </div>

          <div className="relative z-0 w-full mb-8 group">
            <input
              name="base_cost"
              onChange={(e) => {
                setProduct({ ...product, [e.target.name]: e.target.value * 1 });
              }}
              id="floating_basecost"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_basecost"
              className="peer-focus:font-medium absolute text-sm text-black dark:black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Giá Cơ Sở
            </label>
          </div>

          {/* category */}

          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Danh Mục
          </label>
          <select
            defaultValue={category ? category[0] : ''}
            onChange={(e) => handleChangeCategory(e)}
            name="category_id"
            id="category"
            className="bg-gray-50 mb-8 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-400 dark:hover:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-400 dark:focus:border-gray-400"
          >
            <option hidden value="">
              Lựa chọn danh mục
            </option>
            {category?.map((x) => (
              <option key={x.id}>{x.name}</option>
            ))}
          </select>

          {/*image */}
          {product.thumbnail ? (
            <div className="w-[200px] h-[200px] border border-solid border-[#333] p-1 relative">
              <img name="thumbnail" className="w-[190px] h-[190px]" src={product.thumbnail} alt="#thumbnail" />
              <CloseIcon
                onClick={handleChangeImageURL}
                className="absolute top-0 right-0 cursor-pointer hover:opacity-60 z-10"
              ></CloseIcon>
            </div>
          ) : (
            <div className="inline-block h-[50px] w-[50px] mb-[150px]" {...getRootProps()}>
              <input {...getInputProps()} accept="image/jpeg,image/png,image/gif" />
              <img className="h-[50px] w-[50px] cursor-pointer" src={addImage} alt="..." />
            </div>
          )}
        </div>
        <div className="col-span-12 border p-2 rounded bg-white">
          {/* variant */}

          <div className="">
            <h3 className="uppercase font-Popins font-semibold tracking-wider black">Phân Loại Hàng</h3>
            <div>
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                              Kho Hàng
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Giá Tiền
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Trọng Lượng
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Size
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Màu Sắc
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {productVariantList.map((x, index) => (
                            <tr key={index}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-500 sm:pl-0">
                                {x.inventory}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{x.price}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{x.weight}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {x.variant_attributes[0].value}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {x.variant_attributes[1].value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="grid grid-cols-10 gap-2">
                        <input
                          className="col-span-2 border-gray-600 border "
                          onChange={(e) =>
                            setProductVariant({ ...productVariant, [e.target.name]: e.target.value * 1 })
                          }
                          type="number"
                          name="inventory"
                          value={productVariant.inventory}
                        />
                        <input
                          className="col-span-2 border-gray-600 border "
                          onChange={(e) =>
                            setProductVariant({ ...productVariant, [e.target.name]: 1 * e.target.value })
                          }
                          type="number"
                          name="price"
                          value={productVariant.price}
                        />
                        <input
                          className="col-span-2 border-gray-600 border "
                          onChange={(e) =>
                            setProductVariant({ ...productVariant, [e.target.name]: 1 * e.target.value })
                          }
                          type="number"
                          name="weight"
                          value={productVariant.weight}
                        />
                        {variantAttribute?.map((x) => (
                          <input
                            className="col-span-2 border-gray-600 border "
                            key={x.id}
                            onChange={(e) => handleChangeVariantAttribute(e, x.id)}
                            value={getCurrentValue(x.id)}
                          />
                        ))}
                      </div>
                      <div className="mt-14 mb-5">
                        <span
                          onClick={handleAddVariant}
                          className=" cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          Thêm Loại Hàng
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="col-span-12">
          <ReactQuill className="bg-white" theme="snow" value={description} onChange={setDescription} />
        </div>
        {/* Add image */}

        <div className="border rounded col-span-12 p-2 bg-white min-h-[50px]">
          <AddImage selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        </div>
        <button
          type="submit"
          className="md:col-span-3 ssm:col-span-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Thêm Sản phẩm
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default CreateProduct;
