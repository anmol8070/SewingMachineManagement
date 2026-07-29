import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const WarrantyList = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <IconButton icon="factory" size={24} iconColor="#1A365D" style={{ margin: 0 }} />
          <Text style={styles.logoText}>ThreadMasters Pro</Text>
        </View>
        <IconButton icon="menu" size={24} iconColor="#1A365D" style={{ margin: 0 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Verify Your Machine{"\n"}Warranty</Text>
          <Text style={styles.pageDesc}>
            Enter your serial number or scan the QR code located on your industrial unit to verify current coverage status.
          </Text>
        </View>

        {/* Input Form */}
        <View style={styles.formCard}>
           <Text style={styles.inputLabel}>Warranty / Invoice / Serial Number</Text>
           <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="e.g. TM-PRO-99283-X" placeholderTextColor="#94A3B8" />
              <IconButton icon="qrcode-scan" size={20} iconColor="#1A365D" style={{margin:0}}/>
           </View>
           
           <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('WarrantyDetails')}>
              <Text style={styles.btnPrimaryText}>Verify Warranty</Text>
              <IconButton icon="check-decagram-outline" size={16} iconColor="#FFFFFF" style={{margin:0, marginLeft: 6}}/>
           </TouchableOpacity>

           <TouchableOpacity style={styles.btnSecondary}>
              <IconButton icon="qrcode" size={16} iconColor="#1A365D" style={{margin:0, marginRight: 6}}/>
              <Text style={styles.btnSecondaryText}>Scan QR Code</Text>
           </TouchableOpacity>
        </View>

        {/* Empty State Image & Text */}
        <View style={styles.emptyState}>
           <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' }} 
              style={styles.emptyImage}
           />
           <Text style={styles.emptyTitle}>No records searched yet</Text>
           <Text style={styles.emptyDesc}>
              Results will appear here after you enter a valid machine serial number or scan its identity code.
           </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF', // matches the light blue background in screenshot
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A365D',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 12,
  },
  pageDesc: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  formCard: {
    backgroundColor: '#F8FAFC', // light card color
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  inputLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  btnPrimary: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 12,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  btnSecondary: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  btnSecondaryText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyImage: {
    width: 250,
    height: 140,
    resizeMode: 'contain',
    opacity: 0.8,
    marginBottom: 20,
    borderRadius: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  }
});

export default WarrantyList;
