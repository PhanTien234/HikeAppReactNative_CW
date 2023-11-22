// screens/SearchHikeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Database from '../Database';
import { MaterialIcons } from 'react-native-vector-icons';

const SearchHikeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const result = await Database.searchHikeByName(searchTerm);
    setSearchResults(result);
  };

  const renderHikeItem = ({ item }) => (
    <TouchableOpacity style={styles.hikeCard} onPress={() => navigation.navigate("HikeDetails", {hike: item})}>
      <View style={styles.hikeCardInfo}>
        <Text style={styles.cardLabel}>Name: {item.name}</Text>
        <Text>Location: {item.location}</Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate("UpdateHike", {hike: item})}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteHike(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleDeleteHike = async (id) => {
    await Database.deleteHike(id);
    const results = await Database.searchHikeByName(searchTerm);
    setSearchResults(results);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type name of Hike you want to search"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <MaterialIcons name="search" size={32} color="#ff7f27" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHikeItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  hikeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  hikeCardInfo: {
    width: '65%',
    height: 40,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '35%',
  },
  deleteButton: {
    backgroundColor: "#ff2400",
    padding: 4,
    borderRadius: 10,
  },
  updateButton: {
    backgroundColor: "#6abe62",
    padding: 4,
    borderRadius: 10,
    marginEnd: 2,
  },
  buttonText: {
    color: "white",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    padding:8,
    borderWidth: 1, // Add border width
    borderColor: '#ff7f27', // Add border color
    borderRadius: 5,
  },
  searchButton: {
    transform: [{ translateX: -40 }, { translateY: 3 }],
  },
});

export default SearchHikeScreen;
