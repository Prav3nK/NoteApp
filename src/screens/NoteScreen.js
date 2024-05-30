import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { sampleUsers } from '../dataSchema';
import dayjs from 'dayjs';

const NoteScreen = ({ route, navigation, styles: customStyles }) => {
  const { note } = route.params || {};
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [date, setDate] = useState(note?.date || dayjs().format('YYYY-MM-DD'));
  const theme = useTheme();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setDate(note.date);
    }
  }, [note]);

  const handleSaveNote = () => {
    if (note) {
      note.title = title;
      note.content = content;
      note.date = date;
    } else {
      const newNote = {
        id: Date.now().toString(),
        title,
        content,
        date,
      };
      sampleUsers[0].notes.push(newNote);
    }
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, customStyles, { backgroundColor: theme.colors.background }]}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, customStyles]}
      />
      <TextInput
        label="Content"
        value={content}
        onChangeText={setContent}
        style={[styles.input, customStyles]}
        multiline
      />
      <TextInput
        label="Date"
        value={date}
        onChangeText={setDate}
        style={[styles.input, customStyles]}
        disabled
      />
      <Button mode="contained" onPress={handleSaveNote} style={styles.button}>
        {note ? 'Update Note' : 'Add Note'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default NoteScreen;