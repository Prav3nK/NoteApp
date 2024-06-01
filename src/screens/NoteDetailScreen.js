import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import { handleDeleteNote } from './deleteNote'; // Import the deleteNote function

const NoteDetailScreen = ({ route, navigation, styles: customStyles }) => {
  const { note, userId, onDeleteNote } = route.params; // Get userId and onDeleteNote callback from params
  const theme = useTheme();

  const confirmDelete = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            handleDeleteNote(note.id, navigation);
            onDeleteNote(note.id); // Call the onDeleteNote callback to update the state in HomeScreen
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container, customStyles, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.noteCard, customStyles]}>
        <Card.Title title={note.title} subtitle={note.date} titleStyle={customStyles} subtitleStyle={customStyles} />
        <Card.Content>
          <Text style={customStyles}>{note.content}</Text>
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
        <Button icon="pencil" mode="contained" onPress={() => navigation.navigate('Note', { note, userId })} style={styles.button}>
          Edit Note
        </Button>
        <Button icon="delete" mode="contained" color={theme.colors.error} onPress={confirmDelete} style={styles.button}>
          Delete Note
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noteCard: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  deleteButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
});

export default NoteDetailScreen;