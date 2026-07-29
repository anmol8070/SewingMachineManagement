import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ServiceList = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <IconButton icon="factory" size={24} iconColor="#1A365D" style={{ margin: 0 }} />
          <Text style={styles.logoText}>ThreadMasters Pro</Text>
        </View>
        <IconButton icon="magnify" size={24} iconColor="#64748B" style={{ margin: 0 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Service & Repairs</Text>
          <Text style={styles.pageDesc}>
            Production facility maintenance and machine diagnostics system.
          </Text>
          <TouchableOpacity style={styles.btnNewTicket}>
             <IconButton icon="plus" size={16} iconColor="#FFFFFF" style={{ margin: 0, marginRight: 4 }} />
             <Text style={styles.btnNewTicketText}>New Service Ticket</Text>
          </TouchableOpacity>
        </View>

        {/* Status Cards */}
        <View style={styles.statsGrid}>
           <View style={styles.statCard}>
              <View style={styles.statCardHeader}>
                 <View style={[styles.statIconBg, {backgroundColor: '#EFF6FF'}]}><IconButton icon="monitor" size={16} iconColor="#3B82F6" style={{margin:0}}/></View>
                 <Text style={styles.statLabel}>Received</Text>
              </View>
              <Text style={styles.statValue}>08</Text>
           </View>

           <View style={styles.statCard}>
              <View style={styles.statCardHeader}>
                 <View style={[styles.statIconBg, {backgroundColor: '#FFF7ED'}]}><IconButton icon="wrench-outline" size={16} iconColor="#F97316" style={{margin:0}}/></View>
                 <Text style={styles.statLabel}>Repairing</Text>
              </View>
              <Text style={styles.statValue}>24</Text>
           </View>

           <View style={styles.statCard}>
              <View style={styles.statCardHeader}>
                 <View style={[styles.statIconBg, {backgroundColor: '#ECFDF5'}]}><IconButton icon="check-decagram-outline" size={16} iconColor="#10B981" style={{margin:0}}/></View>
                 <Text style={styles.statLabel}>Ready</Text>
              </View>
              <Text style={styles.statValue}>12</Text>
           </View>

           <View style={styles.statCard}>
              <View style={styles.statCardHeader}>
                 <View style={[styles.statIconBg, {backgroundColor: '#F1F5F9'}]}><IconButton icon="truck-outline" size={16} iconColor="#475569" style={{margin:0}}/></View>
                 <Text style={styles.statLabel}>Delivered</Text>
              </View>
              <Text style={styles.statValue}>142</Text>
           </View>
        </View>

        {/* Tabs & Search */}
        <View style={styles.controlsSection}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={{gap: 8}}>
              <TouchableOpacity style={styles.tabActive}><Text style={styles.tabTextActive}>Active Jobs</Text></TouchableOpacity>
              <TouchableOpacity style={styles.tabInactive}><Text style={styles.tabTextInactive}>Received</Text></TouchableOpacity>
              <TouchableOpacity style={styles.tabInactive}><Text style={styles.tabTextInactive}>Under Repair</Text></TouchableOpacity>
           </ScrollView>
           
           <View style={styles.searchRow}>
              <View style={styles.searchInputContainer}>
                 <IconButton icon="magnify" size={18} iconColor="#94A3B8" style={{margin:0, marginLeft: 4}}/>
                 <TextInput style={styles.searchInput} placeholder="Search orders..." placeholderTextColor="#94A3B8" />
              </View>
              <TouchableOpacity style={styles.filterBtn}>
                 <IconButton icon="filter-variant" size={20} iconColor="#64748B" style={{margin:0}}/>
              </TouchableOpacity>
           </View>
        </View>

        {/* Ticket List */}
        <View style={styles.ticketList}>
           
           {/* Ticket 1: Under Repair */}
           <View style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                 <View style={styles.ticketHeaderLeft}>
                    <Avatar.Image size={36} source={{uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}} />
                    <View style={styles.ticketHeaderInfo}>
                       <Text style={styles.customerName}>Robert Chen</Text>
                       <Text style={styles.machineInfo}>#SRV-9921  •  Brother S-7300A</Text>
                    </View>
                 </View>
                 <View style={styles.ticketHeaderRight}>
                    <IconButton icon="phone-outline" size={18} iconColor="#3B82F6" style={{margin: 0, padding: 0}} />
                    <View style={[styles.statusBadge, {backgroundColor: '#FEF3C7'}]}><Text style={[styles.statusText, {color: '#B45309'}]}>Under Repair</Text></View>
                 </View>
              </View>

              <View style={[styles.ticketBodyBox, {backgroundColor: '#EFF6FF'}]}>
                 <Text style={styles.ticketBodyText}>
                    Needle bar timing misalignment causing skipped stitches on heavy fabrics. Drive belt inspection required.
                 </Text>
              </View>

              <View style={styles.ticketMetaRow}>
                 <View style={styles.ticketMetaCol}>
                    <Text style={styles.metaLabel}>TECHNICIAN</Text>
                    <Text style={styles.metaValue}>M. Santos</Text>
                 </View>
                 <View style={styles.ticketMetaCol}>
                    <Text style={styles.metaLabel}>EST. COMPLETION</Text>
                    <Text style={styles.metaValue}>Oct 24, 2023</Text>
                 </View>
              </View>

              <View style={styles.ticketFooter}>
                 <TouchableOpacity style={styles.btnSecondary}><Text style={styles.btnSecondaryText}>History Logs</Text></TouchableOpacity>
                 <TouchableOpacity style={styles.btnPrimary}><Text style={styles.btnPrimaryText}>Update Repair Status</Text></TouchableOpacity>
              </View>
           </View>

           {/* Ticket 2: Ready */}
           <View style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                 <View style={styles.ticketHeaderLeft}>
                    <Avatar.Image size={36} source={{uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'}} />
                    <View style={styles.ticketHeaderInfo}>
                       <Text style={styles.customerName}>Elena Rodriguez</Text>
                       <Text style={styles.machineInfo}>#SRV-8842  •  Tajima TMEZ-SC</Text>
                    </View>
                 </View>
                 <View style={styles.ticketHeaderRight}>
                    <IconButton icon="phone-outline" size={18} iconColor="#3B82F6" style={{margin: 0, padding: 0}} />
                    <View style={[styles.statusBadge, {backgroundColor: '#D1FAE5'}]}><Text style={[styles.statusText, {color: '#047857'}]}>Ready</Text></View>
                 </View>
              </View>

              <View style={[styles.ticketBodyBox, {backgroundColor: '#F0FDF4', borderColor: '#DCFCE7', borderWidth: 1}]}>
                 <Text style={[styles.metaLabel, {marginBottom: 4, color: '#047857'}]}>SERVICE SUMMARY</Text>
                 <Text style={styles.ticketBodyText}>
                    Full calibration completed. Thread tension sensors replaced. High-speed testing passed without error.
                 </Text>
              </View>

              <View style={styles.ticketMetaRow}>
                 <View style={styles.ticketMetaCol}>
                    <Text style={styles.metaLabel}>INVOICE AMOUNT</Text>
                    <Text style={styles.metaValue}>$412.50</Text>
                 </View>
                 <View style={styles.ticketMetaCol}>
                    <Text style={styles.metaLabel}>READY DATE</Text>
                    <Text style={styles.metaValue}>Oct 20, 2023</Text>
                 </View>
              </View>

              <View style={styles.ticketFooter}>
                 <TouchableOpacity style={styles.btnSecondary}><Text style={styles.btnSecondaryText}>Invoice PDF</Text></TouchableOpacity>
                 <TouchableOpacity style={[styles.btnPrimary, {backgroundColor: '#10B981'}]}><IconButton icon="send-outline" size={14} iconColor="#FFFFFF" style={{margin:0, marginRight: 4}}/><Text style={styles.btnPrimaryText}>Notify Customer</Text></TouchableOpacity>
              </View>
           </View>

           {/* Ticket 3: Received (Urgent) */}
           <View style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                 <View style={styles.ticketHeaderLeft}>
                    <Avatar.Icon size={36} icon="domain" style={{backgroundColor: '#E2E8F0'}} />
                    <View style={styles.ticketHeaderInfo}>
                       <Text style={styles.customerName}>Northside Textiles</Text>
                       <Text style={styles.machineInfo}>#SRV-9118  •  Juki MO-6700DA</Text>
                    </View>
                 </View>
                 <View style={styles.ticketHeaderRight}>
                    <IconButton icon="phone-outline" size={18} iconColor="#3B82F6" style={{margin: 0, padding: 0}} />
                    <View style={[styles.statusBadge, {backgroundColor: '#DBEAFE'}]}><Text style={[styles.statusText, {color: '#1D4ED8'}]}>Received</Text></View>
                 </View>
              </View>

              <View style={[styles.ticketBodyBox, {backgroundColor: '#F8FAFC'}]}>
                 <Text style={[styles.metaLabel, {marginBottom: 4}]}>REPORTED ISSUE:</Text>
                 <Text style={styles.ticketBodyText}>
                    Grinding noise in internal drive gear during high-speed operation. Requesting full internal cleaning and lubrication.
                 </Text>
              </View>

              <View style={styles.ticketMetaRow}>
                 <View style={styles.ticketMetaCol}>
                    <Text style={styles.metaLabel}>TECHNICIAN</Text>
                    <Text style={[styles.metaValue, {color: '#64748B', fontStyle: 'italic'}]}>Not Assigned</Text>
                 </View>
                 <View style={styles.ticketMetaCol}>
                    <Text style={styles.metaLabel}>PRIORITY</Text>
                    <Text style={[styles.metaValue, {color: '#EA580C', fontWeight: '700'}]}>Urgent (Express)</Text>
                 </View>
              </View>

              <View style={styles.ticketFooter}>
                 <TouchableOpacity style={styles.btnSecondary}><Text style={styles.btnSecondaryText}>Edit Intake</Text></TouchableOpacity>
                 <TouchableOpacity style={styles.btnPrimary}><Text style={styles.btnPrimaryText}>Assign Technician</Text></TouchableOpacity>
              </View>
           </View>

           {/* Ticket 4: Delivered */}
           <View style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                 <View style={styles.ticketHeaderLeft}>
                    <Avatar.Image size={36} source={{uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'}} />
                    <View style={styles.ticketHeaderInfo}>
                       <Text style={styles.customerName}>Sarah Williams</Text>
                       <Text style={styles.machineInfo}>#SRV-9087  •  Naomoto HYS-520</Text>
                    </View>
                 </View>
                 <View style={styles.ticketHeaderRight}>
                    <IconButton icon="phone-outline" size={18} iconColor="#3B82F6" style={{margin: 0, padding: 0}} />
                    <View style={[styles.statusBadge, {backgroundColor: '#F1F5F9'}]}><Text style={[styles.statusText, {color: '#475569'}]}>Delivered</Text></View>
                 </View>
              </View>

              <View style={[styles.ticketBodyBox, {backgroundColor: '#F8FAFC'}]}>
                 <Text style={[styles.metaLabel, {marginBottom: 4}]}>FINAL OUTCOME</Text>
                 <Text style={styles.ticketBodyText}>
                    Heating element replaced and steam valve sealed. Machine picked up by customer on Oct 28.
                 </Text>
              </View>

              <View style={styles.ticketMetaRow}>
                 <View style={styles.ticketMetaCol}>
                    <Text style={styles.metaLabel}>REFERENCE</Text>
                    <Text style={styles.metaValue}>Archive #A230</Text>
                 </View>
                 <View style={styles.ticketMetaCol}>
                    <Text style={styles.metaLabel}>COLLECTED ON</Text>
                    <Text style={styles.metaValue}>Oct 28, 2023</Text>
                 </View>
              </View>

              <View style={styles.ticketFooter}>
                 <TouchableOpacity style={styles.btnSecondary}><Text style={styles.btnSecondaryText}>View Archive</Text></TouchableOpacity>
                 <TouchableOpacity style={[styles.btnPrimary, {backgroundColor: '#E2E8F0'}]} disabled><Text style={[styles.btnPrimaryText, {color: '#94A3B8'}]}>Job Finalized</Text></TouchableOpacity>
              </View>
           </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
    paddingBottom: 20,
  },
  headerSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  pageDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  btnNewTicket: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  btnNewTicketText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  controlsSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tabsScroll: {
    marginBottom: 16,
  },
  tabActive: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  tabInactive: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabTextInactive: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    marginRight: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    color: '#0F172A',
  },
  filterBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 12,
  },
  ticketHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ticketHeaderInfo: {
    marginLeft: 12,
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  machineInfo: {
    fontSize: 12,
    color: '#64748B',
  },
  ticketHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ticketBodyBox: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  ticketBodyText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  ticketMetaRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  ticketMetaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  ticketFooter: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  btnSecondaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
  },
  btnPrimaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ServiceList;
