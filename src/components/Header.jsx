import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ title = 'Viorra', onBellPress, onCartPress }) => {
  return (
    <View style={styles.container}>
      {/* Brand */}
      <Text style={styles.brand}>{title}</Text>

      {/* Icons */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={onBellPress}>
          <Ionicons name="notifications-outline" size={22} color="#2E2A2A" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onCartPress}>
          <Ionicons name="bag-outline" size={22} color="#2E2A2A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  brand: {
    fontSize: 26,
    color: '#9E3A4C', 
    fontWeight: '600',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
});

export default Header;
