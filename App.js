import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FindParkingScreen from './screens/FindParkingScreen';
import MenuScreen from './screens/MenuScreen';
import ParkingHistoryScreen from './screens/ParkingHistoryScreen';
import ParkingMapScreen from './screens/ParkingMapScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Find Parking') {
              iconName = 'map-search';
            } else if (route.name === 'Menu') {
              iconName = 'menu';
            } else if (route.name === 'Parking History') {
              iconName = 'history';
            } else if (route.name === 'Parking Map') {
              iconName = 'map-marker';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: '#000' },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
        })}
      >
        <Tab.Screen name="Find Parking" component={FindParkingScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
        <Tab.Screen name="Parking History" component={ParkingHistoryScreen} />
        <Tab.Screen name="Parking Map" component={ParkingMapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
