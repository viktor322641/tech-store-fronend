import React from "react";

interface ImageDebugProps {
  src: string;
}

const ImageDebug: React.FC<ImageDebugProps> = ({ src }) => {
  return (
    <div className="border p-4 my-4">
      <h3>Image Debug Info:</h3>
      <p>Source URL: {src}</p>
      <img
        src={src}
        alt="Debug view"
        className="w-32 h-32 object-cover mt-2"
        onLoad={() => console.log("Image loaded successfully:", src)}
        onError={() => console.error("Failed to load image:", src)}
      />
    </div>
  );
};

export default ImageDebug;
