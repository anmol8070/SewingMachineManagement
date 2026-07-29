import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const GenerateBill = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
           <IconButton icon="arrow-left" size={24} iconColor="#1A365D" style={{ margin: 0, marginRight: 8 }} onPress={() => navigation.goBack()} />
           <IconButton icon="factory" size={24} iconColor="#1A365D" style={{ margin: 0 }} />
           <Text style={styles.logoText}>ThreadMasters Pro</Text>
        </View>
        <View style={styles.headerRight}>
           <IconButton icon="bell-outline" size={20} iconColor="#64748B" style={{ margin: 0 }} />
           <View style={styles.avatar}><Text style={styles.avatarText}>AD</Text></View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Stepper */}
        <View style={styles.stepperContainer}>
           <View style={styles.step}>
              <View style={[styles.stepIcon, styles.stepActive]}><IconButton icon="account" size={16} iconColor="#FFFFFF" style={{margin:0}}/></View>
              <Text style={styles.stepTextActive}>Customer</Text>
           </View>
           <View style={styles.stepLine} />
           <View style={styles.step}>
              <View style={[styles.stepIcon, styles.stepInactive]}><IconButton icon="package-variant" size={16} iconColor="#94A3B8" style={{margin:0}}/></View>
              <Text style={styles.stepTextInactive}>Products</Text>
           </View>
           <View style={styles.stepLine} />
           <View style={styles.step}>
              <View style={[styles.stepIcon, styles.stepInactive]}><IconButton icon="cash" size={16} iconColor="#94A3B8" style={{margin:0}}/></View>
              <Text style={styles.stepTextInactive}>Payment</Text>
           </View>
        </View>

        {/* Customer Details */}
        <View style={styles.sectionCard}>
           <View style={styles.sectionHeader}>
              <IconButton icon="account-circle-outline" size={20} iconColor="#1A365D" style={{margin:0, marginRight: 4}}/>
              <Text style={styles.sectionTitle}>Customer Details</Text>
              <Text style={styles.stepIndicator}>Step 1 of 3</Text>
           </View>
           
           <Text style={styles.inputLabel}>Full Name</Text>
           <TextInput style={styles.input} placeholder="e.g. Rahul Sharma" placeholderTextColor="#94A3B8" />

           <Text style={styles.inputLabel}>Mobile Number</Text>
           <TextInput style={styles.input} placeholder="+91 00000 00000" placeholderTextColor="#94A3B8" keyboardType="phone-pad" />

           <Text style={styles.inputLabel}>Shipping Address (Optional)</Text>
           <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Enter complete address..." 
              placeholderTextColor="#94A3B8"
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
           />
        </View>

        {/* Item Details */}
        <View style={styles.sectionCard}>
           <View style={styles.sectionHeaderBetween}>
              <View style={styles.sectionHeaderLeft}>
                 <IconButton icon="cart-outline" size={20} iconColor="#1A365D" style={{margin:0, marginRight: 4}}/>
                 <Text style={styles.sectionTitle}>Item Details</Text>
              </View>
              <TouchableOpacity><Text style={styles.linkText}>+ Add Row</Text></TouchableOpacity>
           </View>

           <View style={styles.itemBox}>
              <Text style={styles.inputLabel}>Select Machine / Product</Text>
              <View style={styles.pickerContainer}>
                 <Text style={styles.pickerText}>TM-700 Heavy Duty Industrial</Text>
                 <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{margin:0}}/>
              </View>

              <Text style={styles.inputLabel}>Serial Number</Text>
              <TextInput style={styles.input} placeholder="SN-882910" placeholderTextColor="#94A3B8" value="SN-882910" />

              <View style={styles.row}>
                 <View style={styles.colHalf}>
                    <Text style={styles.inputLabel}>Qty</Text>
                    <TextInput style={styles.input} value="1" keyboardType="numeric" />
                 </View>
                 <View style={styles.colHalf}>
                    <Text style={styles.inputLabel}>Unit Price</Text>
                    <TextInput style={styles.input} value="₹ 45,000" />
                 </View>
              </View>

              <View style={styles.productMiniCard}>
                 <Image source={{uri: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=100&q=80'}} style={styles.miniCardImg} />
                 <View style={styles.miniCardContent}>
                    <Text style={styles.miniCardTitle}>TM-700 Industrial Pro</Text>
                    <Text style={styles.miniCardDesc}>Stock Available: 14 units | Warranty: 2 Years</Text>
                 </View>
                 <View style={styles.badgeInStock}><Text style={styles.badgeInStockText}>IN STOCK</Text></View>
              </View>
           </View>
        </View>

        {/* Payment Information */}
        <View style={styles.sectionCard}>
           <View style={styles.sectionHeader}>
              <IconButton icon="wallet-outline" size={20} iconColor="#1A365D" style={{margin:0, marginRight: 4}}/>
              <Text style={styles.sectionTitle}>Payment Information</Text>
           </View>

           <View style={styles.paymentMethods}>
              <TouchableOpacity 
                style={paymentMethod === 'Cash' ? styles.payBtnActive : styles.payBtnInactive} 
                onPress={() => setPaymentMethod('Cash')}
              >
                 <IconButton icon="cash" size={24} iconColor={paymentMethod === 'Cash' ? "#FFFFFF" : "#1A365D"} style={{margin:0}} onPress={() => setPaymentMethod('Cash')}/>
                 <Text style={paymentMethod === 'Cash' ? styles.payBtnTextActive : styles.payBtnTextInactive}>Cash</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={paymentMethod === 'UPI / QR' ? styles.payBtnActive : styles.payBtnInactive} 
                onPress={() => setPaymentMethod('UPI / QR')}
              >
                 <IconButton icon="qrcode" size={24} iconColor={paymentMethod === 'UPI / QR' ? "#FFFFFF" : "#1A365D"} style={{margin:0}} onPress={() => setPaymentMethod('UPI / QR')}/>
                 <Text style={paymentMethod === 'UPI / QR' ? styles.payBtnTextActive : styles.payBtnTextInactive}>UPI / QR</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={paymentMethod === 'Card' ? styles.payBtnActive : styles.payBtnInactive} 
                onPress={() => setPaymentMethod('Card')}
              >
                 <IconButton icon="credit-card-outline" size={24} iconColor={paymentMethod === 'Card' ? "#FFFFFF" : "#1A365D"} style={{margin:0}} onPress={() => setPaymentMethod('Card')}/>
                 <Text style={paymentMethod === 'Card' ? styles.payBtnTextActive : styles.payBtnTextInactive}>Card</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={paymentMethod === 'Transfer' ? styles.payBtnActive : styles.payBtnInactive} 
                onPress={() => setPaymentMethod('Transfer')}
              >
                 <IconButton icon="bank-outline" size={24} iconColor={paymentMethod === 'Transfer' ? "#FFFFFF" : "#1A365D"} style={{margin:0}} onPress={() => setPaymentMethod('Transfer')}/>
                 <Text style={paymentMethod === 'Transfer' ? styles.payBtnTextActive : styles.payBtnTextInactive}>Transfer</Text>
              </TouchableOpacity>
           </View>

           <Text style={styles.inputLabel}>Reference No. (Transaction ID)</Text>
           <TextInput style={styles.input} placeholder="Enter ID if applicable" placeholderTextColor="#94A3B8" />

           <Text style={styles.inputLabel}>Payment Status</Text>
           <View style={styles.pickerContainer}>
              <Text style={styles.pickerText}>Fully Paid</Text>
              <IconButton icon="chevron-down" size={20} iconColor="#64748B" style={{margin:0}}/>
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
           
           <View style={styles.summaryTotalRow}>
              <Text style={styles.summaryTotalLabel}>TOTAL AMOUNT</Text>
              <Text style={styles.summaryTotalValue}>₹ 53,600</Text>
           </View>

           <View style={styles.warrantyBadge}>
              <Text style={styles.warrantyBadgeLabel}>WARRANTY PERIOD</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <IconButton icon="shield-check-outline" size={14} iconColor="#94A3B8" style={{margin:0, marginRight: 4, width:14, height:14}}/>
                 <Text style={styles.warrantyBadgeText}>Valid until 24 Oct 2026</Text>
              </View>
           </View>
        </View>

        <View style={styles.infoNote}>
           <IconButton icon="information-outline" size={16} iconColor="#475569" style={{margin:0, marginRight: 8, alignSelf: 'flex-start'}}/>
           <Text style={styles.infoNoteText}>
              Generating this bill will automatically update inventory stock and create a digital warranty certificate for the customer.
           </Text>
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
         <TouchableOpacity style={styles.btnDraft}>
            <IconButton icon="content-save-outline" size={18} iconColor="#475569" style={{margin:0, marginRight: 4}}/>
            <Text style={styles.btnDraftText}>Save as Draft</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.btnSubmit}>
            <IconButton icon="file-document-outline" size={18} iconColor="#FFFFFF" style={{margin:0, marginRight: 4}}/>
            <Text style={styles.btnSubmitText}>Generate Bill & Warranty</Text>
         </TouchableOpacity>
      </View>
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
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A365D',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1A365D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  step: {
    alignItems: 'center',
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepActive: {
    backgroundColor: '#1A365D',
  },
  stepInactive: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stepTextActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A365D',
  },
  stepTextInactive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
    marginTop: -16,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A365D',
  },
  stepIndicator: {
    marginLeft: 'auto',
    fontSize: 11,
    color: '#64748B',
  },
  linkText: {
    fontSize: 12,
    color: '#1A365D',
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 13,
    color: '#0F172A',
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    paddingTop: 10,
  },
  itemBox: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pickerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerText: {
    fontSize: 13,
    color: '#0F172A',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  colHalf: {
    flex: 1,
  },
  productMiniCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  miniCardImg: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  miniCardContent: {
    flex: 1,
  },
  miniCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  miniCardDesc: {
    fontSize: 10,
    color: '#64748B',
  },
  badgeInStock: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeInStockText: {
    color: '#047857',
    fontSize: 9,
    fontWeight: '800',
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  payBtnActive: {
    width: '48%',
    backgroundColor: '#1A365D',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  payBtnTextActive: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  payBtnInactive: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  payBtnTextInactive: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
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
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#94A3B8',
  },
  summaryValue: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  summaryTotalLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  summaryTotalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  warrantyBadge: {
    backgroundColor: '#1E293B',
    borderRadius: 6,
    padding: 10,
    marginTop: 16,
  },
  warrantyBadgeLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '700',
    marginBottom: 4,
  },
  warrantyBadgeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  infoNote: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoNoteText: {
    flex: 1,
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  btnDraft: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  btnDraftText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },
  btnSubmit: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  btnSubmitText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  }
});

export default GenerateBill;
