import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import { imagesWithQuery } from '../Api/Api';
import { SearchBar } from './SearchBar/SearchBar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoaderSpinner } from './Loader/Loader.jsx';
import { ButtonLoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const handleImagesRequest = async (searchQuery, page) => {
    setIsLoading(true);
    try {
      const foundedImages = await imagesWithQuery(searchQuery, page);
      setSearchQuery(searchQuery);
      if (page === 1) {
        setImages([...foundedImages]);
        setPage(2);
      } else {
        setImages([...images, ...foundedImages]);
        setPage(n => n + 1);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    handleImagesRequest(searchQuery, page);
  };

  const modal = (value, imageURL, tag) => {
    setLargeImageURL(imageURL);
    setAlt(tag);
    setModalOpen(value);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmitSearch={handleImagesRequest} />
      {isLoading && page === 1 && <LoaderSpinner />}
      {error && !isLoading && <div> {error}</div>}
      {!isLoading && images.length > 0 && (
        <ImageGallery images={images} modal={modal} />
      )}
      {isLoading && page > 1 && <LoaderSpinner />}
      {images.length > 0 && <ButtonLoadMore onClick={loadMore} />}

      {modalOpen && <Modal onClose={modal} url={largeImageURL} alt={alt} />}
    </div>
  );
};
