// screens/HikeDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Database from '../Database';

const HikeDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const [hikeDetails, setHikeDetails] = useState(null);

  useEffect(() => {
    const fetchHikeDetails = async () => {
      try {
        const [hike] = await Database.searchHikeById(id);
        setHikeDetails(hike);
      } catch (error) {
        console.error('Error fetching hike details:', error);
      }
    };

    fetchHikeDetails();
  }, [id]);

  if (!hikeDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.title]}>Name:</Text>
        <Text style={styles.showData}>{hikeDetails.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.title]}>Location:</Text>
        <Text style={styles.showData}>{hikeDetails.location}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Date:</Text>
        <Text style={styles.showData}>{hikeDetails.date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Parking:</Text>
        <Text style={styles.showData}>{hikeDetails.parking}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Length:</Text>
        <Text style={styles.showData}>{hikeDetails.length}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Level:</Text>
        <Text style={styles.showData}>{hikeDetails.level}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Description:</Text>
        <Text style={styles.showData}>{hikeDetails.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 5,
        flexDirection: 'column',
        padding: 15,
      },
      title: {
        fontWeight: 'bold',
        color: '#000', // You can change the color if needed
        width: '40%',
        marginBottom: 10,
        fontSize: 18,
      },
      showData: {
        marginBottom: 10,
        fontSize: 20,
        height: 30,
        fontSize:18,
        width: '60%',
      },
      row: {
        flexDirection: 'row',
        marginTop: 15,
        padding:10,
        borderWidth: 1, // Add a border to the bottom
        borderColor: '#ff7f27', // Border color
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

export default HikeDetailsScreen;
