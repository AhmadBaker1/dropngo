import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';

export default function ParkingMapScreen({ route }) {
    const location = route?.params?.location; // Safely access location
    const [parkingSpots, setParkingSpots] = useState([]);
    const [routeCoords, setRouteCoords] = useState([]);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [region, setRegion] = useState({
      latitude: 51.0447,
      longitude: -114.0719, // Default to Calgary
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });

  // Mock parking spot data
  useEffect(() => {
    const mockParkingSpots = [
      { id: 1, name: 'Parking Spot 1', latitude: 51.0461, longitude: -114.0713 },
      { id: 2, name: 'Parking Spot 2', latitude: 51.0435, longitude: -114.0702 },
    ];
    setParkingSpots(mockParkingSpots);
  }, []);

  // Render route between current region and selected parking spot
  const renderRoute = async (destLat, destLng) => {
    const mockRoute = [
      { latitude: region.latitude, longitude: region.longitude },
      { latitude: destLat, longitude: destLng },
    ];
    setRouteCoords(mockRoute);
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center', marginTop: 20 }}>
          No location provided. Please go back and search again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {/* OpenStreetMap tile */}
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {parkingSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{
              latitude: spot.latitude,
              longitude: spot.longitude,
            }}
            title={spot.name}
          />
        ))}
        {selectedSpot && (
          <Polyline coordinates={routeCoords} strokeWidth={3} strokeColor="blue" />
        )}
      </MapView>
      <FlatList
        data={parkingSpots}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginVertical: 20, color: '#555' }}>
            No nearby parking spots found.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.parkingItem}
            onPress={() => {
              setSelectedSpot(item);
              renderRoute(item.latitude, item.longitude); // Fixed missing function
            }}
          >
            <Text style={styles.parkingName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  parkingItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  parkingName: { fontWeight: 'bold' },
});
