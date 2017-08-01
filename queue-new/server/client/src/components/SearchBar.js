import React from 'react';

class SearchBar extends React.Component {
  onInputChange(term) {
    this.props.onTermChange(term);
  }

  render() {
    return (
      <div className="search">
        <input placeholder="Search Customer" onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }
}

export default SearchBar;
