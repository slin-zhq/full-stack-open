const SearchBar = ({ query, onQueryChange, isCountryFound }) => {
    return (
        <div>
            <div>
                find countries <input value={query} onChange={onQueryChange} />
            </div>
            { isCountryFound ? (
                <div style={{color: 'gray'}}>
                    (i) Country found. Type any character to start a new search. 
                </div>
            ): null}
        </div>
    )
}

export default SearchBar