import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const SecurityPrivacyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor="#1A365D" style={{ margin: 0 }} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Security & Privacy</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Account Details</Text>
           <View style={styles.card}>
              
              <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ChangeUsername')}>
                 <View style={styles.iconBg}><IconButton icon="account-edit-outline" size={20} iconColor="#1A365D" style={{margin:0}} onPress={() => navigation.navigate('ChangeUsername')}/></View>
                 <View style={styles.listText}>
                    <Text style={styles.itemTitle}>Change Username</Text>
                    <Text style={styles.itemSub}>Update your display name</Text>
                 </View>
                 <IconButton icon="chevron-right" size={20} iconColor="#94A3B8" style={{margin:0}} onPress={() => navigation.navigate('ChangeUsername')}/>
              </TouchableOpacity>
              
              <Divider style={styles.divider} />
              
              <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ChangePassword')}>
                 <View style={styles.iconBg}><IconButton icon="lock-outline" size={20} iconColor="#1A365D" style={{margin:0}} onPress={() => navigation.navigate('ChangePassword')}/></View>
                 <View style={styles.listText}>
                    <Text style={styles.itemTitle}>Change Password</Text>
                    <Text style={styles.itemSub}>Update your account password</Text>
                 </View>
                 <IconButton icon="chevron-right" size={20} iconColor="#94A3B8" style={{margin:0}} onPress={() => navigation.navigate('ChangePassword')}/>
              </TouchableOpacity>

           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginLeft: 8 },
  content: { padding: 20, paddingBottom: 40 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginBottom: 12, marginLeft: 4 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  iconBg: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  listText: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: '600', color: '#0F172A', marginBottom: 2 },
  itemSub: { fontSize: 12, color: '#64748B' },
  divider: { backgroundColor: '#F1F5F9', height: 1, marginLeft: 64 }
});

export default SecurityPrivacyScreen;
