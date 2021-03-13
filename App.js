import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from 'react-native';

console.log(StatusBar.currentHeight);

export default function App() {
  return (
    <SafeAreaView style={{...styles.container, marginTop: StatusBar.currentHeight}}>
      <View style={styles.searchContainer}>
        <Text>search</Text>
      </View>
      <View style={styles.listContainer}>
        <Text>list</Text>
      </View>
      <ExpoStatusBar style='auto'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'green',
    padding: 15,
    justifyContent: 'center'
  },
  listContainer: {
    backgroundColor: 'purple',
    flex: 1,
    padding: 15,
  }
});
