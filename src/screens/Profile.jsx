import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';

const colors = {
  bg: '#FBEFF0',
  card: '#FFFFFF',
  text: '#222222',
  sub: '#8E8E93',
  primary: '#B84953',
  divider: 'rgba(0,0,0,0.06)',
  iconBg: '#F4E6E8',
  danger: '#D64A4A',
};

function Row({ icon, title, subtitle, onPress, right = true, danger }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.rowIconWrap}>
          <Ionicons
            name={icon}
            size={23}
            color={danger ? colors.danger : '#4B4B4B'}
          />
        </View>
        <View>
          <Text style={[styles.rowTitle, danger && { color: colors.danger }]}>
            {title}
          </Text>
          {!!subtitle && <Text style={styles.rowSub}>{subtitle}</Text>}
        </View>
      </View>
      {right && (
        <Ionicons
          name="chevron-forward"
          size={25}
          color="rgba(0,0,0,0.35)"
          style={{ marginLeft: 12 }}
        />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const name = user?.name || 'Olivia';
  const email = user?.email || 'Olivia@gmail.com';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity 
          style={styles.headerBtn} 
          activeOpacity={0.8}>
        <Ionicons 
            name="ellipsis-horizontal" 
            size={25} 
            color={colors.text} />
          </TouchableOpacity>
        </View>


        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/120?img=5' }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
            <Ionicons name="create-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Card 1 */}
        <View style={styles.card}>
          <Row
            icon="location-outline"
            title="Address"
            subtitle="Manage your saved address"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <Row
            icon="time-outline"
            title="Order History"
            subtitle="View your past orders"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <Row 
          icon="globe-outline" 
          title="Language" 
          onPress={() => {}} />
          <View style={styles.divider} />

          <Row 
          icon="notifications-outline" 
          title="Notifications" 
          onPress={() => {}} />
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Row 
          icon="call-outline" 
          title="Contact Us" 
          onPress={() => {}} />
          <View style={styles.divider} />
          <Row 
          icon="help-circle-outline" 
          title="Get Help"
           onPress={() => {}} />
          <View style={styles.divider} />
          <Row 
          icon="shield-outline" 
          title="Privacy Policy" 
          onPress={() => {}} />
          <View style={styles.divider} />
          <Row 
          icon="document-text-outline" 
          title="Terms and Conditions" 
          onPress={() => {}} />
        <View style={styles.divider} />

        <Row
        icon="log-out-outline"
        title="Log Out"
        right={false}
        danger
        onPress={() => {
        logout();
        navigation.replace('Login');
        }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function shadow(elev = 3) {
  return Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    android: { elevation: elev },
  });
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },


  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  headerBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow(),
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    ...shadow(),
  },
  avatar: {
     width: 56, 
     height: 56, 
     borderRadius: 28, 
     marginRight: 12 
    },
  name: { 
    fontSize: 20, 
    fontWeight: '700',
     color: colors.text 
    },
  email: { 
    marginTop: 2,
     fontSize: 12,
      color: colors.sub
     },
  editBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    ...shadow(2),
  },

 
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 22,
    marginBottom: 16,
    ...shadow(),
  },
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
},
  rowIconWrap: {
   color:'#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTitle: {
     fontSize: 16, 
     color: '#070707', 
     fontWeight: '600' 
    },
  rowSub: { 
    fontSize: 12,
     color: '#7D7D7D',
      marginTop: 2 },
  divider: {
     height: StyleSheet.hairlineWidth, 
     backgroundColor: colors.divider 
    },
});
