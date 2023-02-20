import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = props => {
  return (
    <ul className={css.imageGallery}>
      <ImageGalleryItem
        images={props.images}
        modal={props.modal}
      ></ImageGalleryItem>
    </ul>
  );
};
