import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingCategory } from '../../redux/middleware/category.middleware';
import { getCategory } from '../../redux/selector';
function CreateProduct() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingCategory());
  }, []);

  const category = useSelector(getCategory);

  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="">Name</label>
          <input className="border border-solid" type="text" placeholder="Type Your Name" />
        </div>
        <div>
          <label htmlFor="">category</label>
          <select name="" id="">
            {category?.map((x) => (
              <option key={x.id}>{x.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>basecode</label>
          <input type="text" placeholder="Input your basecode" />
        </div>

        <div>
          <label htmlFor="">Description</label>
          <textarea name="" id="" cols="30" rows="4"></textarea>
        </div>
        <div>
          <img src="" alt="#thumbnail" />
          <input type="file" />
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
