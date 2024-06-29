import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CourseListScreen from '../screens/CourseListScreen';
import CourseDetailScreen from '../screens/CourseDetailsScreen';
import LessonScreen from '../screens/LessonScreen';
import MapScreen from '../screens/MapScreen';
import CameraScreen from '../screens/CameraScreen';

// Create stack and tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CourseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CourseList" 
        component={CourseListScreen} 
        options={{ title: 'Courses' }} 
      />
      <Stack.Screen 
        name="CourseDetail" 
        component={CourseDetailScreen} 
        options={{ title: 'Course Details' }} 
      />
      <Stack.Screen 
        name="Lesson" 
        component={LessonScreen} 
        options={{ title: 'Lesson' }} 
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Courses') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CourseStack} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen} 
        options={{ 
          headerShown: true,
          title: 'Camera',
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
