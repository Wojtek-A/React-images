import propsTypes from 'prop-types';
import css from './Button.module.css';

export const ButtonLoadMore = props => {
  return (
    <button className={css.button} type="button" onClick={props.onClick}>
      Load more
    </button>
  );
};

ButtonLoadMore.propsTypes = {
  onClick: propsTypes.func,
};
