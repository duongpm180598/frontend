import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getVariantAttribute } from '../../redux/selector';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { fetchingCategoryAndAttribute } from '../../redux/middleware';
function CreateProduct() {
  // state

  const [image, setImage] = useState(null);
  const [invisibaleFormAdd, setInvisibaleFormAdd] = useState(false);
  const [productVariants, setProductVariants] = useState({
    inventory: '',
    price: '',
    weight: '',
    variant_attributes: [{ attribute_id: '', value: '' }],
  });

  // const [variantAttr, setVariantAttr] = useState({ attribute_id: '', value: '' });

  const [product, setProduct] = useState({
    name: '',
    category_id: '',
    base_cost: '',
    thumbnail: '',
    product_variants: [],
  });

  // tool
  const dispatch = useDispatch();

  // data
  const category = useSelector(getCategory);
  const variantAttribute = useSelector(getVariantAttribute);

  // call API
  useEffect(() => {
    dispatch(fetchingCategoryAndAttribute());
  }, []);

  console.log('product:: ', product);
  console.log('productVariants:: ', productVariants);

  // function handle

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setProduct({ ...product, thumbnail: reader.result });
    };
  };

  const handleChangeImageURL = () => {
    setProduct({ ...product, thumbnail: null });
  };

  const handleChangeUpdateProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleChangeVariantAttribute = (e, attr_id) => {
    const currVariantAttr = productVariants.variant_attributes?.find((x) => x.attribute_id == attr_id);
    if (currVariantAttr) {
      currVariantAttr.value = e.target.value;
      const newVariantAttr = productVariants.variant_attributes.filter((x) => x.attribute_id != attr_id);
      newVariantAttr.push(currVariantAttr);
      setProductVariants({
        ...productVariants,
        variant_attributes: newVariantAttr,
      });
    } else {
      setProductVariants({
        ...productVariants,
        variant_attributes: [{ attribute_id: attr_id, value: e.target.value }],
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div className="h-[100vh] bg-[#333]/60 flex justify-start p-5">
      <form className="">
        <div className="flex justify-between items-center mb-5">
          <label className="capitalize font-Popins font-semibold tracking-wider" htmlFor="">
            Name
          </label>
          <input
            onChange={(e) => handleChangeUpdateProduct(e)}
            name="name"
            className="p-2 border border-solid focus:border-none"
            style={{}}
            type="text"
            placeholder="Type Your Name"
          />
        </div>

        <div className="flex justify-between items-center mb-5">
          <label className="capitalize font-Popins font-semibold tracking-wider" htmlFor="">
            category
          </label>
          <select
            className="px-9 py-2 border border-solid"
            defaultValue={category ? category[0] : ''}
            onChange={(e) => handleChangeUpdateProduct(e)}
            name="category_id"
          >
            {category?.map((x) => (
              <option key={x.id}>{x.name}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center mb-5">
          <label className="capitalize font-Popins font-semibold tracking-wider">Basecode</label>
          <input
            onChange={(e) => handleChangeUpdateProduct(e)}
            className="p-2 border border-solid focus:border-none"
            name="base_cost"
            type="text"
            placeholder="Input your basecode"
          />
        </div>

        {/* ---------------- API Has not discription */}
        {/* <div className="flex justify-between items-center mb-5">
          <label htmlFor="">Description</label>
          <textarea name="" id="" cols="30" rows="4"></textarea>
        </div> */}

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
            <p className="w-[200px] cursor-pointer py-2 border border-solid border-active capitalize font-Popins font-semibold tracking-wider">
              Select A File
            </p>
          </div>
        )}

        {/* variant */}

        <div>
          <h3 className="uppercase font-Popins font-semibold tracking-wider">variants</h3>
          <div>
            <div className="flex justify-between">
              <span>Inventory</span>
              <span>Price</span>
              <span>Weight</span>
              {variantAttribute?.map((x, index) => (
                <span key={index}>{x.name}</span>
              ))}
            </div>
            {product.product_variants?.map((x, index) => (
              <div className="flex justify-between">
                <span>{x.inventory}</span>
                <span>{x.price}</span>
                <span>{x.weight}</span>
                {x.variant_attributes?.map((each) => (
                  <span key={each.attribute_id}>{each.value}</span>
                ))}
              </div>
            ))}
            inventory: '', price: '', weight: '',
            {/* variant_attributes: [{ attribute_id: '', value: '' }], */}
            <div className="flex justify-between">
              <input
                onChange={(e) => setProductVariants({ ...productVariants, [e.target.name]: e.target.value })}
                type="text"
                name="inventory"
                value={productVariants.inventory}
              />
              <input
                onChange={(e) => setProductVariants({ ...productVariants, [e.target.name]: e.target.value })}
                type="text"
                name="price"
                value={productVariants.price}
              />
              <input
                onChange={(e) => setProductVariants({ ...productVariants, [e.target.name]: e.target.value })}
                type="text"
                name="weight"
                value={productVariants.weight}
              />
              {/* {variantAttribute?.map((x) => (
                <input
                  key={x.id}
                  onChange={(e) => handleChangeVariantAttribute(e, x.id)}
                  value={productVariants.variant_attributes?.find((e) => e.attribute_id == x.id)?.value || ''}
                />
              ))} */}
            </div>
            <button>Add Variants</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
