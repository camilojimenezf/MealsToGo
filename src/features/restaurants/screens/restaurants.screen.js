import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { RestaurantInfoCard } from '../componens/restaurants-info-card.component';

export const RestaurantScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar placeholder="Search" onChangeText={() => {}} value={null} />
      </View>
      <View style={styles.listContainer}>
        <RestaurantInfoCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  searchContainer: {
    padding: 15,
    justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: 'purple',
    flex: 1,
    padding: 15,
  },
});
