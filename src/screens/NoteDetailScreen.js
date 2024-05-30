import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

const NoteDetailScreen = ({ route, navigation, styles: customStyles }) => {
  const { note } = route.params;

  return (
    <View style={[styles.container, customStyles]}>
      <Card style={[styles.noteCard, customStyles]}>
        <Card.Title title={note.title} subtitle={note.date} />
        <Card.Content>
          <Text>{note.content}</Text>
        </Card.Content>
      </Card>
      <Button icon="pencil" mode="contained" onPress={() => navigation.navigate('Note', { note })}>
        Edit Note
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  noteCard: {
    marginBottom: 16,
  },
});

export default NoteDetailScreen;