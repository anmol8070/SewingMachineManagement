import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const GenerateBill = () => {
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <IconButton icon="view-dashboard" size={24} iconColor="#1A365D" style={{ margin: 0 }} />
          <Text style={styles.logoText}>ThreadMasters{"\n"}Pro</Text>
        </View>
        <View style={styles.headerRight}>
          <IconButton icon="bell-outline" size={22} iconColor="#64748B" style={styles.iconButton} />
          <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatarImage} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Stepper */}
        <View style={styles.stepperContainer}>
          <View style={styles.step}>
            <View style={[styles.stepIcon, styles.stepIconActive]}>
              <IconButton icon="account-outline" size={16} iconColor="#FFFFFF" style={{ margin: 0 }} />
            </View>
            <Text style={styles.stepTextActive}>Customer</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <IconButton icon="package-variant-closed" size={16} iconColor="#94A3B8" style={{ margin: 0 }} />
            </View>
            <Text style={styles.stepText}>Products</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <IconButton icon="credit-card-outline" size={16} iconColor="#94A3B8" style={{ margin: 0 }} />
            </View>
            <Text style={styles.stepText}>Payment</Text>
          </View>
        </View>

        {/* Customer Details */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <IconButton icon="account-circle-outline" size={20} iconColor="#1A365D" style={{ margin: 0, marginRight: 8 }} />
              <Text style={styles.sectionTitle}>Customer Details</Text>
            </View>
            <Text style={styles.stepCounter}>Step 1 of 3</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput style={styles.input} placeholder="e.g. Rahul Sharma" placeholderTextColor="#94A3B8" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <TextInput style={styles.input} placeholder="+91 98989 89898" placeholderTextColor="#94A3B8" keyboardType="phone-pad" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Shipping Address (Optional)</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="Enter complete address..." placeholderTextColor="#94A3B8" multiline numberOfLines={3} />
          </View>
        </View>

        {/* Item Details */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <IconButton icon="cart-outline" size={20} iconColor="#1A365D" style={{ margin: 0, marginRight: 8 }} />
              <Text style={styles.sectionTitle}>Item Details</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.addBtnText}>+ ADD ITEM</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Select Machine / Product</Text>
              <View style={styles.dropdownInput}>
                <Text style={styles.dropdownText}>TM-700 Heavy Duty Industrial</Text>
                <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{ margin: 0 }} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Serial Number</Text>
              <TextInput style={styles.input} value="SM-8923IND" placeholderTextColor="#94A3B8" />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Qty</Text>
                <TextInput style={styles.input} value="1" keyboardType="numeric" />
              </View>
              <View style={[styles.inputGroup, { flex: 2 }]}>
                <Text style={styles.inputLabel}>Unit Price</Text>
                <TextInput style={styles.input} value="₹ 45,000" />
              </View>
            </View>

            {/* Selected Product Card */}
            <View style={styles.selectedProductCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=100' }} style={styles.selectedImg} />
              <View style={styles.selectedInfo}>
                <Text style={styles.selectedTitle}>TM-700 Industrial Pro</Text>
                <Text style={styles.selectedSub}>Stock Available: 12 units • Warranty: 2 Years</Text>
              </View>
              <View style={styles.badgeGreen}>
                <Text style={styles.badgeTextGreen}>IN STOCK</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <IconButton icon="credit-card-outline" size={20} iconColor="#1A365D" style={{ margin: 0, marginRight: 8 }} />
              <Text style={styles.sectionTitle}>Payment Information</Text>
            </View>
          </View>

          <View style={styles.paymentMethods}>
            <TouchableOpacity 
              style={[styles.paymentMethod, paymentMethod === 'Cash' && styles.paymentMethodActive]}
              onPress={() => setPaymentMethod('Cash')}
            >
              <IconButton icon="cash" size={24} iconColor={paymentMethod === 'Cash' ? "#FFFFFF" : "#64748B"} style={{ margin: 0 }} />
              <Text style={[styles.paymentText, paymentMethod === 'Cash' && styles.paymentTextActive]}>Cash</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.paymentMethod, paymentMethod === 'UPI' && styles.paymentMethodActive]}
              onPress={() => setPaymentMethod('UPI')}
            >
              <IconButton icon="qrcode-scan" size={24} iconColor={paymentMethod === 'UPI' ? "#FFFFFF" : "#64748B"} style={{ margin: 0 }} />
              <Text style={[styles.paymentText, paymentMethod === 'UPI' && styles.paymentTextActive]}>UPI / QR</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.paymentMethod, paymentMethod === 'Card' && styles.paymentMethodActive]}
              onPress={() => setPaymentMethod('Card')}
            >
              <IconButton icon="credit-card" size={24} iconColor={paymentMethod === 'Card' ? "#FFFFFF" : "#64748B"} style={{ margin: 0 }} />
              <Text style={[styles.paymentText, paymentMethod === 'Card' && styles.paymentTextActive]}>Card</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.paymentMethod, paymentMethod === 'Transfer' && styles.paymentMethodActive]}
              onPress={() => setPaymentMethod('Transfer')}
            >
              <IconButton icon="bank" size={24} iconColor={paymentMethod === 'Transfer' ? "#FFFFFF" : "#64748B"} style={{ margin: 0 }} />
              <Text style={[styles.paymentText, paymentMethod === 'Transfer' && styles.paymentTextActive]}>Transfer</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Reference No. (Transaction ID)</Text>
            <TextInput style={styles.input} placeholder="Enter TXN / UPI ID" placeholderTextColor="#94A3B8" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Payment Status</Text>
            <View style={styles.dropdownInput}>
              <Text style={styles.dropdownText}>Fully Paid</Text>
              <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{ margin: 0 }} />
            </View>
          </View>
        </View>

        {/* Bill Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Bill Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹ 45,000.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST (18%)</Text>
            <Text style={styles.summaryValue}>₹ 8,100.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>₹ 500.00</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.totalValue}>₹ 53,600</Text>
          </View>

          <View style={styles.warrantyBox}>
            <Text style={styles.warrantyBoxLabel}>WARRANTY PERIOD</Text>
            <Text style={styles.warrantyBoxValue}>🛡 Valid until 24 Oct 2025</Text>
          </View>
        </View>

        {/* Info Note */}
        <View style={styles.infoNote}>
          <IconButton icon="information-outline" size={20} iconColor="#64748B" style={{ margin: 0, marginRight: 8, marginTop: 2 }} />
          <Text style={styles.infoText}>
            Generating this bill will automatically update inventory stock and create a Digital Warranty Certificate for the customer.
          </Text>
        </View>

        {/* Footer Buttons */}
        <TouchableOpacity style={styles.draftBtn}>
          <IconButton icon="content-save-outline" size={18} iconColor="#1A365D" style={{ margin: 0, marginRight: 4 }} />
          <Text style={styles.draftBtnText}>Save as Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.generateBtn}>
          <IconButton icon="file-document-outline" size={18} iconColor="#FFFFFF" style={{ margin: 0, marginRight: 4 }} />
          <Text style={styles.generateBtnText}>Generate Bill & Warranty</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A365D',
    lineHeight: 18,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#F1F5F9',
    marginRight: 10,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  step: {
    alignItems: 'center',
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepIconActive: {
    backgroundColor: '#1A365D',
  },
  stepText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  stepTextActive: {
    fontSize: 11,
    color: '#1A365D',
    fontWeight: '700',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A365D',
  },
  stepCounter: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  addBtnText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: '#0F172A',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingLeft: 12,
    height: 44,
  },
  dropdownText: {
    fontSize: 14,
    color: '#0F172A',
  },
  rowInputs: {
    flexDirection: 'row',
  },
  itemForm: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
  },
  selectedProductCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  selectedImg: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  selectedSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  badgeGreen: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeTextGreen: {
    fontSize: 9,
    fontWeight: '700',
    color: '#047857',
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  paymentMethod: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentMethodActive: {
    backgroundColor: '#1A365D',
    borderColor: '#1A365D',
  },
  paymentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 8,
  },
  paymentTextActive: {
    color: '#FFFFFF',
  },
  summaryCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#94A3B8',
  },
  summaryValue: {
    fontSize: 13,
    color: '#F8FAFC',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  warrantyBox: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  warrantyBoxLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 4,
    fontWeight: '600',
  },
  warrantyBoxValue: {
    fontSize: 13,
    color: '#E2E8F0',
    fontWeight: '600',
  },
  infoNote: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  draftBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1A365D',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
  },
  draftBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A365D',
  },
  generateBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
  },
  generateBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default GenerateBill;
