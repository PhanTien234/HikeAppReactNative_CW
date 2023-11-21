import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AddHikeScreen from './screens/AddHikeScreen';
import SearchHikeScreen from './screens/SearchHikeScreen';
import HikeDetailsScreen from './screens/HikeDetailsScreen';
import Database from './Database'; // Import the Database module
import { Entypo, FontAwesome5, MaterialIcons } from 'react-native-vector-icons';
import UpdateHikeScreen from './screens/UpdateHikeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();







function Navigation(){
  return (
      <Tab.Navigator
        initialRouteName="List Hikes"
        screenOptions={{
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 15,
          },
          tabBarActiveTintColor: '#ff7f27',
          tabBarInactiveTintColor: '#bfbfbf',
          tabBarStyle: { height: 60 },
        }}
      >
        <Tab.Screen
          name="AddHike"
          component={AddHikeScreen}
          options={{
            tabBarLabel: 'Add Hike',
            tabBarIcon: () => <MaterialIcons name="add" size={27} color="#ff7f27" />,
          }}
        />
        <Tab.Screen
          name="List Hikes"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => <Entypo name="location" size={27} color="#ff7f27" />,
          }}
        />
        <Tab.Screen
          name="SearchHike"
          component={SearchHikeScreen}
          options={{
            tabBarLabel: 'Search Hike',
            tabBarIcon: () => <FontAwesome5 name="search-location" size={27} color="#ff7f27" />,
          }}
        />
      </Tab.Navigator>
    )
  }

  const App = () => {
    useEffect(() => {
      // Initialize the database
      Database.initDatabase();
    }, []);
  
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List Hikes" >
          <Stack.Screen name="HomeScreen" component={Navigation} options={{ headerShown: false}}/>
          <Stack.Screen name="HikeDetails" component={HikeDetailsScreen} />
          <Stack.Screen name="UpdateHike" component={UpdateHikeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default App;
