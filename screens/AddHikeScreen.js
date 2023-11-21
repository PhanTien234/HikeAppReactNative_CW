import React, {useEffect, useState} from "react";
import { useIsFocused } from "@react-navigation/native";
import {Alert, StyleSheet, Text,TouchableOpacity, View, ScrollView, Button, Pressable} from 'react-native';
import { RadioButton, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import Database from "../Database";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const AddHikeScreen = ({navigation}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const isFocused = useIsFocused();
    const [hikeName, setHikeName] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [parking, setParking] = useState("Yes");
    const [length, setLength] = useState("");
    const [level, setLevel] = useState("");
    const [description, setDescription] = useState("");

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = date => {
        hideDatePicker();
        const formattedDate = moment(date).format('DD/MM/YYYY');
        setDate(formattedDate);
      };

    useEffect(() =>{
        const fetchData = async () => {
            setHikeName("");
            setLocation("");
            setDate("");
            setParking("Yes");
            setLength("");
            setLevel("");
            setDescription("");
          };
      
          fetchData();
    },[isFocused]);
    

    const dropData = [
        {label: 'Easy', value:'Easy'},
        {label: 'Morderate', value:'Morderate'},
        {label: 'Difficult', value:'Difficult'},
    ]

    const renderDropDown = ( item ) => {
        return (
            <Text style={styles.dropText}>{item.label}</Text> 
        );
    };

    const handleAddHike = async () => {
        if(!hikeName|| !location|| !date|| !parking|| !length|| !level){
            Alert.alert("Error", "Please fill out requirement field!");
            return; 
        }
        await Database.addHike(hikeName, location, date, parking, length, level, description);
        Alert.alert("Add", "A hike has been created!");
        navigation.navigate("List Hikes");
    };
    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.inputInfo}
                mode="outlined"
                outlineColor="#ff7f27"
                activeOutlineColor="#ff7f27"
                label="Name of the Hike"
                value={hikeName}
                onChangeText={setHikeName}
            />
        
            <TextInput
                style={styles.inputInfo}
                mode="outlined"
                outlineColor="#ff7f27"
                activeOutlineColor="#ff7f27"
                label="Location"
                value={location}
                onChangeText={setLocation}
            />
            <View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                    editable={false}
                    style={styles.inputInfo}
                    mode="outlined"
                    outlineColor="#ff7f27"
                    activeOutlineColor="#ff7f27"
                    label="Date of the hike"
                    value={date}
                    onChangeText={setDate}
                />
            </TouchableOpacity>

            <RadioButton.Group  onValueChange={parking => setParking(parking)} value={parking}>
                <View style={styles.radioButtonContainer}>
                    <Text style={{fontSize: 20, fontWeight: 400, color: '#ff7f27'}}>Parking</Text>
                    <View style={styles.radioButton}>
                        <RadioButton.Item label="Yes" value="Yes"/>
                        <RadioButton.Item label="No" value="No"/>
                    </View>
                </View>
            </RadioButton.Group>    

            <TextInput
            style={styles.inputInfo}
                mode="outlined"
                outlineColor="#ff7f27"
                activeOutlineColor="#ff7f27"
                label="Length of the hike"
                value={length}
                onChangeText={setLength}
            />
            <TextInput
                style={styles.inputInfo}
                editable={false}
                outlineColor="#ff7f27"
                activeOutlineColor="#ff7f27"
                mode="outlined"
                label="Difficulty level"
                value={level}
                onChangeText={setLevel}
            />
            <Dropdown
                style={styles.dropStyle}
                placeholder=""
                value={level}
                onChange={item =>{
                    setLevel(item.value);
                }}
                onChangeText={setLevel}
                data={dropData}
                renderItem={renderDropDown}
            />
           
            <TextInput
                style={styles.descriptionStyle}
                mode="outlined"
                outlineColor="#ff7f27"
                activeOutlineColor="#ff7f27"
                label="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />  
            <TouchableOpacity style={styles.addBtn} onPress={handleAddHike}>
                <Text style={{color: '#fff', fontSize: 20,}}>Add Hike</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create ({
   container: {
    flex: 1,
    padding: 10,
   },
   inputInfo: {
    width: '100%',
    marginVertical: 5,
    fontSize: 17,
   },
   addBtn: {
    backgroundColor: "#ff7f27",
    padding: 16,
    borderRadius: 9,
    alignItems: "center",
    marginTop: 5,
    transform: [{translateY: -40}],
    },
    dropStyle:{
        transform: [{translateY: -45}],
        marginHorizontal:10,
    },
    descriptionStyle:{
        alignContent: 'flex-start',
        height: 80,
        transform: [{translateY: -40}],
        width: '100%',
        marginVertical: 5,
    },      
    dropText: {
        fontSize: 17,
        paddingVertical: 3,
        paddingStart:10,
        marginVertical: 3,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        transform: [{translateX: 15}],
        fontSize: 17,
    },
    textFormat: {
        fontSize: 17,
    },

});

export default AddHikeScreen;