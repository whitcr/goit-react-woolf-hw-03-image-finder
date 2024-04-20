import React, { useEffect, useState } from 'react';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImg } from './api/api.js';
import './App.css';

export const App = () => {
  const initialQuery = '';
  const initialPage = 1;

  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showButton, setShowButton] = useState(false);

  const fetchImages = () => {
    setIsLoading(true);
    setShowButton(false);

    fetchImg(query, currentPage)
      .then(newImages => {
        setImages(prev => [...prev, ...newImages.hits]);
        setShowButton(currentPage < Math.ceil(newImages.totalHits / 12));
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);
      setShowButton(false);

      fetchImg(query, currentPage)
        .then(newImages => {
          setImages(prev => [...prev, ...newImages.hits]);
          setShowButton(currentPage < Math.ceil(newImages.totalHits / 12));
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    };

    if (initialQuery !== query || initialPage !== currentPage) {
      fetchImages();
    }
  }, [currentPage, initialPage, initialQuery, query, fetchImages]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevState => prevState.currentPage + 1);
  };

  const handleImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {showButton && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleModalClose} />
      )}
    </div>
  );
};
