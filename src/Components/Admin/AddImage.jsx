import { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import addImage from '../../asset/image/image.png';
function AddImage({ selectedImages, setSelectedImages }) {
  const [listImages, setListImages] = useState([]);
  const [check, setCheck] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    setListImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setSelectedImages(acceptedFiles);
    setCheck(true);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const image = listImages?.map((x, index) => <img className="w-[150px] h-[150px]" key={index} src={x.preview} />);
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
