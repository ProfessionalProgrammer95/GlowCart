import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const C = {
  bg: '#F6E7E3',         // page background (blush)
  card: '#F5D9D4',       // content card
  white: '#fff',
  text: '#2E2A2A',
  sub: '#6E6161',
  primary: '#B56576',    // Add to Bag
  border: '#ECD9D9',
  chipText: '#B05C6E',
  chipBg: '#F3E0E1',
  strike: '#9B8C8C',
};

const SHADOW = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
});

export default function ProductDetails({ route, navigation }) {
  const product = route?.params?.product ?? {};
  const {
    title = 'Essence Mascara Lash Princess',
    description = 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long lasting and cruelty free formula',
    rating = 2.56,
    price = 9.99,
    brand = 'Essence',
    thumbnail,
    images = [],
  } = product;

  const imageUri = images?.[0] || thumbnail;

  // compute an "old price" if discount exists or add a mock
  const oldPrice = useMemo(() => {
    const d = product?.discountPercentage;
    if (d && d > 0 && d < 90) {
      const op = price / (1 - d / 100);
      return op.toFixed(2);
    }
    return (Number(price) + 0.49 + 0.99).toFixed(2); // mock 10.48 etc.
  }, [price, product]);

  const renderStars = (val) => {
    const full = Math.floor(val);
    const half = val - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    const nodes = [];
    for (let i = 0; i < full; i++) nodes.push(<Ionicons key={`s${i}`} name="star" size={16} color="#222" />);
    if (half) nodes.push(<Ionicons key="half" name="star-half" size={16} color="#222" />);
    for (let i = 0; i < empty; i++) nodes.push(<Ionicons key={`e${i}`} name="star-outline" size={16} color="#222" />);
    return nodes;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header image block */}
        <View style={styles.imageCard}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          {/* back button */}
          <TouchableOpacity style={[styles.roundBtn, styles.backBtn]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#2E2A2A" />
          </TouchableOpacity>
          {/* favourite / bag icon (as in screenshot top-right) */}
          <TouchableOpacity style={[styles.roundBtn, styles.topRightBtn]}>
            <Ionicons name="heart-outline" size={20} color="#2E2A2A" />
          </TouchableOpacity>
        </View>

        {/* Content card */}
        <View style={styles.card}>
          {/* View similar chip */}
          <TouchableOpacity style={styles.similarChip}>
            <Text style={styles.similarTxt}>View Similar</Text>
          </TouchableOpacity>

          {/* Title + share */}
          <View style={styles.rowBetween}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.shareBtn}>
              <Ionicons name="share-social-outline" size={20} color="#2E2A2A" />
            </TouchableOpacity>
          </View>

          <Text style={styles.desc} numberOfLines={4}>
            {description}
          </Text>

          {/* ratings */}
          <View style={styles.ratingRow}>
            <View style={styles.starRow}>{renderStars(rating)}</View>
            <Text style={styles.ratingValue}>{Number(rating).toFixed(2)}/5</Text>
          </View>

          <View style={styles.separator} />

          <Text style={styles.soldBy}>
            <Text style={{ color: C.sub }}>Sold by : </Text>
            {brand || 'Essence'}
          </Text>

          {/* price + CTA */}
          <View style={[styles.rowBetween, { marginTop: 12 }]}>
            <View>
              <Text style={styles.price}>${Number(price).toFixed(2)}</Text>
              <Text style={styles.oldPrice}>${oldPrice}</Text>
            </View>
            <TouchableOpacity style={styles.cta}>
              <Text style={styles.ctaTxt}>Add to Bag</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Highlights</Text>

          <View style={styles.highlightsGrid}>
            <View style={styles.hItem}>
              <Text style={styles.hLabel}>Width</Text>
              <Text style={styles.hValue}>{product?.dimensions?.width ?? product?.width ?? '15.14'}</Text>
            </View>

            <View style={styles.dividerV} />

            <View style={styles.hItem}>
              <Text style={styles.hLabel}>Height</Text>
              <Text style={styles.hValue}>{product?.dimensions?.height ?? product?.height ?? '13.08'}</Text>
            </View>

            <View style={styles.dividerV} />

            <View style={styles.hItem}>
              <Text style={styles.hLabel}>Warranty</Text>
              <Text style={styles.hValue}>1 week</Text>
            </View>

            <View style={styles.dividerV} />

            <View style={styles.hItem}>
              <Text style={styles.hLabel}>Shipping</Text>
              <Text style={styles.hValue}>In 3–5 business days</Text>
            </View>
          </View>
        </View>

        {/* Ratings & Reviews */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ratings & Reviews</Text>

          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.revName}>Eleanor Collins</Text>
                <Text style={styles.revEmail}>eleanor.collins@gmail.com</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="star" size={16} />
                <Ionicons name="star" size={16} />
                <Ionicons name="star" size={16} />
                <Ionicons name="star-outline" size={16} />
                <Ionicons name="star-outline" size={16} />
              </View>
            </View>
            <Text style={styles.revText}>Would not recommend...</Text>
          </View>

          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.revName}>Lucas Gordon</Text>
                <Text style={styles.revEmail}>lucas.gordon@gmail.com</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="star" size={16} />
                <Ionicons name="star" size={16} />
                <Ionicons name="star" size={16} />
                <Ionicons name="star-half" size={16} />
                <Ionicons name="star-outline" size={16} />
              </View>
            </View>
            <Text style={styles.revText}>Very satisfied!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  imageCard: {
    marginTop: 6,
    marginHorizontal: 12,
    backgroundColor: C.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOW,
  },
  image: { width: '100%', height: 260 },

  roundBtn: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border,
    ...SHADOW,
  },
  backBtn: { left: 10, top: 10 },
  topRightBtn: { right: 10, top: 10 },

  card: {
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: C.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,
  },

  similarChip: {
    alignSelf: 'flex-start',
    backgroundColor: C.chipBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 8,
  },
  similarTxt: { color: C.chipText, fontWeight: '700', fontSize: 12 },

  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  shareBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: C.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border,
  },

  title: { fontSize: 18, fontWeight: '800', color: C.text, marginBottom: 6 },
  desc: { color: C.sub, lineHeight: 20 },

  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  starRow: { flexDirection: 'row', gap: 2, marginRight: 8 },
  ratingValue: { color: C.sub, fontWeight: '600' },

  separator: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 10,
  },

  soldBy: { color: C.text, fontWeight: '600' },

  price: { fontSize: 28, fontWeight: '800', color: C.text, marginTop: 6 },
  oldPrice: {
    marginTop: 2,
    color: C.strike,
    textDecorationLine: 'line-through',
    fontSize: 16,
  },

  cta: {
    backgroundColor: C.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    ...SHADOW,
  },
  ctaTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: C.text, marginBottom: 8 },

  highlightsGrid: {
    backgroundColor: C.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    flexDirection: 'row',
    padding: 12,
  },
  hItem: { flex: 1, gap: 4 },
  hLabel: { color: C.sub, fontSize: 12 },
  hValue: { color: C.text, fontWeight: '700' },
  dividerV: { width: 1, backgroundColor: C.border, marginHorizontal: 12 },

  reviewCard: {
    marginTop: 12,
    backgroundColor: C.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: C.border,
    ...SHADOW,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E2C8C6',
    marginRight: 10,
  },
  revName: { fontWeight: '700', color: C.text },
  revEmail: { color: C.sub, fontSize: 12 },
  revText: { color: C.text, marginTop: 2 },
});
