import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Try Premium</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Funds</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Payment Record</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Location History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  button: { backgroundColor: '#333', padding: 15, borderRadius: 5, marginVertical: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
