import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, Avatar, Divider, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [appearanceEnabled, setAppearanceEnabled] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const showUpcomingFeature = () => {
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const renderSettingItem = (icon, title, subtitle, rightElement, onPress) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIconBg}>
         <IconButton icon={icon} size={20} iconColor="#1A365D" style={{ margin: 0 }} onPress={onPress} />
      </View>
      <View style={styles.settingTextContainer}>
         <Text style={styles.settingTitle}>{title}</Text>
         {subtitle ? <Text style={styles.settingSubtitle}>{subtitle}</Text> : null}
      </View>
      {rightElement || <IconButton icon="chevron-right" size={20} iconColor="#94A3B8" style={{ margin: 0 }} onPress={onPress} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings & Help</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Section */}
        <View style={styles.profileSection}>
           <Avatar.Text size={60} label="AD" style={styles.avatar} labelStyle={{ fontSize: 24, fontWeight: '700' }} />
           <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Admin User</Text>
              <Text style={styles.profileRole}>Store Manager • ThreadMasters Pro</Text>
           </View>
           <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit</Text>
           </TouchableOpacity>
        </View>

        {/* Settings Groups */}
        <View style={styles.sectionContainer}>
           <Text style={styles.sectionHeader}>Preferences</Text>
           <View style={styles.card}>
              {renderSettingItem('bell-outline', 'Push Notifications', 'Updates on service & orders', 
                 <Switch value={notificationsEnabled} onValueChange={() => { setNotificationsEnabled(!notificationsEnabled); showUpcomingFeature(); }} color="#1A365D" />,
                 showUpcomingFeature
              )}
              <Divider style={styles.divider} />
              {renderSettingItem('translate', 'Language', 'English (US)')}
              <Divider style={styles.divider} />
              {renderSettingItem('theme-light-dark', 'Appearance', 'Light Mode',
                 <Switch value={appearanceEnabled} onValueChange={() => { setAppearanceEnabled(!appearanceEnabled); showUpcomingFeature(); }} color="#1A365D" />,
                 showUpcomingFeature
              )}
           </View>
        </View>

        <View style={styles.sectionContainer}>
           <Text style={styles.sectionHeader}>Account & Security</Text>
           <View style={styles.card}>
              {renderSettingItem('shield-account-outline', 'Security & Privacy', 'Password, 2FA, Sessions', null, () => navigation.navigate('SecurityPrivacy'))}
              <Divider style={styles.divider} />
              {renderSettingItem('account-group-outline', 'Team Management', 'Add or remove staff accounts', null, showUpcomingFeature)}
           </View>
        </View>

        <View style={styles.sectionContainer}>
           <Text style={styles.sectionHeader}>Help & Support</Text>
           <View style={styles.card}>
              {renderSettingItem('help-circle-outline', 'Help Center', 'FAQs and troubleshooting', null, () => navigation.navigate('HelpCenter'))}
              <Divider style={styles.divider} />
              {renderSettingItem('file-document-outline', 'User Manuals', 'Machine documentation', null, showUpcomingFeature)}
              <Divider style={styles.divider} />
              {renderSettingItem('headset', 'Contact Support', 'Get in touch with our team', null, () => navigation.navigate('ContactSupport'))}
           </View>
        </View>

        <View style={styles.sectionContainer}>
           <Text style={styles.sectionHeader}>About</Text>
           <View style={styles.card}>
              {renderSettingItem('information-outline', 'About ThreadMasters Pro', 'v1.2.0 (Build 42)')}
              <Divider style={styles.divider} />
              {renderSettingItem('file-certificate-outline', 'Terms & Privacy Policy', null, null, showUpcomingFeature)}
           </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
           <IconButton icon="logout" size={20} iconColor="#EF4444" style={{ margin: 0, marginRight: 8 }} onPress={() => {}} />
           <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>ThreadMasters Pro Admin App</Text>
        <Text style={styles.footerText}>© 2026 ThreadMasters. All rights reserved.</Text>

      </ScrollView>

      {snackbarVisible && (
        <View style={styles.customToast}>
          <Text style={styles.customToastText}>Upcoming feature</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatar: {
    backgroundColor: '#1A365D',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 12,
    color: '#64748B',
  },
  editBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A365D',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 12,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  divider: {
    backgroundColor: '#F1F5F9',
    height: 1,
    marginLeft: 68,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginTop: 8,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  customToast: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#FBBF24',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 9999,
  },
  customToastText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 14,
  }
});

export default SettingsScreen;
