import React from 'react';
import css from './App.module.css';
import { imagesWithQuery } from '../Api/Api';
import { SearchBar } from './SearchBar/SearchBar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoaderSpinner } from './Loader/Loader.jsx';
import { ButtonLoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';
export class App extends React.PureComponent {
  state = {
    images: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    page: 1,
    modalOpen: false,
    largeImageURL: '',
    alt: '',
  };

  componentDidMount() {
    if (this.state.searchQuery.length > 0) {
      this.handleImagesRequest();
    }
  }

  handleImagesRequest = async (searchQuery, page) => {
    this.setState({ isLoading: true });
    try {
      const foundedImages = await imagesWithQuery(searchQuery, page);
      console.log([...foundedImages]);
      if (searchQuery === this.state.searchQuery && page > 1) {
        this.setState({
          images: [...this.state.images, ...foundedImages],
          searchQuery: searchQuery,
        });
        console.log(this.state.searchQuery, searchQuery);
      } else if (searchQuery !== this.state.searchQuery) {
        this.setState({
          images: foundedImages,
          searchQuery: searchQuery,
          page: 2,
        });
        console.log(this.state.searchQuery);
      }
    } catch (error) {
      this.setState({ error: error.message });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery &&
      this.state.searchQuery.length >= 2
    ) {
      this.handleImagesRequest(this.state.searchQuery);
      this.setState({ page: 2 });
    }
  }

  loadMore = () => {
    const { page, searchQuery, images } = this.state;
    this.setState({ page: page + 1 });
    this.handleImagesRequest(searchQuery, page);
    console.log(images);
  };

  modal = (value, imageURL, tag) => {
    this.setState({ modalOpen: value, largeImageURL: imageURL, alt: tag });
  };

  render() {
    const { images, isLoading, error, modalOpen, largeImageURL, alt } =
      this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmitSearch={this.handleImagesRequest} />
        {isLoading && <LoaderSpinner />}
        {error && !isLoading && <div> {error}</div>}
        {!isLoading && images.length > 0 ? (
          <ImageGallery images={images} modal={this.modal} />
        ) : null}
        {
          images.length > 0 && <ButtonLoadMore onClick={this.loadMore} />
          //  && (<ImageGallery images={images} modal={this.modal} />)
        }

        {modalOpen && (
          <Modal onClose={this.modal} url={largeImageURL} alt={alt} />
        )}
      </div>
    );
  }
}
