import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function LessonItem({ title, duration, completed, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{duration} min</Text>
      </View>
      <Ionicons 
        name={completed ? "checkmark-circle" : "play-circle"} 
        size={24} 
        color={completed ? "green" : "blue"} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default LessonItem;