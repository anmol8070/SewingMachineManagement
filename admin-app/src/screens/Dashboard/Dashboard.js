import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { IconButton, Avatar, Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <IconButton icon="view-dashboard" size={24} iconColor="#1A365D" style={{ margin: 0 }} />
            <Text style={styles.logoText}>ThreadMasters{"\n"}Pro</Text>
          </View>
          <View style={styles.headerRight}>
            <IconButton icon="bell-outline" size={22} iconColor="#64748B" style={styles.iconButton} />
            <Avatar.Text size={32} label="AA" style={styles.avatar} labelStyle={{ fontSize: 14 }} />
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Admin Dashboard</Text>
          <Text style={styles.systemStatus}>
            System Status: <Text style={{ color: '#10B981' }}>Operational</Text> • Last sync: 2 mins ago
          </Text>
        </View>

        {/* Status Cards */}
        <View style={styles.cardsGrid}>
          {/* Total Products */}
          <View style={styles.statusCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: '#EFF6FF' }]}>
                <IconButton icon="package-variant-closed" size={20} iconColor="#3B82F6" style={{ margin: 0 }} />
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>+12 in last month</Text>
              </View>
            </View>
            <Text style={styles.cardLabel}>Total Products</Text>
            <Text style={styles.cardValue}>124</Text>
          </View>

          {/* Today's Sales */}
          <View style={styles.statusCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: '#ECFDF5' }]}>
                <IconButton icon="currency-inr" size={20} iconColor="#10B981" style={{ margin: 0 }} />
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>8 new orders</Text>
              </View>
            </View>
            <Text style={styles.cardLabel}>Today's Sales</Text>
            <Text style={styles.cardValue}>₹12,450</Text>
          </View>

          {/* Pending Services */}
          <View style={styles.statusCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: '#EFF6FF' }]}>
                <IconButton icon="wrench" size={20} iconColor="#3B82F6" style={{ margin: 0 }} />
              </View>
              <View style={[styles.badge, { backgroundColor: '#DBEAFE' }]}>
                <Text style={[styles.badgeText, { color: '#1D4ED8' }]}>Action Needed</Text>
              </View>
            </View>
            <Text style={styles.cardLabel}>Pending Services</Text>
            <Text style={styles.cardValue}>8</Text>
          </View>

          {/* Low Stock Alert */}
          <View style={[styles.statusCard, { borderColor: '#FECACA', borderWidth: 1 }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrapper, { backgroundColor: '#FEF2F2' }]}>
                <IconButton icon="alert-outline" size={20} iconColor="#EF4444" style={{ margin: 0 }} />
              </View>
              <View style={[styles.badge, { backgroundColor: '#FEE2E2' }]}>
                <Text style={[styles.badgeText, { color: '#B91C1C', fontWeight: 'bold' }]}>CRITICAL</Text>
              </View>
            </View>
            <Text style={styles.cardLabel}>Low Stock Alert</Text>
            <Text style={[styles.cardValue, { color: '#EF4444' }]}>5</Text>
          </View>
        </View>

        {/* Monthly Revenue Chart placeholder */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Monthly{"\n"}Revenue</Text>
            <View style={styles.dropdown}>
               <Text style={styles.dropdownText}>Last 6 Months v</Text>
            </View>
          </View>
          {/* Simple mock chart using chart kit */}
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [{ data: [20, 45, 28, 80, 99, 43] }]
            }}
            width={screenWidth - 60}
            height={180}
            withDots={false}
            withInnerLines={true}
            withOuterLines={false}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "0", strokeWidth: "2", stroke: "#ffa726" }
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16, marginLeft: -20 }}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <Text style={styles.quickActionsDesc}>Manage inventory and billing instantly.</Text>
          
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('GenerateBill')}>
            <IconButton icon="file-document-outline" size={18} iconColor="#1A365D" style={{ margin: 0, marginRight: 5 }} />
            <Text style={styles.primaryButtonText}>Generate Bill</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <IconButton icon="tray-arrow-down" size={18} iconColor="#FFFFFF" style={{ margin: 0, marginRight: 5 }} />
            <Text style={styles.secondaryButtonText}>Receive Stock</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Text style={styles.linkText}>View All</Text>
          </View>

          <View style={styles.listItem}>
            <View style={[styles.listIcon, { backgroundColor: '#CCFBF1' }]}>
               <IconButton icon="tag-outline" size={18} iconColor="#0F766E" style={{ margin: 0 }} />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listItemTitle}>Sale: #ORD-0927</Text>
              <Text style={styles.listItemSub}>Industrial Thread Spool (2) • 12 mins ago</Text>
            </View>
            <Text style={styles.listValue}>₹4,200</Text>
          </View>

          <View style={styles.listItem}>
            <View style={[styles.listIcon, { backgroundColor: '#DBEAFE' }]}>
               <IconButton icon="update" size={18} iconColor="#1D4ED8" style={{ margin: 0 }} />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listItemTitle}>Stock Update</Text>
              <Text style={styles.listItemSub}>Bobbin (10) added to stock • 1 hour ago</Text>
            </View>
            <Text style={[styles.listBadge, { color: '#047857', backgroundColor: '#D1FAE5' }]}>COMPLETED</Text>
          </View>

          <View style={[styles.listItem, { borderBottomWidth: 0 }]}>
            <View style={[styles.listIcon, { backgroundColor: '#FEE2E2' }]}>
               <IconButton icon="alert-circle-outline" size={18} iconColor="#B91C1C" style={{ margin: 0 }} />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listItemTitle}>Low Stock Warning</Text>
              <Text style={styles.listItemSub}>Buttons (Level 8/10) • 2 hours ago</Text>
            </View>
            <Text style={[styles.listBadge, { color: '#B45309', backgroundColor: '#FEF3C7' }]}>CRITICAL</Text>
          </View>
        </View>

        {/* Pending Services */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Pending Services</Text>
          </View>

          <View style={styles.serviceItem}>
             <View style={styles.serviceItemLeft}>
                <View style={[styles.listIcon, { backgroundColor: '#F1F5F9' }]}>
                   <IconButton icon="wrench" size={18} iconColor="#475569" style={{ margin: 0 }} />
                </View>
                <View style={styles.serviceContent}>
                   <Text style={styles.listItemTitle}>Precision</Text>
                   <Text style={styles.listItemTitle}>Overlock 24</Text>
                </View>
             </View>
             <View style={styles.serviceRight}>
                <Text style={styles.estimatedText}>Estimated: ₹ 750</Text>
                <View style={styles.progressBar}><View style={[styles.progressFill, {width: '60%'}]}/></View>
             </View>
          </View>

          <View style={[styles.serviceItem, { borderBottomWidth: 0 }]}>
             <View style={styles.serviceItemLeft}>
                <View style={[styles.listIcon, { backgroundColor: '#F1F5F9' }]}>
                   <IconButton icon="factory" size={18} iconColor="#475569" style={{ margin: 0 }} />
                </View>
                <View style={styles.serviceContent}>
                   <Text style={styles.listItemTitle}>Juki-Looper</Text>
                   <Text style={styles.listItemTitle}>500</Text>
                </View>
             </View>
             <View style={styles.serviceRight}>
                <Text style={styles.estimatedText}>Estimated: ₹ 4,200</Text>
                <View style={styles.progressBar}><View style={[styles.progressFill, {width: '30%'}]}/></View>
             </View>
          </View>
          <TouchableOpacity>
             <Text style={styles.addServiceText}>+ Accept New Problem</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // light grayish blue
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  avatar: {
    backgroundColor: '#DBEAFE',
  },
  titleSection: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  systemStatus: {
    fontSize: 12,
    color: '#64748B',
  },
  cardsGrid: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
  },
  cardLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  quickActionsContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickActionsDesc: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#1E293B',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  listSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  listIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  listItemSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  listValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  listBadge: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  serviceItem: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     paddingVertical: 12,
     borderBottomWidth: 1,
     borderBottomColor: '#F1F5F9',
  },
  serviceItemLeft: {
     flexDirection: 'row',
     alignItems: 'center',
  },
  serviceContent: {
  },
  serviceRight: {
     alignItems: 'flex-end',
     width: 100,
  },
  estimatedText: {
     fontSize: 12,
     color: '#475569',
     marginBottom: 6,
  },
  progressBar: {
     height: 4,
     width: '100%',
     backgroundColor: '#F1F5F9',
     borderRadius: 2,
  },
  progressFill: {
     height: '100%',
     backgroundColor: '#475569',
     borderRadius: 2,
  },
  addServiceText: {
     textAlign: 'center',
     color: '#64748B',
     fontSize: 14,
     fontWeight: '500',
     marginTop: 12,
  }
});

export default Dashboard;
