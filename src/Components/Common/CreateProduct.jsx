import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getVariantAttribute } from '../../redux/selector';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { fetchingCategoryAndAttribute } from '../../redux/middleware';
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
  console.log('productVariant::', productVariant);
  // console.log('productVariantList::', productVariantList);

  const [product, setProduct] = useState({
    name: '',
    category_id: '',
    base_cost: '',
    thumbnail: '',
    // product_variants: [],
  });
  // tool
  const dispatch = useDispatch();

  // call API
  useEffect(() => {
    dispatch(fetchingCategoryAndAttribute());
  }, []);

  // console.log('product:: ', product);
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
    // console.log('Product :: ', product);
    // console.log('product_variants', productVariant);
    const data = { ...product, product_variants: productVariantList };
    console.log('data :: ', data);
  };

  const handleAddVariant = () => {
    setProductVariantList([...productVariantList, productVariant]);
    setProductVariant({ inventory: '', price: '', weight: '', variant_attributes: variant_attributes });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div className="h-[100vh] bg-[#333]/60 flex justify-start p-5">
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
                className="w-20"
                onChange={(e) => setProductVariant({ ...productVariant, [e.target.name]: e.target.value })}
                type="text"
                name="inventory"
                value={productVariant.inventory}
              />
              <input
                className="w-20 ml-2"
                onChange={(e) => setProductVariant({ ...productVariant, [e.target.name]: e.target.value })}
                type="text"
                name="price"
                value={productVariant.price}
              />
              <input
                className="w-20 ml-2"
                onChange={(e) => setProductVariant({ ...productVariant, [e.target.name]: e.target.value })}
                type="text"
                name="weight"
                value={productVariant.weight}
              />
              {variantAttribute?.map((x) => (
                <input
                  className="w-20 ml-2"
                  key={x.id}
                  onChange={(e) => handleChangeVariantAttribute(e, x.id)}
                  value={getCurrentValue(x.id)}
                />
              ))}
            </div>
            <div className="mt-4">
              <span className="border p-2 cursor-pointer" onClick={handleAddVariant}>
                Add Variants
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="mt-8 p-2 border cursor-pointer">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
