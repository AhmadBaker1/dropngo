import axios from 'axios';

export const fetchParkingSpots = async (latitude, longitude, radius = 1000) => {
  try {
    const query = `
      [out:json];
      (
        node["amenity"="parking"](around:${radius},${latitude},${longitude});
        way["amenity"="parking"](around:${radius},${latitude},${longitude});
        relation["amenity"="parking"](around:${radius},${latitude},${longitude});
      );
      out center;
    `;

    const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { elements } = response.data;
    return elements.map((element) => ({
      id: element.id,
      name: element.tags?.name || 'Unnamed Parking Spot',
      latitude: element.lat || element.center?.lat,
      longitude: element.lon || element.center?.lon,
    }));
  } catch (error) {
    console.error('Error fetching parking spots:', error);
    return [];
  }
};

  export const fetchRoute = async (origin, destination) => {
    try {
      const API_KEY = 'AIzaSyCth6OLu1My_XwhQHgDiaxTs5x8x36r86U';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`
      );
      const data = await response.json();
      return data.routes[0]?.overview_polyline.points || ''; // Return an empty string if no route
    } catch (error) {
      console.error('Error fetching route:', error);
      return '';
    }
  };
  