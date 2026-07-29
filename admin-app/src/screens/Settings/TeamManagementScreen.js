import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { IconButton, Avatar, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const TeamManagementScreen = ({ navigation }) => {
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor="#1A365D" style={{ margin: 0 }} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Team Management</Text>
        <View style={{flex: 1}}/>
        <TouchableOpacity style={styles.addBtn} onPress={() => setInviteModalVisible(true)}>
           <IconButton icon="plus" size={16} iconColor="#FFFFFF" style={{margin:0, marginRight: 4}}/>
           <Text style={styles.addBtnText}>Invite</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.card}>
           <View style={styles.listItem}>
              <Avatar.Text size={40} label="AD" style={{backgroundColor: '#1A365D', marginRight: 12}} />
              <View style={styles.listText}>
                 <Text style={styles.itemTitle}>Admin User (You)</Text>
                 <Text style={styles.itemSub}>admin@threadmasters.com</Text>
              </View>
              <View style={styles.roleBadge}><Text style={styles.roleText}>Owner</Text></View>
           </View>
           <Divider style={styles.divider} />
           
           <View style={styles.listItem}>
              <Avatar.Text size={40} label="RS" style={{backgroundColor: '#047857', marginRight: 12}} />
              <View style={styles.listText}>
                 <Text style={styles.itemTitle}>Rahul Sharma</Text>
                 <Text style={styles.itemSub}>rahul.s@threadmasters.com</Text>
              </View>
              <View style={[styles.roleBadge, {backgroundColor: '#F1F5F9'}]}><Text style={[styles.roleText, {color: '#475569'}]}>Manager</Text></View>
           </View>
           <Divider style={styles.divider} />
           
           <View style={styles.listItem}>
              <Avatar.Text size={40} label="VK" style={{backgroundColor: '#3B82F6', marginRight: 12}} />
              <View style={styles.listText}>
                 <Text style={styles.itemTitle}>Vikram Kumar</Text>
                 <Text style={styles.itemSub}>vikram.tech@threadmasters.com</Text>
              </View>
              <View style={[styles.roleBadge, {backgroundColor: '#F1F5F9'}]}><Text style={[styles.roleText, {color: '#475569'}]}>Technician</Text></View>
           </View>
           
        </View>

      </ScrollView>

      {/* Invite Modal */}
      <Modal visible={isInviteModalVisible} animationType="slide" transparent={true}>
         <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
               <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Invite Team Member</Text>
                  <IconButton icon="close" size={24} iconColor="#64748B" style={{margin:0}} onPress={() => setInviteModalVisible(false)}/>
               </View>
               
               <ScrollView style={styles.modalBody}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput style={styles.input} placeholder="e.g. Jane Doe" placeholderTextColor="#94A3B8" />

                  <Text style={styles.inputLabel}>Email Address</Text>
                  <TextInput style={styles.input} placeholder="jane@example.com" placeholderTextColor="#94A3B8" keyboardType="email-address" />

                  <Text style={styles.inputLabel}>Role</Text>
                  <View style={styles.pickerContainer}>
                     <Text style={styles.pickerText}>Technician</Text>
                     <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{margin:0}}/>
                  </View>

                  <TouchableOpacity style={styles.submitBtn} onPress={() => setInviteModalVisible(false)}>
                     <Text style={styles.submitBtnText}>Send Invite</Text>
                  </TouchableOpacity>
               </ScrollView>
            </View>
         </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginLeft: 8 },
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  addBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  content: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  listText: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: '600', color: '#0F172A', marginBottom: 2 },
  itemSub: { fontSize: 12, color: '#64748B' },
  divider: { backgroundColor: '#F1F5F9', height: 1, marginLeft: 68 },
  roleBadge: { backgroundColor: '#DBEAFE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  roleText: { color: '#1D4ED8', fontSize: 10, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  modalBody: { padding: 20 },
  inputLabel: { fontSize: 12, fontWeight: '600', color: '#475569', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, height: 44, paddingHorizontal: 12, fontSize: 14, color: '#0F172A', marginBottom: 16 },
  pickerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, height: 44, paddingLeft: 12, paddingRight: 4, marginBottom: 24 },
  pickerText: { fontSize: 14, color: '#0F172A' },
  submitBtn: { backgroundColor: '#1A365D', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  submitBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' }
});

export default TeamManagementScreen;
