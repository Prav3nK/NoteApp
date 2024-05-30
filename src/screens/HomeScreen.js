import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, FAB, Button, IconButton } from 'react-native-paper';
import { sampleUsers } from '../dataSchema';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState(sampleUsers[0].notes); // Assume the first user is logged in for simplicity

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('NoteDetail', { note: item })}>
      <Card style={styles.noteCard}>
        <Card.Title title={item.title} subtitle={item.date} />
        <Card.Content>
          <Text>{item.content}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.bottomBar}>
        <IconButton
          icon="home"
          size={24}
          onPress={() => navigation.navigate('Home')}
        />
        <IconButton
          icon="note-plus"
          size={24}
          onPress={() => navigation.navigate('Note')}
        />
        <IconButton
          icon="information"
          size={24}
          onPress={() => navigation.navigate('About')}
        />
        <IconButton
          icon="cog"
          size={24}
          onPress={() => navigation.navigate('UserSettings')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});

export default HomeScreen;
