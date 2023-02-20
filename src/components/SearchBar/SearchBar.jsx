import { Component } from 'react';
import propTypes from 'prop-types';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handelChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handelSubimt = event => {
    event.preventDefault();
    this.props.onSubmitSearch(this.state.searchQuery);
    this.reset();
  };
  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.handelSubimt(event);
    }
  };

  reset() {
    this.setState({ searchQuery: '' });
  }

  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handelSubimt}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            onChange={this.handelChange}
            onKeyDown={this.onKeyDown}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmitSearch: propTypes.func,
};
