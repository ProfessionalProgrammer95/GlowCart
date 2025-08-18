import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductCard from '../components/ProductCard';

const colors = {
  bg: '#F6E7E3',        // light blush background
  white: '#fff',
  text: '#3E3A3A',
  sub: '#8B7E7E',
  primary: '#B56576',
  chip: '#F2DEDF',
  border: '#F1E2E2',
};

export default function Home({ navigation, title = 'Viorra', onBellPress, onCartPress }) {
  const [all, setAll] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://dummyjson.com/products?limit=100');
      setAll(res.data?.products ?? []);
    } catch (e) {
      console.error('Products load error', e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, []);

  // cosmetic-like filter (optional)
  const cosmeticKeys = ['beauty', 'fragrance', 'skin', 'lip', 'lash', 'eyeshadow', 'mask', 'cream', 'makeup', 'mascara'];
  const data = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = all.filter(
      p =>
        cosmeticKeys.some(k =>
          (p.title + ' ' + p.description + ' ' + (p.category || '')).toLowerCase().includes(k),
        ) || true, // keep all to avoid empty state; adjust if you want strict
    );
    if (term) {
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term),
      );
    }
    return list;
  }, [all, q]);

  const header = (
    <>
      {/* Top bar */}
       <View style={styles.topBar}>
      <Text style={styles.brand}>{title}</Text>
      <View style={styles.topIcons}>
        <TouchableOpacity style={styles.iconBtn} onPress={onBellPress}>
          <Ionicons name="notifications-outline" size={22} color="#2E2A2A" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onCartPress}>
          <Ionicons name="bag-outline" size={22} color="#2E2A2A" />
        </TouchableOpacity>
      </View>
    </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={20} color={colors.sub} />
        <TextInput
          placeholder="Search for all products"
          placeholderTextColor={colors.sub}
          style={styles.searchInput}
          value={q}
          onChangeText={setQ}
          returnKeyType="search"
        />
        <Ionicons name="mic-outline" size={20} color={colors.sub} />
      </View>

      {/* Section header */}
      <View style={styles.sectionRow}>
        <View>
          <Text style={styles.sectionTitle}>Best Products</Text>
          <Text style={styles.sectionSub}>{data.length} products</Text>
        </View>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterTxt}>Apply Filter</Text>
          <Ionicons name="funnel-outline" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          ListHeaderComponent={header}
          columnWrapperStyle={styles.col}
          contentContainerStyle={{ paddingBottom: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() => navigation.navigate('ProductDetails', { product: item })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const SHADOW = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1 },

  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  brand: {
    fontSize: 26,
    color: '#9E3A4C', // close to the logo color
    fontWeight: '600',
  },
  topIcons: { flexDirection: 'row', gap: 10 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    ...SHADOW,
  },

  searchWrap: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 26,
    height: 46,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...SHADOW,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.text },

  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  sectionSub: {
    fontSize: 12,
    color: colors.sub,
    marginTop: 2,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.chip,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTxt: { color: colors.primary, fontWeight: '700', fontSize: 12 },

  col: { paddingHorizontal: 8 },
});
