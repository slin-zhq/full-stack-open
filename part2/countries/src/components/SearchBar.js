const SearchBar = ({ query, onQueryChange }) => {
    return (
        <div>
            find countries <input value={query} onChange={onQueryChange} />
        </div>
    )
}

export default SearchBar