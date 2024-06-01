import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { BASE_URL } from '@env';

export const handleDeleteNote = async (noteId, navigation) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.delete(`${BASE_URL}/notes/${noteId}`, {
      headers: { Authorization: token },
    });

    Alert.alert('Success', 'Note deleted successfully');
    navigation.goBack(); 
  } catch (error) {
    console.error('Error deleting note:', error);
    Alert.alert('Error', 'Could not delete note');
  }
};