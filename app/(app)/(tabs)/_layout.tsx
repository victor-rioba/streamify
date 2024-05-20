import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { FontSize } from '@/constants/Fonts';
import { useColorTheme } from '@/hooks/useColorTheme';

export default function TabsLayout() {
  const theme = useColorTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarLabelStyle: {
          fontSize: FontSize.xs,
          fontWeight: '500',
        },
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          paddingTop: 8,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={95}
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: 'hidden',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
