import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { IconButton, Avatar, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductList = () => {
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
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Inventory Management</Text>
          <Text style={styles.pageSubtitle}>
            Monitor and manage sewing machine stock levels across all branches.
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <IconButton icon="magnify" size={20} iconColor="#94A3B8" style={{ margin: 0 }} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search by model, brand or serial..."
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#F1F5F9' }]}>
              <IconButton icon="domain" size={16} iconColor="#475569" style={{ margin: 0 }} />
            </View>
            <View>
              <Text style={styles.statLabel}>Total Units</Text>
              <Text style={styles.statValue}>1,394</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#ECFDF5' }]}>
              <IconButton icon="package-check" size={16} iconColor="#10B981" style={{ margin: 0 }} />
            </View>
            <View>
              <Text style={styles.statLabel}>In Stock</Text>
              <Text style={styles.statValue}>1,121</Text>
            </View>
          </View>

          <View style={[styles.statCard, styles.statCardAlert]}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#FEF2F2' }]}>
              <IconButton icon="alert-outline" size={16} iconColor="#EF4444" style={{ margin: 0 }} />
            </View>
            <View>
              <Text style={styles.statLabel}>Low Stock</Text>
              <Text style={[styles.statValue, { color: '#EF4444' }]}>42</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#F1F5F9' }]}>
              <IconButton icon="chart-line-variant" size={16} iconColor="#475569" style={{ margin: 0 }} />
            </View>
            <View>
              <Text style={styles.statLabel}>Sales (30d)</Text>
              <Text style={styles.statValue}>+ 12%</Text>
            </View>
          </View>
        </View>

        {/* Product List */}
        <View style={styles.productList}>
          
          {/* Card 1 */}
          <View style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=400&q=80' }} style={styles.productImage} />
              <View style={[styles.badge, { backgroundColor: '#CCFBF1' }]}>
                <Text style={[styles.badgeText, { color: '#0F766E' }]}>● In Stock</Text>
              </View>
            </View>
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.brandText}>SINGER</Text>
                <Text style={styles.priceText}>$119.53</Text>
              </View>
              <Text style={styles.modelName}>Heavy Duty 4423</Text>
              <Text style={styles.serialText}>Serial: SM-HD-002843</Text>
              
              <View style={styles.productFooter}>
                <View>
                  <Text style={styles.stockLabel}>Available Stock</Text>
                  <Text style={styles.stockValue}>84 Units</Text>
                </View>
                <TouchableOpacity style={styles.detailsBtn}>
                  <Text style={styles.detailsText}>Details</Text>
                  <IconButton icon="arrow-right" size={14} iconColor="#1A365D" style={{ margin: 0, width: 14, height: 14 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Card 2 */}
          <View style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=400&q=80' }} style={styles.productImage} />
              <View style={[styles.badge, { backgroundColor: '#FEE2E2' }]}>
                <Text style={[styles.badgeText, { color: '#B91C1C' }]}>● Low Stock</Text>
              </View>
            </View>
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.brandText}>USHA</Text>
                <Text style={styles.priceText}>$105.24</Text>
              </View>
              <Text style={styles.modelName}>Janome Dream Stitch</Text>
              <Text style={styles.serialText}>Serial: SM-US-220194</Text>
              
              <View style={styles.productFooter}>
                <View>
                  <Text style={styles.stockLabel}>Available Stock</Text>
                  <Text style={[styles.stockValue, { color: '#EF4444' }]}>5 Units</Text>
                </View>
                <TouchableOpacity style={styles.detailsBtn}>
                  <Text style={styles.detailsText}>Details</Text>
                  <IconButton icon="arrow-right" size={14} iconColor="#1A365D" style={{ margin: 0, width: 14, height: 14 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Card 3 */}
          <View style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1588666579895-71be9b165b4f?auto=format&fit=crop&w=400&q=80' }} style={styles.productImage} />
              <View style={[styles.badge, { backgroundColor: '#CCFBF1' }]}>
                <Text style={[styles.badgeText, { color: '#0F766E' }]}>● In Stock</Text>
              </View>
            </View>
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.brandText}>BROTHER</Text>
                <Text style={styles.priceText}>$349.00</Text>
              </View>
              <Text style={styles.modelName}>FS101 Computerized</Text>
              <Text style={styles.serialText}>Serial: SM-BR-402752</Text>
              
              <View style={styles.productFooter}>
                <View>
                  <Text style={styles.stockLabel}>Available Stock</Text>
                  <Text style={styles.stockValue}>12 Units</Text>
                </View>
                <TouchableOpacity style={styles.detailsBtn}>
                  <Text style={styles.detailsText}>Details</Text>
                  <IconButton icon="arrow-right" size={14} iconColor="#1A365D" style={{ margin: 0, width: 14, height: 14 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Card 4 */}
          <View style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1509427163866-9b579af04b90?auto=format&fit=crop&w=400&q=80' }} style={styles.productImage} />
              <View style={[styles.badge, { backgroundColor: '#CCFBF1' }]}>
                <Text style={[styles.badgeText, { color: '#0F766E' }]}>● In Stock</Text>
              </View>
            </View>
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.brandText}>JUKI</Text>
                <Text style={styles.priceText}>$629.00</Text>
              </View>
              <Text style={styles.modelName}>DDL-8700 High-Speed</Text>
              <Text style={styles.serialText}>Serial: SM-JK-770113</Text>
              
              <View style={styles.productFooter}>
                <View>
                  <Text style={styles.stockLabel}>Available Stock</Text>
                  <Text style={styles.stockValue}>26 Units</Text>
                </View>
                <TouchableOpacity style={styles.detailsBtn}>
                  <Text style={styles.detailsText}>Details</Text>
                  <IconButton icon="arrow-right" size={14} iconColor="#1A365D" style={{ margin: 0, width: 14, height: 14 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="#FFFFFF"
        onPress={() => console.log('Add Product pressed')}
      />

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
    paddingBottom: 80,
  },
  titleSection: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    marginBottom: 20,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statCardAlert: {
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  statIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  productList: {
    gap: 16,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  productInfo: {
    padding: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  modelName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A365D',
    marginBottom: 4,
  },
  serialText: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 16,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  stockLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  stockValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A365D',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: '#0F172A',
    borderRadius: 16,
  },
});

export default ProductList;
