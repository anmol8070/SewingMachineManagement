import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpCenterScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor="#1A365D" style={{ margin: 0 }} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Help Center</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.searchBox}>
           <IconButton icon="magnify" size={20} iconColor="#64748B" style={{margin:0}}/>
           <TextInput style={styles.searchInput} placeholder="Search for help..." placeholderTextColor="#94A3B8" />
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        <View style={styles.card}>
           <View style={styles.faqItem}>
              <Text style={styles.faqQ}>How do I generate a warranty certificate?</Text>
              <Text style={styles.faqA}>Warranty certificates are automatically generated when you create a bill with a serial number. You can view them in the Warranty tab.</Text>
           </View>
           <Divider style={styles.divider} />
           <View style={styles.faqItem}>
              <Text style={styles.faqQ}>How to track a service request?</Text>
              <Text style={styles.faqA}>Go to the Service tab, find the repair ticket, and update its status from 'Received' to 'Ready' or 'Delivered'.</Text>
           </View>
           <Divider style={styles.divider} />
           <View style={styles.faqItem}>
              <Text style={styles.faqQ}>Can I add multiple users?</Text>
              <Text style={styles.faqA}>Yes, go to Settings > Team Management to invite new staff members and assign roles.</Text>
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
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 8, height: 44, marginBottom: 24 },
  searchInput: { flex: 1, color: '#0F172A', fontSize: 14, marginLeft: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginBottom: 12, marginLeft: 4 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  faqItem: { padding: 16 },
  faqQ: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  faqA: { fontSize: 13, color: '#64748B', lineHeight: 20 },
  divider: { backgroundColor: '#F1F5F9', height: 1 }
});

export default HelpCenterScreen;
