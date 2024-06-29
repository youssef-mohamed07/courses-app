import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchCourseDetailStart, fetchCourseDetailSuccess, fetchCourseDetailFailure } from '../redux/CourseSlice';

function CourseDetailScreen({ route, navigation }) {
  const { courseId } = route.params;
  const dispatch = useDispatch();
  const { currentCourse, loading, error } = useSelector(state => state.courses);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      dispatch(fetchCourseDetailStart());
      try {
        const response = await axios.get('https://mocki.io/v1/53024b09-5964-4158-bb96-407c85d064c7');
        const allCourses = response.data;
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
  // Your existing styles
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lessonItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  lessonTitle: {
    fontSize: 16,
  },
  lessonDuration: {
    fontSize: 14,
    color: '#888',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CourseDetailScreen;
