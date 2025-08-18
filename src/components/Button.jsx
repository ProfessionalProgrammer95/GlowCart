import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function Button({title, onPress}) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#b56576',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  txt: {color: '#fff', fontWeight: 'bold'},
});
