import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const BillingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor="#1A365D" style={{ margin: 0 }} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Billing & Subscriptions</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.planCard}>
           <View style={styles.planHeader}>
              <Text style={styles.planTitle}>Current Plan</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>PRO</Text></View>
           </View>
           <Text style={styles.planPrice}>₹4,999<Text style={styles.planInterval}> / year</Text></Text>
           <Text style={styles.planDesc}>Your next billing date is October 24, 2027. You have full access to all inventory, service, and warranty management features.</Text>
           <TouchableOpacity style={styles.btnPrimary}><Text style={styles.btnPrimaryText}>Manage Subscription</Text></TouchableOpacity>
        </View>

        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Payment Methods</Text>
           <View style={styles.card}>
              <View style={styles.listItem}>
                 <View style={styles.iconBg}><IconButton icon="credit-card-outline" size={20} iconColor="#1A365D" style={{margin:0}}/></View>
                 <View style={styles.listText}>
                    <Text style={styles.itemTitle}>•••• •••• •••• 4242</Text>
                    <Text style={styles.itemSub}>Expires 12/28 • Primary</Text>
                 </View>
              </View>
              <Divider style={styles.divider} />
              <TouchableOpacity style={styles.listItem}>
                 <View style={[styles.iconBg, {backgroundColor: 'transparent', borderWidth: 1, borderColor: '#CBD5E1', borderStyle: 'dashed'}]}>
                    <IconButton icon="plus" size={20} iconColor="#64748B" style={{margin:0}} onPress={() => {}}/>
                 </View>
                 <View style={styles.listText}>
                    <Text style={[styles.itemTitle, {color: '#3B82F6'}]}>Add Payment Method</Text>
                 </View>
              </TouchableOpacity>
           </View>
        </View>

        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Billing History</Text>
           <View style={styles.card}>
              <View style={styles.listItem}>
                 <View style={styles.listText}>
                    <Text style={styles.itemTitle}>Pro Annual Subscription</Text>
                    <Text style={styles.itemSub}>Oct 24, 2026</Text>
                 </View>
                 <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.itemTitle}>₹4,999</Text>
                    <TouchableOpacity><Text style={styles.downloadText}>Invoice</Text></TouchableOpacity>
                 </View>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.listItem}>
                 <View style={styles.listText}>
                    <Text style={styles.itemTitle}>Pro Annual Subscription</Text>
                    <Text style={styles.itemSub}>Oct 24, 2025</Text>
                 </View>
                 <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.itemTitle}>₹4,999</Text>
                    <TouchableOpacity><Text style={styles.downloadText}>Invoice</Text></TouchableOpacity>
                 </View>
              </View>
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
  planCard: { backgroundColor: '#1E293B', borderRadius: 16, padding: 24, marginBottom: 24 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  planTitle: { fontSize: 14, color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' },
  badge: { backgroundColor: '#3B82F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  planPrice: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginBottom: 12 },
  planInterval: { fontSize: 16, fontWeight: '500', color: '#94A3B8' },
  planDesc: { fontSize: 13, color: '#CBD5E1', lineHeight: 20, marginBottom: 20 },
  btnPrimary: { backgroundColor: '#FFFFFF', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnPrimaryText: { color: '#1E293B', fontSize: 14, fontWeight: '700' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginBottom: 12, marginLeft: 4 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  iconBg: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  listText: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: '600', color: '#0F172A', marginBottom: 2 },
  itemSub: { fontSize: 12, color: '#64748B' },
  divider: { backgroundColor: '#F1F5F9', height: 1, marginLeft: 16, marginRight: 16 },
  downloadText: { fontSize: 12, color: '#3B82F6', fontWeight: '600', marginTop: 4 }
});

export default BillingScreen;
