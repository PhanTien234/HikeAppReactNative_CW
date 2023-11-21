// screens/SearchHikeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import Database from '../Database';

const SearchHikeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const result = await Database.searchHikeByName(searchTerm);
    setSearchResults(result);
  };

  return (
    <View>
      <TextInput placeholder="Search Hike" value={searchTerm} onChangeText={setSearchTerm} />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.location}</Text>
            <Text>{item.date}</Text>
            <Text>{item.parking}</Text>
            <Text>{item.length}</Text>
            <Text>{item.level}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchHikeScreen;
