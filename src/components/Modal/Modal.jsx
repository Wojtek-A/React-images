import { Component } from 'react';
import propTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }
  onKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };
  onClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;
    return (
      <div>
        <div className={css.overlay} onClick={this.onClick}>
          <div className={css.modal}>
            <img src={url} alt={alt} />
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: propTypes.string,
  alt: propTypes.string,
  onClose: propTypes.func,
};
