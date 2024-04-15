import React, { Component } from 'react';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImg } from './api/api.js';
import './App.css';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    query: '',
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    showButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, currentPage } = this.state;
    this.setState({ isLoading: true, showButton: false });

    fetchImg(query, currentPage)
      .then(newImages => {
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages.hits],
          showButton: currentPage < Math.ceil(newImages.totalHits / 12),
        }));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSearchSubmit = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      currentPage: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleImageClick = largeImageURL => {
    this.setState({
      largeImageURL,
      showModal: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, showButton } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {showButton && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
