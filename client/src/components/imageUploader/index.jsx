import { useState } from "react";
import "./styles.css";
import imagePlaceholder from "../../assets/image placeholder.jpg";
import { useEffect } from "react";

const ImageUploader = ({ onChange, image }) => {
  const [preview, setPreview] = useState(imagePlaceholder);
  useEffect(() => {
    if (image) setPreview(`https://f2-c-agri-ecommerce.vercel.app/${image}`);
  }, [image]);
  return (
    <div className="imageUploader">
      <div className="imageContainer">
        <img src={preview} alt="" crossOrigin="cross-origin" />
      </div>
      <label htmlFor="imageInput">Upload Image</label>
      <input
        type="file"
        name=""
        id="imageInput"
        onChange={(e) => {
          const src = URL.createObjectURL(e.target.files[0]);
          setPreview(src);
          onChange(e.target.files[0]);
        }}
      />
    </div>
  );
};

export default ImageUploader;
