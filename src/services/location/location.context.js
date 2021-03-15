import React, { useState, createContext, useEffect } from 'react';

import { locationRequest, locationTransform } from './location.service';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [keyword, setKeyword] = useState('san francisco');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  // es recomendable que el contexto utilice el useEffect al actualizar su estado, en lugar de llamar la función
  // onSearch directamente desde el search component y que onSearch haga la request directamente, es mejor que llame a
  // setKeyword y useEffect se dispare cuando keyword cambie su valor.
  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: (searchKeyword) => onSearch(searchKeyword),
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
