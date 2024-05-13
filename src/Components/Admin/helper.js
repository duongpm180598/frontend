import { APIClient } from '../../helper/api_helper';

export const getPresignedUrl = async (count = 1) => {
  return new Promise((resolve) =>
    new APIClient().get(`${process.env.REACT_APP_API_URL}/cloudinary/pre-signed?count=${count}`).then((res) => {
      resolve(res);
    })
  );
};

export const uploadIntoCloudinary = async (presignedUrls = [], files) => {
  if (presignedUrls.length) {
    const promises = presignedUrls.map((url, index) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', files[index]);

        fetch(url, {
          method: 'POST',
          body: formData,
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
    return Promise.all(promises);
  }
};
