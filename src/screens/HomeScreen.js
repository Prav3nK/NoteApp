import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, IconButton, useTheme } from 'react-native-paper';
import { sampleUsers } from '../dataSchema';

const HomeScreen = ({ navigation, styles: customStyles }) => {
  const [notes, setNotes] = useState(sampleUsers[0].notes);
  const theme = useTheme();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('NoteDetail', { note: item })}>
      <Card style={[styles.noteCard, customStyles, { backgroundColor: theme.colors.surface }]}>
        <Card.Title title={item.title} subtitle={item.date} titleStyle={[customStyles, { color: theme.colors.text }]} subtitleStyle={[customStyles, { color: theme.colors.text }]} />
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
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={[styles.bottomBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <IconButton icon="home" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('Home')} />
        <IconButton icon="note-plus" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('Note')} />
        <IconButton icon="information" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('A')} />
        <IconButton icon="cog" size={24} color={theme.colors.primary} onPress={() => navigation.navigate('UserSettings')} />
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