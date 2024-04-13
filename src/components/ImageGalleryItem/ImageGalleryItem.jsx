import React from 'react';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const { webformatURL, largeImageURL, id } = image;

  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt=""
        onClick={() => onImageClick(largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
