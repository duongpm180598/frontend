import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import addImage from '../../asset/image/image.png';
import { getPresignedUrl, uploadIntoCloudinary } from './helper';
function AddImage({ selectedImages, setSelectedImages }) {
  const [listImages, setListImages] = useState([]);
  const [check, setCheck] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {
    const presignedUrl = await getPresignedUrl(acceptedFiles.length);
    const uploadFiles = await uploadIntoCloudinary(presignedUrl, acceptedFiles);
    const product_images = uploadFiles.map(file => {
        return {
            url: file.secure_url,
            external_id: file.public_id
        }
    })
    setListImages(product_images)
    setSelectedImages(product_images);
    setCheck(true);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const image = listImages?.map((x, index) => <img className="w-[150px] h-[150px]" key={index} src={x.url} />);
  return (
    <div>
      {check ? (
        <div className="p-2 flex flex-wrap gap-3">{image}</div>
      ) : (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p className="ml-2 text-gray-400">Tải Files ảnh cho sản phẩm tại đây</p>
          <img className="mt-3 w-[150px] h[-150px] cursor-pointer" src={addImage} alt="..." />
        </div>
      )}
    </div>
  );
}

export default AddImage;
