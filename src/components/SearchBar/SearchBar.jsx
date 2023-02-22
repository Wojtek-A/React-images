import { useState } from 'react';
import propTypes from 'prop-types';
import css from './SearchBar.module.css';

export const SearchBar = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const handelChange = event => {
    setSearchQuery(event.target.value);
  };

  const handelSubimt = event => {
    event.preventDefault();
    props.onSubmitSearch(searchQuery);
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      handelSubimt(event);
    }
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handelSubimt}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.searchFormInput}
          onChange={handelChange}
          onKeyDown={onKeyDown}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmitSearch: propTypes.func,
};
