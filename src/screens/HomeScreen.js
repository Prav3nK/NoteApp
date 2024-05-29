import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, FAB, Button } from 'react-native-paper';
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
      <Button icon="cog" mode="contained" onPress={() => navigation.navigate('UserSettings')}>
        Settings
      </Button>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('Note')}
      />
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default HomeScreen;
