import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const WarrantyDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor="#1A365D" style={{ margin: 0 }} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Warranty Status</Text>
        <View style={{flex: 1}} />
        <View style={styles.statusBadge}>
           <Text style={styles.statusText}>ACTIVE</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.card}>
           <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                 <IconButton icon="factory" size={24} iconColor="#1D4ED8" style={{margin:0}}/>
              </View>
              <View style={styles.cardHeaderText}>
                 <Text style={styles.machineName}>TM-700 Industrial Pro</Text>
                 <Text style={styles.serialNumber}>S/N: TM-PRO-99283-X</Text>
              </View>
           </View>
           <Divider style={styles.divider} />
           
           <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Purchase Date</Text>
              <Text style={styles.detailValue}>Jan 15, 2025</Text>
           </View>
           <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expiration Date</Text>
              <Text style={[styles.detailValue, {color: '#047857', fontWeight: '700'}]}>Jan 15, 2028 (3 Years)</Text>
           </View>
           <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Coverage Type</Text>
              <Text style={styles.detailValue}>Comprehensive Extended</Text>
           </View>
        </View>

        <Text style={styles.sectionTitle}>Covered Components</Text>
        <View style={styles.card}>
           <View style={styles.listItem}>
              <IconButton icon="check-circle" size={20} iconColor="#047857" style={{margin:0}}/>
              <Text style={styles.listItemText}>Main Drive Motor (10 Years)</Text>
           </View>
           <Divider style={styles.divider} />
           <View style={styles.listItem}>
              <IconButton icon="check-circle" size={20} iconColor="#047857" style={{margin:0}}/>
              <Text style={styles.listItemText}>Logic Board / Electronics</Text>
           </View>
           <Divider style={styles.divider} />
           <View style={styles.listItem}>
              <IconButton icon="check-circle" size={20} iconColor="#047857" style={{margin:0}}/>
              <Text style={styles.listItemText}>Mechanical Linkages</Text>
           </View>
           <Divider style={styles.divider} />
           <View style={styles.listItem}>
              <IconButton icon="close-circle" size={20} iconColor="#EF4444" style={{margin:0}}/>
              <Text style={[styles.listItemText, {color: '#64748B'}]}>Needles & Consumables (Not Covered)</Text>
           </View>
        </View>

        <TouchableOpacity style={styles.btnPrimary}>
           <IconButton icon="file-download-outline" size={20} iconColor="#FFFFFF" style={{margin:0, marginRight: 8}}/>
           <Text style={styles.btnPrimaryText}>Download Certificate</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginLeft: 8 },
  statusBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: '#047857', fontSize: 10, fontWeight: '800' },
  content: { padding: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 16, marginBottom: 24 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#DBEAFE', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  cardHeaderText: { flex: 1 },
  machineName: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  serialNumber: { fontSize: 13, color: '#64748B', fontFamily: 'monospace' },
  divider: { backgroundColor: '#F1F5F9', height: 1, marginVertical: 12 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailLabel: { fontSize: 13, color: '#64748B' },
  detailValue: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#475569', marginBottom: 12, textTransform: 'uppercase' },
  listItem: { flexDirection: 'row', alignItems: 'center' },
  listItemText: { fontSize: 14, color: '#0F172A', marginLeft: 12, fontWeight: '500' },
  btnPrimary: { flexDirection: 'row', backgroundColor: '#1A365D', paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  btnPrimaryText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});

export default WarrantyDetailsScreen;
