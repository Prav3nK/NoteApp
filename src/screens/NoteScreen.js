import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';


const NoteScreen = ({ navigation, route, styles: customStyles }) => {
  const { userId, note } = route.params; // Get the userId and note from route parameters
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const theme = useTheme();
  const baseURL = BASE_URL; // Replace with your actual IP address

  const handleSaveNote = async () => {
    if (title === '' || content === '') {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (note) {
        // Editing an existing note
        const response = await axios.put(`${baseURL}/notes/${note.id}`, { title, content }, {
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          Alert.alert('Success', 'Note updated successfully');
        }
      } else {
        // Adding a new note
        const response = await axios.post(`${baseURL}/notes/${userId}`, { title, content }, {
          headers: { Authorization: token },
        });
        if (response.status === 201) {
          Alert.alert('Success', 'Note added successfully');
        }
      }
      // Navigate back to HomeScreen and pass userId
      navigation.replace('Home', { userId });
    } catch (error) {
      console.log('Error saving note:', error);
      Alert.alert('Error', 'Could not save note');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          label="Content"
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSaveNote} style={styles.button}>
          {note ? 'Update Note' : 'Add Note'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default NoteScreen;