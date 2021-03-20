import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { RestaurantInfoCard } from '../components/restaurants-info-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { FavouritesBar } from '../../../components/favourites/favourites-bar.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { Search } from '../components/search.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { RestaurantList } from '../components/restaurant-list.styles';
import { FadeInView } from '../../../components/animations/fade.animation';

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

// all components inside a Navigator has the navigation props.
export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading size={50} animating={true} color={Colors.red800} />
      </LoadingContainer>
    );
  }

  return (
    <SafeArea>
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={(route, restaurant) =>
            navigation.navigate(route, restaurant)
          }
        />
      )}
      <RestaurantList
        data={restaurants}
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
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
