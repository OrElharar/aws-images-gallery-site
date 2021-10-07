import React, { useEffect, useState } from 'react';
import { uploadImage, getImagesFromDB, deleteImage } from './dataBase/imagesRequests';

const App = () => {
  // const URL = "https://orelharar-photos-storage.s3.eu-west-1.amazonaws.com/"
  const URL = "http://localhost:4000/get-image";

  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  console.log({ images });
  const renderImages = () => {
    getImagesFromDB()
      .then((res) => {
        setErrorMessage("")
        console.log({ res });
        setImages(res)
        console.log(res);
      }).catch((err) => {
        setErrorMessage(err.message)
      })
  }

  useEffect(() => {
    renderImages()
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const image = e.target.children[0].files[0];
    const formData = new FormData();
    formData.append("image", image);
    uploadImage(formData)
      .then((res) => {
        console.log({ res });
        return getImagesFromDB()
      }).then((newImages) => {
        setImages(newImages)
      })
      .catch((err) => {
        console.log({ err });
      })
  }
  const onClickDeleteImage = (id, key) => {
    deleteImage(id, key)
      .then(() => { return getImagesFromDB() })
      .then((newImages) => { setImages(newImages) })
      .catch((err) => { console.log({ err }); })
  }
  return (
    <div className="images-app">
      <h1>Images App</h1>
      <div className="add-new-image-section">
        <div>Add new Image:</div>
        <form onSubmit={onSubmitForm}>
          <input type="file" name="image" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="images-container">
        <h2>images</h2>
        {images.map((image, i) => (
          <div key={"image" + i}>
            <h3>{image.originalName}</h3>
            <img
              src={URL + `?key=${image.key}&name=${image.originalName}`}
              alt={image.originalName}
            />
            <button onClick={() => { onClickDeleteImage(image.id, image.key) }}>Delete</button>
          </div>
        ))}
      </div>
      {errorMessage !== "" && <div>{errorMessage}</div>}
    </div>
  );
}

export default App;
