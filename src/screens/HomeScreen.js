import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, IconButton, useTheme } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from '@env';

const HomeScreen = ({ navigation, route, styles: customStyles }) => {
  const { userId } = route.params;
  const [notes, setNotes] = useState([]);
  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [])
  );

  const fetchNotes = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/notes/${userId}`, {
        headers: { Authorization: token },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDeleteNoteCallback = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('NoteDetail', { note: item, userId, onDeleteNote: handleDeleteNoteCallback })}>
      <Card style={[styles.noteCard, customStyles, { backgroundColor: theme.colors.surface }]}>
        <Card.Title 
          title={item.title} 
          subtitle={item.date} 
          titleStyle={[customStyles, { color: theme.colors.text, fontWeight: 'bold' }]} 
          subtitleStyle={[customStyles, { color: theme.colors.text }]} 
        />
        <Card.Content>
          <Text style={[customStyles, { color: theme.colors.text }]}>{item.content}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, customStyles, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <View style={[styles.bottomBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <IconButton icon="home" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('Home', { userId })} />
        <IconButton icon="note-plus" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('Note', { userId })} />
        <IconButton icon="information" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('About', { userId })} />
        <IconButton icon="cog" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('UserSettings', { userId })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  noteCard: {
    marginBottom: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
  },
});

export default HomeScreen;