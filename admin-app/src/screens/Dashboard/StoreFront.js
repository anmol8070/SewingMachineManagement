import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoreFront = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <IconButton icon="view-dashboard" size={24} iconColor="#1A365D" style={{ margin: 0 }} />
          <Text style={styles.logoText}>ThreadMasters Pro</Text>
        </View>
        <IconButton icon="menu" size={24} iconColor="#1A365D" style={{ margin: 0 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTag}>PREMIUM EQUIPMENT</Text>
          <Text style={styles.heroTitle}>Engineered for{"\n"}Excellence.{"\n"}Built for{"\n"}Production.</Text>
          <Text style={styles.heroDesc}>
            Discover industrial sewing machines designed to meet the demands of high-volume production, delivering precision, durability, and efficiency at every stitch.
          </Text>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity style={styles.btnPrimary}>
               <IconButton icon="shopping-outline" size={16} iconColor="#FFFFFF" style={{ margin: 0, marginRight: 4 }} />
               <Text style={styles.btnPrimaryText}>Shop Machines</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary}>
               <Text style={styles.btnSecondaryText}>Read Info</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Image & Icons */}
        <View style={styles.heroImageContainer}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1598425237751-2e694fb209e7?auto=format&fit=crop&w=800&q=80' }} style={styles.heroImg} />
          <View style={styles.featureIconsRow}>
             <View style={styles.featIcon}><IconButton icon="factory" size={20} iconColor="#1A365D" style={{margin:0}}/><Text style={styles.featIconText}>Industrial</Text></View>
             <View style={styles.featIcon}><IconButton icon="flash-outline" size={20} iconColor="#1A365D" style={{margin:0}}/><Text style={styles.featIconText}>High-Speed</Text></View>
             <View style={styles.featIcon}><IconButton icon="cog-outline" size={20} iconColor="#1A365D" style={{margin:0}}/><Text style={styles.featIconText}>Precision</Text></View>
             <View style={styles.featIcon}><IconButton icon="shield-check-outline" size={20} iconColor="#1A365D" style={{margin:0}}/><Text style={styles.featIconText}>Durable</Text></View>
          </View>
        </View>

        {/* Stats List */}
        <View style={styles.statsList}>
           <View style={styles.statItem}>
              <View style={[styles.statIconBg, { backgroundColor: '#1E293B' }]}>
                 <IconButton icon="domain" size={20} iconColor="#FFFFFF" style={{ margin: 0 }} />
              </View>
              <View style={styles.statContent}>
                 <Text style={styles.statTitle}>100+ Manufacturers</Text>
                 <Text style={styles.statSub}>Sourced globally from the best</Text>
              </View>
           </View>
           
           <View style={styles.statItem}>
              <View style={[styles.statIconBg, { backgroundColor: '#DBEAFE' }]}>
                 <IconButton icon="package-variant" size={20} iconColor="#1D4ED8" style={{ margin: 0 }} />
              </View>
              <View style={styles.statContent}>
                 <Text style={styles.statTitle}>5,000+ Parts</Text>
                 <Text style={styles.statSub}>In-stock available right now</Text>
              </View>
           </View>

           <View style={styles.statItem}>
              <View style={[styles.statIconBg, { backgroundColor: '#D1FAE5' }]}>
                 <IconButton icon="shield-check" size={20} iconColor="#047857" style={{ margin: 0 }} />
              </View>
              <View style={styles.statContent}>
                 <Text style={styles.statTitle}>Certified</Text>
                 <Text style={styles.statSub}>100% Genuine and assured</Text>
              </View>
           </View>
        </View>

        {/* Featured Machines */}
        <View style={styles.featuredSection}>
           <Text style={styles.sectionTitle}>Featured Machines</Text>
           <Text style={styles.sectionDesc}>Unleash power in every stitch today with ease.</Text>
           
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              <View style={styles.machineCard}>
                 <View style={styles.badgeNew}><Text style={styles.badgeNewText}>NEW</Text></View>
                 <Image source={{ uri: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=300&q=80' }} style={styles.machineImg} />
                 <Text style={styles.machineBrand}>BROTHER</Text>
                 <Text style={styles.machineTitle}>Pro Series 5500-X</Text>
                 <View style={styles.machineFooter}>
                    <Text style={styles.machinePrice}>₹1,24,500</Text>
                    <Text style={styles.viewDetailsText}>View Details -></Text>
                 </View>
              </View>
              
              <View style={styles.machineCard}>
                 <Image source={{ uri: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=300&q=80' }} style={styles.machineImg} />
                 <Text style={styles.machineBrand}>JUKI</Text>
                 <Text style={styles.machineTitle}>Industrial Lockstitch</Text>
                 <View style={styles.machineFooter}>
                    <Text style={styles.machinePrice}>₹89,000</Text>
                    <Text style={styles.viewDetailsText}>View Details -></Text>
                 </View>
              </View>
           </ScrollView>
        </View>

        {/* Call To Actions */}
        <View style={styles.ctaContainer}>
           
           <View style={styles.warrantyBox}>
              <Text style={styles.ctaTitle}>Warranty Check</Text>
              <Text style={styles.ctaDesc}>Enter serial code to track warranty validity status of your machine instantly.</Text>
              <View style={styles.warrantyInputBox}>
                 <TextInput style={styles.warrantyInput} placeholder="Search Serial..." placeholderTextColor="#94A3B8" />
                 <View style={styles.warrantyBtn}><IconButton icon="magnify" size={18} iconColor="#FFFFFF" style={{margin:0}}/></View>
              </View>
           </View>

           <View style={styles.serviceBox}>
              <Text style={styles.ctaTitle}>Request Service</Text>
              <Text style={styles.ctaDesc}>It's out of warranty? Drop a request now to maintain your machine.</Text>
              <TouchableOpacity style={styles.serviceBtn}>
                 <Text style={styles.serviceBtnText}>Book Now -></Text>
              </TouchableOpacity>
           </View>
           
        </View>

        {/* Footer */}
        <View style={styles.footer}>
           <View style={styles.logoContainer}>
             <IconButton icon="view-dashboard" size={20} iconColor="#FFFFFF" style={{ margin: 0 }} />
             <Text style={[styles.logoText, { color: '#FFFFFF' }]}>ThreadMasters Pro</Text>
           </View>
           <Text style={styles.footerDesc}>
             Providing top quality sewing machine tools, service and accessories. Authorized partner across India.
           </Text>
           
           <Text style={styles.footerLinkHeader}>QUICK LINKS</Text>
           <Text style={styles.footerLink}>Home</Text>
           <Text style={styles.footerLink}>Products</Text>
           <Text style={styles.footerLink}>Warranty Check</Text>
           <Text style={styles.footerLink}>Service Request</Text>

           <Text style={styles.footerLinkHeader}>CONTACT</Text>
           <Text style={styles.footerLink}>+91 99999 88888</Text>
           <Text style={styles.footerLink}>info@threadmasters.com</Text>

           <Text style={styles.footerCopyright}>© 2026 ThreadMasters Pro. All rights reserved.</Text>
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
    paddingBottom: 0,
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#EEF2FF', // very light blue tint
  },
  heroTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B82F6',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 38,
    marginBottom: 16,
  },
  heroDesc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnPrimary: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  btnSecondary: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  btnSecondaryText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 13,
  },
  heroImageContainer: {
    backgroundColor: '#FFFFFF',
  },
  heroImg: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  featureIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  featIcon: {
    alignItems: 'center',
  },
  featIconText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 4,
  },
  statsList: {
    padding: 20,
    gap: 16,
    backgroundColor: '#F8FAFC',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  statSub: {
    fontSize: 12,
    color: '#64748B',
  },
  featuredSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  machineCard: {
    width: 260,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    position: 'relative',
  },
  badgeNew: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },
  badgeNewText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  machineImg: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  machineBrand: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 4,
  },
  machineTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  machineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  machinePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A365D',
  },
  viewDetailsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B82F6',
  },
  ctaContainer: {
    padding: 20,
    gap: 16,
    backgroundColor: '#F8FAFC',
  },
  warrantyBox: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  ctaDesc: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 16,
  },
  warrantyInputBox: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 4,
    paddingLeft: 12,
    alignItems: 'center',
  },
  warrantyInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  warrantyBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  serviceBox: {
    backgroundColor: '#064E3B',
    borderRadius: 16,
    padding: 20,
  },
  serviceBtn: {
    backgroundColor: '#6EE7B7',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  serviceBtnText: {
    color: '#064E3B',
    fontWeight: '800',
    fontSize: 13,
  },
  footer: {
    backgroundColor: '#0F172A',
    padding: 24,
    paddingTop: 32,
  },
  footerDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 24,
    marginTop: 12,
  },
  footerLinkHeader: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
  },
  footerLink: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 10,
  },
  footerCopyright: {
    color: '#475569',
    fontSize: 11,
    marginTop: 32,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 16,
  }
});

export default StoreFront;
