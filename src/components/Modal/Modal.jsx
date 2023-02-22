import propTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = props => {
  const closeModal = event => {
    if (event.key === 'Escape' || event.currentTarget === event.target) {
      props.onClose();
    }
  };

  window.addEventListener('keydown', closeModal);

  return (
    <div>
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
          <img src={props.url} alt={props.alt} />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: propTypes.string,
  alt: propTypes.string,
  onClose: propTypes.func,
};
