import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const colors = {
  white: '#fff',
  text: '#3E3A3A',
  sub: '#8B7E7E',
  border: '#F1E2E2',
  bg: '#FFF7F6',
};

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
      </View>

      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>

      <TouchableOpacity style={styles.heartBtn}>
        <Ionicons name="heart-outline" size={20} color="#8C8C8C" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const SHADOW = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 2 },
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...SHADOW,
  },
  imageWrap: {
    backgroundColor: colors.bg,
    borderRadius: 12,
    overflow: 'hidden',
    height: 150,
    marginBottom: 10,
  },
  image: { width: '100%', height: '100%' },

  title: { color: colors.text, fontWeight: '600', fontSize: 14, marginBottom: 4 },
  price: { color: '#5F5F5F', fontSize: 13 },

  heartBtn: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
