import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = props => {
  const images = props.images;
  return (
    <>
      {images.map(image => (
        <li key={image.id} className={css.imageGalleryItem}>
          <img
            clasName={css.imageGalleryItemImage}
            src={image.webformatURL}
            alt={image.tags}
            onClick={() => props.modal(true, image.largeImageURL, image.tags)}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: propTypes.number,
  previewURL: propTypes.string,
  tags: propTypes.string,
  largeImageURL: propTypes.string,
  modal: propTypes.func,
};
