import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

import DashboardScreen from '../screens/Dashboard/Dashboard';
import ProductListScreen from '../screens/Products/ProductList';
import GenerateBillScreen from '../screens/Billing/GenerateBill';
import StoreFrontScreen from '../screens/Dashboard/StoreFront';
import PlaceholderScreen from '../screens/Placeholder';

const SettingsScreen = () => <PlaceholderScreen name="Settings" />;

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'view-dashboard-outline';
          } else if (route.name === 'Products') {
            iconName = 'package-variant-closed';
          } else if (route.name === 'Sales') {
            iconName = 'currency-inr';
          } else if (route.name === 'Service') {
            iconName = 'wrench-outline';
          } else if (route.name === 'More') {
            iconName = 'menu';
          }
          return <IconButton icon={iconName} size={size} iconColor={color} style={{ margin: 0 }} />;
        },
        tabBarActiveTintColor: '#1A365D',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60 },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Sales" component={GenerateBillScreen} />
      <Tab.Screen name="Service" component={StoreFrontScreen} />
      <Tab.Screen name="More" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
