import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';

export default function FindParkingScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    // Fetch the user's current location
    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log('User Location:', position.coords);
      },
      (error) => {
        console.error('Error fetching location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const handleSearch = () => {
    if (location.trim() !== '') {
      navigation.navigate('Parking Map', { location });
    } else if (userLocation) {
      navigation.navigate('Parking Map', { location: userLocation });
    } else {
      console.warn('No location provided');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Parking</Text>
      <Text style={styles.subtitle}>Your Spot, Just a Tap Away!</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a location"
        placeholderTextColor="#aaa"
        value={location}
        onChangeText={setLocation}
      />
      <FlatList
        data={parkingSpots}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No nearby parking spots found.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.parkingItem}
            onPress={() =>
              navigation.navigate('Parking Map', { location: item })
            }
          >
            <Text style={styles.parkingName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.gpsButton} onPress={handleSearch}>
        <Text style={styles.gpsButtonText}>Find Your Parking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#aaa', fontSize: 14, marginBottom: 10 },
  searchBar: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  gpsButton: {
    backgroundColor: '#00f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  gpsButtonText: { color: '#fff', fontWeight: 'bold' },
  emptyText: { color: '#555', textAlign: 'center', marginVertical: 20 },
  parkingItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  parkingName: { fontWeight: 'bold', color: '#fff' },
});
