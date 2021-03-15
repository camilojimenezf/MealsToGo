import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { RestaurantInfoCard } from '../componens/restaurants-info-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { Search } from '../componens/search.component';

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantScreen = () => {
  const { isLoading, error, restaurants } = useContext(RestaurantsContext);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading size={50} animating={true} color={Colors.red800} />
      </LoadingContainer>
    );
  }

  return (
    <SafeArea>
      <Search />
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={item} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
