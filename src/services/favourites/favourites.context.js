import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationContext } from '../../services/authentication/authentication.context';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = async (updatedFavourites, uid) => {
    try {
      const jsonRestaurants = JSON.stringify([...updatedFavourites]);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonRestaurants);
    } catch (e) {
      console.log('error storing', e);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const loadedFavourites = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (loadedFavourites) {
        setFavourites(JSON.parse(loadedFavourites));
      }
    } catch (e) {
      console.log('error loading', e);
    }
  };

  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const updatedFavourites = favourites.filter(
      (f) => f.placeId !== restaurant.placeId
    );
    setFavourites(updatedFavourites);
  };

  useEffect(() => {
    if (user && user.uid) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && favourites.length) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
