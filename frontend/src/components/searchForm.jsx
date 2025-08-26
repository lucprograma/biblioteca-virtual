import React from "react";

const SearchForm = ( ) => {
    return (
        <>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                id="searchInput"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-success"
                id="searchButton"
                type="submit"
              >
                Search
              </button>
            </form>
        </>
    )
}

export default SearchForm;