import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Olivia</Text>
      <TouchableOpacity><Text>Address</Text></TouchableOpacity>
      <TouchableOpacity><Text>Order History</Text></TouchableOpacity>
      <TouchableOpacity><Text>Language</Text></TouchableOpacity>
      <TouchableOpacity><Text>Notifications</Text></TouchableOpacity>
      <TouchableOpacity><Text>Logout</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({container:{flex:1,padding:20}, name:{fontSize:22,marginBottom:20}});
