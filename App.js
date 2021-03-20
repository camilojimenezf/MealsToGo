import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as firebase from 'firebase';

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

import { theme } from './src/infrastructure/theme';
import { Navigation } from './src/infrastructure/navigation';

import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAv4rAhH-bp0ozu1QfwkzTd0tWqHKWQD6A',
  authDomain: 'mealstogo-ebc9b.firebaseapp.com',
  projectId: 'mealstogo-ebc9b',
  storageBucket: 'mealstogo-ebc9b.appspot.com',
  messagingSenderId: '1072770124103',
  appId: '1:1072770124103:web:42e8a5d356e1ced86ca462',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword('camilob270@gmail.com', '123123')
      .then((user) => {
        console.log(user);
        setIsAuthenticated(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  let [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  let [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
