import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangePasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor="#1A365D" style={{ margin: 0 }} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Change Password</Text>
      </View>
      <View style={styles.content}>
        
        <View style={styles.formGroup}>
           <Text style={styles.inputLabel}>Current Password</Text>
           <TextInput style={styles.input} placeholder="Enter current password" placeholderTextColor="#94A3B8" secureTextEntry />
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.inputLabel}>New Password</Text>
           <TextInput style={styles.input} placeholder="Enter new password" placeholderTextColor="#94A3B8" secureTextEntry />
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.inputLabel}>Confirm New Password</Text>
           <TextInput style={styles.input} placeholder="Confirm new password" placeholderTextColor="#94A3B8" secureTextEntry />
        </View>

        <TouchableOpacity style={styles.saveBtn}>
           <Text style={styles.saveBtnText}>Update Password</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginLeft: 8 },
  content: { padding: 20 },
  formGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, height: 44, paddingHorizontal: 12, fontSize: 14, color: '#0F172A' },
  saveBtn: { backgroundColor: '#1A365D', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  saveBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' }
});

export default ChangePasswordScreen;
