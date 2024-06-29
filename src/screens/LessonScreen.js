import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

function LessonScreen({ route }) {
  const { lessonId } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);

  // In a real app, you'd fetch the specific lesson data
  // Here, we're assuming the structure of the state
  const lesson = useSelector(state => {
    const course = state.courses.list.find(course => 
      course.lessons.some(lesson => lesson.id === lessonId)
    );
    return course ? course.lessons.find(lesson => lesson.id === lessonId) : null;
  });

  if (!lesson) {
    return <View><Text>Lesson not found</Text></View>;
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: lesson.videoUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={isPlaying}
          style={styles.video}
        />
        <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.duration}>{lesson.duration} min</Text>
      <Text style={styles.description}>{lesson.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 16,
  },
  video: {
    flex: 1,
  },
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  duration: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 16,
  },
});

export default LessonScreen;