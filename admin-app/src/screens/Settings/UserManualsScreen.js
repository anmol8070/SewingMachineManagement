import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserManualsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor="#1A365D" style={{ margin: 0 }} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>User Manuals</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.manualCard}>
           <View style={styles.iconBg}><IconButton icon="file-pdf-box" size={32} iconColor="#EF4444" style={{margin:0}}/></View>
           <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>TM-700 Heavy Duty Industrial</Text>
              <Text style={styles.cardSub}>PDF • 4.2 MB • English</Text>
           </View>
           <IconButton icon="download-outline" size={20} iconColor="#1A365D" style={{margin:0}}/>
        </View>
        
        <View style={styles.manualCard}>
           <View style={styles.iconBg}><IconButton icon="file-pdf-box" size={32} iconColor="#EF4444" style={{margin:0}}/></View>
           <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Pro Series 5500-X</Text>
              <Text style={styles.cardSub}>PDF • 3.1 MB • English</Text>
           </View>
           <IconButton icon="download-outline" size={20} iconColor="#1A365D" style={{margin:0}}/>
        </View>

        <View style={styles.manualCard}>
           <View style={styles.iconBg}><IconButton icon="file-pdf-box" size={32} iconColor="#EF4444" style={{margin:0}}/></View>
           <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Basic Maintenance Guide</Text>
              <Text style={styles.cardSub}>PDF • 1.5 MB • English</Text>
           </View>
           <IconButton icon="download-outline" size={20} iconColor="#1A365D" style={{margin:0}}/>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginLeft: 8 },
  content: { padding: 20, paddingBottom: 40, gap: 12 },
  manualCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  iconBg: { width: 48, height: 48, backgroundColor: '#FEF2F2', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  cardSub: { fontSize: 12, color: '#64748B' }
});

export default UserManualsScreen;
