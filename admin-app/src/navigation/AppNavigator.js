import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DashboardScreen from '../screens/Dashboard/Dashboard';
import GenerateBillScreen from '../screens/Billing/GenerateBill';
import ProductListScreen from '../screens/Products/ProductList';
import WarrantyListScreen from '../screens/Warranty/WarrantyList';
import WarrantyDetailsScreen from '../screens/Warranty/WarrantyDetails';
import StoreFrontScreen from '../screens/Dashboard/StoreFront';
import ServiceListScreen from '../screens/Service/ServiceList';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import SecurityPrivacyScreen from '../screens/Settings/SecurityPrivacyScreen';
import BillingScreen from '../screens/Settings/BillingScreen';
import TeamManagementScreen from '../screens/Settings/TeamManagementScreen';
import HelpCenterScreen from '../screens/Settings/HelpCenterScreen';
import UserManualsScreen from '../screens/Settings/UserManualsScreen';
import ContactSupportScreen from '../screens/Settings/ContactSupportScreen';
import ChangeUsernameScreen from '../screens/Settings/ChangeUsernameScreen';
import ChangePasswordScreen from '../screens/Settings/ChangePasswordScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'view-dashboard-outline';
          } else if (route.name === 'Products') {
            iconName = 'package-variant-closed';
          } else if (route.name === 'Warranty') {
            iconName = 'check-decagram-outline';
          } else if (route.name === 'Service') {
            iconName = 'wrench-outline';
          } else if (route.name === 'More') {
            iconName = 'menu';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1A365D',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 10, paddingTop: 5, height: 65 },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Warranty" component={WarrantyListScreen} />
      <Tab.Screen name="Service" component={ServiceListScreen} />
      <Tab.Screen name="More" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="StoreFront" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StoreFront" component={StoreFrontScreen} />
      <Stack.Screen name="AdminTabs" component={TabNavigator} />
      <Stack.Screen name="WarrantyDetails" component={WarrantyDetailsScreen} />
      <Stack.Screen name="GenerateBill" component={GenerateBillScreen} />
      <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacyScreen} />
      <Stack.Screen name="Billing" component={BillingScreen} />
      <Stack.Screen name="TeamManagement" component={TeamManagementScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="UserManuals" component={UserManualsScreen} />
      <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
      <Stack.Screen name="ChangeUsername" component={ChangeUsernameScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
