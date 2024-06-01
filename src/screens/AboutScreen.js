import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Card, useTheme, IconButton } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';

const AboutScreen = ({ navigation, route, styles: customStyles }) => {
  const theme = useTheme();
  const { userId } = route.params;
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View style={[styles.container, customStyles, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={[styles.card, customStyles]}>
          <Card.Title title="About This App" titleStyle={customStyles} />
          <Card.Content>
            <Text style={customStyles}>This is a simple note-taking app built with React Native.</Text>
            <Text style={customStyles}>Version: 1.0.0</Text>
            <Text style={customStyles}>Developer: Praveen Kumar</Text>
            <TouchableOpacity onPress={toggleExpanded}>
              <Text style={[styles.collapseTitle, { color: theme.colors.primary }]}>
                {collapsed ? 'Show License' : 'Hide License'}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
              <Text style={customStyles}>
                MIT License{'\n\n'}
                Copyright (c) 2024 Praveen Kumar{'\n\n'}
                Permission is hereby granted, free of charge, to any person obtaining a copy{'\n'}
                of this software and associated documentation files (the "Software"), to deal{'\n'}
                in the Software without restriction, including without limitation the rights{'\n'}
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell{'\n'}
                copies of the Software, and to permit persons to whom the Software is{'\n'}
                furnished to do so, subject to the following conditions:{'\n\n'}
                The above copyright notice and this permission notice shall be included in all{'\n'}
                copies or substantial portions of the Software.{'\n\n'}
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR{'\n'}
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,{'\n'}
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE{'\n'}
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER{'\n'}
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,{'\n'}
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE{'\n'}
                SOFTWARE.
              </Text>
            </Collapsible>
          </Card.Content>
        </Card>
      </ScrollView>
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
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    padding: 16,
  },
  collapseTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
  },
});

export default AboutScreen;