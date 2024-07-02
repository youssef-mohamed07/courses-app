import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  fetchCourseDetailStart,
  fetchCourseDetailSuccess,
  fetchCourseDetailFailure,
} from "../redux/CourseSlice";

function CourseDetailScreen({ route, navigation }) {
  const { courseId } = route.params;
  const [courseDetails, setCourseDetails] = useState({});

  // This is Basmga Ya sa7bi

  // useEffect(() => {
  //   const fetchCourseDetail = async () => {
  //     // dispatch(fetchCourseDetailStart());
  //     try {
  //       const response = await axios.get(
  //         "https://mocki.io/v1/53024b09-5964-4158-bb96-407c85d064c7"
  //       );
  //       const allCourses = response.data;
  //       console.log(response.data);
  //       const courseDetail = allCourses.find(
  //         (course) => course.id.toString() === courseId.toString()
  //       );

  //       if (courseDetail) {
  //         dispatch(fetchCourseDetailSuccess(courseDetail));
  //       } else {
  //         throw new Error("Course not found");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching course detail:", err);
  //       dispatch(fetchCourseDetailFailure(err.message));
  //     }
  //   };

  //   fetchCourseDetail();
  // }, [dispatch, courseId]);

  const fetchData = async () => {
    const response = await axios.get("https://mocki.io/v1/53024b09-5964-4158-bb96-407c85d064c7");
    const allCourses = response.data.courses;
    const courseDetail = allCourses?.find((course) => course.id.toString() === courseId.toString());
    setCourseDetails(courseDetail);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderLessonItem = (lesson) => (
    <TouchableOpacity
      key={lesson.id}
      style={styles.lessonItem}
      onPress={() => navigation.navigate("LessonScreen", { lessonId: lesson.id })}
    >
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <Text style={styles.lessonDuration}>{lesson.duration} min</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{courseDetails.title}</Text>
      <Text style={styles.description}>{courseDetails.description}</Text>
      <Text style={styles.duration}>Duration: {courseDetails.duration}</Text>
      <Text style={styles.sectionTitle}>Lessons:</Text>
      {courseDetails?.lessons?.map(renderLessonItem)}
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
    fontWeight: "bold",
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
    fontWeight: "bold",
    marginBottom: 8,
  },
  lessonItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  lessonTitle: {
    fontSize: 16,
  },
  lessonDuration: {
    fontSize: 14,
    color: "#888",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CourseDetailScreen;