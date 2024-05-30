import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, useTheme } from 'react-native-paper';

const NoteDetailScreen = ({ route, navigation, styles: customStyles }) => {
  const { note, userId } = route.params;
  const theme = useTheme();

  return (
    <View style={[styles.container, customStyles, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.noteCard, customStyles]}>
        <Card.Title title={note.title} subtitle={note.date} titleStyle={customStyles} subtitleStyle={customStyles} />
        <Card.Content>
          <Text style={customStyles}>{note.content}</Text>
        </Card.Content>
      </Card>
      <Button icon="pencil" mode="contained" onPress={() => navigation.navigate('Note', { note, userId })} style={styles.button}>
        Edit Note
      </Button>
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
  button: {
    marginTop: 16,
  },
});

export default NoteDetailScreen;