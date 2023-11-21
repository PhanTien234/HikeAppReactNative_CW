// HomeScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Database from '../Database';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);

  const fetchHikes = async () => {
    const result = await Database.getHikes();
    setHikes(result);
  };

  useFocusEffect(
    useCallback(() => {
      fetchHikes();
    }, [])
  );



  const handleDelete = async (id) => {
    await Database.deleteHike(id);
    fetchHikes();
  };

  const handleAddHike = () => {
    navigation.navigate('AddHike');
  };

  const handleHikeDetails = (id) => {
    navigation.navigate('HikeDetails', { id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={hikes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.hikeCard}>
            <View>
              <TouchableOpacity onPress={() => handleHikeDetails(item.id)}>
                <Text style={styles.hikeName}>{item.name}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("UpdateHike", {hike:item})} style={styles.updateButton}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  hikeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 80, // Increased height to accommodate the buttons
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  hikeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14, // Adjust the font size as needed
    color: '#666', // Adjust the color as needed
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  updateButton: {
    marginLeft: 10,
    backgroundColor: 'green', // Change the background color for the "Update" button
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: 'red', // Change the background color for the "Delete" button
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // Adjust the text color as needed
  },
});

  
export default HomeScreen;