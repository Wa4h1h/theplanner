import { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState({title: null, date: null});
  
  return <SearchContext.Provider value={{query, setQuery}}>
    {children}
  </SearchContext.Provider>
}

export default SearchProvider;