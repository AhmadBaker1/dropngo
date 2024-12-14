import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ParkingHistoryScreen() {
  const history = [
    { date: '4 November 2024', location: 'Calgary Central Library', rate: '$5.00/hour' },
    { date: '1 November 2024', location: 'Calgary Tower', rate: '$7.00/hour' },
    { date: '26 October 2024', location: 'City Hall Parking', rate: '$4.00/hour' },
  ];

  return (
    <ScrollView style={styles.container}>
      {history.map((item, index) => (
        <View key={index} style={styles.historyItem}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.rate}>{item.rate}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  historyItem: { backgroundColor: '#333', padding: 15, borderRadius: 5, marginVertical: 10 },
  date: { color: '#fff', fontWeight: 'bold' },
  location: { color: '#aaa' },
  rate: { color: '#0f0', marginTop: 5 },
});
