import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CourseCard from '../components/CourseCard';
import { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } from '../redux/CourseSlice';
import sampleData from '../data/sampleData.json'; // Import the local JSON file

function CourseListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { list: courses, loading, error } = useSelector(state => state.courses);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(fetchCoursesStart());
      try {
        // Use local JSON data instead of fetching from an API
        const data = sampleData.courses;
        console.log('Fetched data:', data); // Add this line
        dispatch(fetchCoursesSuccess(data));
      } catch (err) {
        console.log('Fetch error:', err.message); // Add this line
        dispatch(fetchCoursesFailure(err.message));
      }
    };

    fetchCourses();
  }, [dispatch]);

  const renderCourseCard = ({ item }) => (
    <CourseCard
      title={item.title}
      description={item.description}
      onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
    />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
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

  return (
    <View style={styles.container}>
      {courses.length > 0 ? (
        <FlatList
          data={courses}
          renderItem={renderCourseCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text>No courses available</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CourseListScreen;
