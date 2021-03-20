import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { RestaurantInfoCard } from '../../restaurants/components/restaurants-info-card.component';
import { RestaurantList } from '../../restaurants/components/restaurant-list.styles';

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

// all components inside a Navigator has the navigation props.
export const FavouritesScreen = ({ navigation }) => {
  const { isLoading, favourites } = useContext(FavouritesContext);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading size={50} animating={true} color={Colors.red800} />
      </LoadingContainer>
    );
  }

  if (!favourites || !favourites.length) {
    return <NoFavouritesArea>No favourites yet</NoFavouritesArea>;
  }

  return (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
