import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseDetailStart, fetchCourseDetailSuccess, fetchCourseDetailFailure } from '../redux/CourseSlice'; // Assuming these actions exist in your CourseSlice

function CourseDetailScreen({ route, navigation }) {
  const { courseId } = route.params;
  const dispatch = useDispatch();
  const { currentCourse, loading, error } = useSelector(state => state.courses);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      dispatch(fetchCourseDetailStart());
      try {
        // Simulating API call with local data
        const dataPath = require('../data/sampleData.js');
        const allCourses = await dataPath.default;
        const courseDetail = allCourses.find(course => course.id.toString() === courseId.toString());
        
        if (courseDetail) {
          dispatch(fetchCourseDetailSuccess(courseDetail));
        } else {
          throw new Error('Course not found');
        }
      } catch (err) {
        console.error('Error fetching course detail:', err);
        dispatch(fetchCourseDetailFailure(err.message));
      }
    };

    fetchCourseDetail();
  }, [dispatch, courseId]);

  const renderLessonItem = (lesson) => (
    <TouchableOpacity 
      key={lesson.id} 
      style={styles.lessonItem}
      onPress={() => navigation.navigate('LessonScreen', { lessonId: lesson.id })}
    >
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <Text style={styles.lessonDuration}>{lesson.duration} min</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading course details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!currentCourse) {
    return (
      <View style={styles.centerContainer}>
        <Text>Course not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{currentCourse.title}</Text>
      <Text style={styles.description}>{currentCourse.description}</Text>
      <Text style={styles.duration}>Duration: {currentCourse.duration}</Text>
      <Text style={styles.sectionTitle}>Lessons:</Text>
      {currentCourse.lessons.map(renderLessonItem)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  lessonItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  lessonDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default CourseDetailScreen;