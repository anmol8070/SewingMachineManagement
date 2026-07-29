import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactSupportScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor="#1A365D" style={{ margin: 0 }} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Contact Support</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.contactRow}>
           <View style={styles.contactBox}>
              <IconButton icon="phone" size={24} iconColor="#1A365D" style={{margin: 0}} />
              <Text style={styles.contactTitle}>Call Us</Text>
              <Text style={styles.contactDetail} numberOfLines={1} adjustsFontSizeToFit>+91 99999 88888</Text>
           </View>
           <View style={styles.contactBox}>
              <IconButton icon="email" size={24} iconColor="#1A365D" style={{margin: 0}} />
              <Text style={styles.contactTitle}>Email Us</Text>
              <Text style={styles.contactDetail} numberOfLines={1} adjustsFontSizeToFit>support@threadmasters.com</Text>
           </View>
        </View>

        <Text style={styles.sectionTitle}>Send us a message</Text>
        
        <View style={styles.form}>
           <Text style={styles.inputLabel}>Subject</Text>
           <TextInput style={styles.input} placeholder="How can we help?" placeholderTextColor="#94A3B8" />

           <Text style={styles.inputLabel}>Message</Text>
           <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Describe your issue in detail..." 
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
           />

           <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Send Message</Text>
           </TouchableOpacity>
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
  contactRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  contactBox: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  contactTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginTop: 4, marginBottom: 4 },
  contactDetail: { fontSize: 11, color: '#64748B', textAlign: 'center', width: '100%' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  form: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  inputLabel: { fontSize: 12, fontWeight: '600', color: '#475569', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 12, height: 44, fontSize: 14, color: '#0F172A', marginBottom: 16 },
  textArea: { height: 100, paddingTop: 12 },
  submitBtn: { backgroundColor: '#1A365D', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  submitBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' }
});

export default ContactSupportScreen;
