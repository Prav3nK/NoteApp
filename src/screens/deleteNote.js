import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { BASE_URL } from '@env'; // Correct way to import

export const handleDeleteNote = async (noteId, notes, setNotes, navigation) => {
  try {
    const token = await AsyncStorage.getItem('token');
    await axios.delete(`${BASE_URL}/notes/${noteId}`, {
      headers: { Authorization: token },
    });

    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes); // Update the notes state

    Alert.alert('Success', 'Note deleted successfully', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  } catch (error) {
    console.error('Error deleting note:', error);
    Alert.alert('Error', 'Could not delete note');
  }
};