import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getVariantAttribute } from '../../redux/selector';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { fetchingCategoryAndAttribute } from '../../redux/middleware';
import { APIClient } from '../../helper/api_helper';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreateProduct() {
  // data
  const category = useSelector(getCategory);
  const variantAttribute = useSelector(getVariantAttribute);
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
  // tool
  const dispatch = useDispatch();

  // call API
  useEffect(() => {
    dispatch(fetchingCategoryAndAttribute());
  }, []);

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      console.log('reader ::', reader.result);
      setProduct({ ...product, thumbnail: reader.result });
    };
  };

  const handleChangeImageURL = () => {
    setProduct({ ...product, thumbnail: null });
  };

  const handleChangeCategory = (e) => {
    const currentCategory = category.find((x) => x.name == e.target.value);
    console.log('curr:', currentCategory);
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
    const data = { ...product, product_variants: productVariantList };
    console.log('data ::', data);
    new APIClient()

      .createWithToken(`${process.env.REACT_APP_API_URL}/products`, data)
      .then((res) => alert('Create Cuccess'))
      .catch((e) => alert(e));
  };

  const handleAddVariant = () => {
    setProductVariantList([...productVariantList, productVariant]);
    setProductVariant({ inventory: '', price: '', weight: '', variant_attributes: variant_attributes });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div className="bg-[#333]/60 w-full flex justify-start p-5">
      <form
        className="grid grid-cols-12 gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="col-span-6">
          {/* Ten San Pham */}
          <div className="relative z-0 w-full mb-8 group">
            <input
              name="name"
              onChange={(e) => {
                setProduct({ ...product, [e.target.name]: e.target.value });
              }}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_basecost"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Base Cost
            </label>
          </div>

          {/* category */}

          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Chọn Loại
          </label>
          <select
            defaultValue={category ? category[0] : ''}
            onChange={(e) => handleChangeCategory(e)}
            name="category_id"
            id="category"
            className="bg-gray-50 mb-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
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
            <div className="h-[200px]" {...getRootProps()}>
              <input {...getInputProps()} accept="image/jpeg,image/png,image/gif" />
              <p className="w-[200px] cursor-pointer p-2 border border-solid border-gray-400 capitalize font-Popins text-sm text-gray-400 tracking-wider">
                Chọn Thumbnail
              </p>
            </div>
          )}
        </div>

        <div className="col-span-6">
          {/* variant */}

          <div className="">
            <h3 className="uppercase font-Popins font-semibold tracking-wider text-gray-400">variants</h3>
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Inventory</span>
                <span className="text-sm text-gray-400">Price</span>
                <span className="text-sm text-gray-400">Weight</span>
                {variantAttribute?.map((x, index) => (
                  <span className="text-sm text-gray-400" key={index}>
                    {x.name}
                  </span>
                ))}
              </div>

              {productVariantList?.map((x, index) => (
                <div key={index} className="flex justify-between">
                  <span>{x.inventory}</span>
                  <span>{x.price}</span>
                  <span>{x.weight}</span>
                  {x.variant_attributes?.map((each) => (
                    <span key={each.attribute_id}>{each.value}</span>
                  ))}
                </div>
              ))}

              <div className="flex justify-between">
                <input
                  className="w-20 px-2"
                  onChange={(e) => setProductVariant({ ...productVariant, [e.target.name]: e.target.value * 1 })}
                  type="number"
                  name="inventory"
                  value={productVariant.inventory}
                />
                <input
                  className="w-20 px-2 ml-2"
                  onChange={(e) => setProductVariant({ ...productVariant, [e.target.name]: 1 * e.target.value })}
                  type="number"
                  name="price"
                  value={productVariant.price}
                />
                <input
                  className="w-20 px-2 ml-2"
                  onChange={(e) => setProductVariant({ ...productVariant, [e.target.name]: 1 * e.target.value })}
                  type="number"
                  name="weight"
                  value={productVariant.weight}
                />
                {variantAttribute?.map((x) => (
                  <input
                    className="w-20 px-2 ml-2"
                    key={x.id}
                    onChange={(e) => handleChangeVariantAttribute(e, x.id)}
                    value={getCurrentValue(x.id)}
                  />
                ))}
              </div>
              <div className="mt-14">
                <span
                  onClick={handleAddVariant}
                  className=" cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Thêm Variants
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* description */}

        <button
          type="submit"
          className="col-span-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Thêm Sản phẩm
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
