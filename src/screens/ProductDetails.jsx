import React, { useMemo } from 'react';
import { useWishlist } from '../context/WishlistContext';

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
  bg: '#FFEDE8',        
  card: '#F5D9D4',    
  white: '#fff',
  text: '#2E2A2A',
  sub: '#6E6161',
  primary: '#B56576',  
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
    const { toggle, items } = useWishlist();
 const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];
  const liked = !!product && safeItems.some(i => i?.id === product.id);



  const {
    title = 'Essence Mascara Lash Princess',
    description = 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long lasting and cruelty free formula',
    rating = 2.56,
    price = 9.99,
    brand = 'Essence',
    thumbnail,
    images = [],
  } =  product || {};

  const imageUri = images?.[0] || thumbnail;


  const oldPrice = useMemo(() => {
    const d = product?.discountPercentage;
    if (d && d > 0 && d < 90) {
      const op = price / (1 - d / 100);
      return op.toFixed(2);
    }
    return (Number(price) + 0.49 + 0.99).toFixed(2); 
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
        <View style={styles.imageCard}>
          <Image source={{ uri: imageUri }} style={styles.image} />
       
          <TouchableOpacity style={[styles.roundBtn, styles.backBtn]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={23} color="#070707" />
          </TouchableOpacity>
          <TouchableOpacity
  style={[styles.roundBtn, styles.topRightBtn2]}
  onPress={() => {/* TODO: add-to-cart handler */}}
  activeOpacity={0.8}
>
  <Ionicons name="bag-outline" size={23} color="#070707" />
</TouchableOpacity>
         <TouchableOpacity
  style={[styles.roundBtn, styles.topRightBtn]}
  onPress={() => {
    if (!product) return;
    // If it was not liked, toggling will add it, then navigate
    if (!liked) {
      toggle(product);
      navigation.navigate('Wishlist');
    } else {
      // If already liked, just remove it
      toggle(product);
    }
  }}
  activeOpacity={0.8}
>
  <Ionicons
    name={liked ? 'heart' : 'heart-outline'}
    size={23}
    color={liked ? 'red' : '#070707'}
  />
</TouchableOpacity>
        </View>

    
        <View style={styles.card}>
        
         <View style={styles.IconsBtn}>  
             <TouchableOpacity style={styles.similarChip}>
            <Text style={styles.similarTxt}>View Similar</Text>
          </TouchableOpacity>
             <TouchableOpacity style={styles.shareBtn}>
              <Ionicons name="share-social-outline" size={35} color="#2E2A2A" />
            </TouchableOpacity>
         </View>
       
          <View style={styles.rowBetween}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.title}>{title}</Text>
            </View>
           
          </View>

          <Text style={styles.desc} numberOfLines={4}>
            {description}
          </Text>

          {/* ratings */}
          <View style={styles.ratingRow}>
            <View style={styles.starRow}>{renderStars(rating, 28)}</View>
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

         <View style={styles.cols}>
        {/* Left column */}
        <View style={styles.col}>
          <View style={styles.item}>
            <Text style={styles.label}>Width</Text>
            <Text style={styles.value}>15.14</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Warranty</Text>
            <Text style={styles.value}>1 week</Text>
          </View>
        </View>

        {/* Center divider */}
        <View style={styles.vDivider} />

        {/* Right column */}
        <View style={styles.col}>
          <View style={styles.item}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>13.08</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.value}>In 3–5 business days</Text>
          </View>
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
    marginTop: 50,
    height:427,
    marginHorizontal: 12,
    backgroundColor: '#fadcdcff',
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOW,
  },
  image: { width: '100%', height: 427 },

  roundBtn: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border,
    ...SHADOW,
  },
  backBtn: { left: 10, top: 10 },
  topRightBtn: { right: 10, top: 10, fontWeight:'bold' },

  card: {
    marginTop: 20,
    marginHorizontal: 12,
    padding: 14,   
  },

  similarChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.chipText,
    marginBottom: 8,
  },
  similarTxt: {
    color: C.chipText,
    fontWeight: '700',
    fontSize: 12 },

  rowBetween: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
},
  IconsBtn:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  shareBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    color:'#000',
    borderColor: C.border,
  },

  title: { 
    fontSize: 20, 
    fontWeight: '800',  
    fontStyle:'semibold', 
    color: C.text, 
    marginBottom: 6 ,
    marginTop:20 , 
    fontFamily:'Inter'
},
  desc: { 
    color: '#333', 
    fontSize:14, 
    lineHeight: 20 
},

  ratingRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom:20, 
},
  starRow: { 
    flexDirection: 'row', 
    gap: 3, 
    marginRight: 8 
},
  ratingValue: { 
    color: C.sub, 
    fontWeight: '600', 
    fontSize:18, 
},

  separator: {
    height: 2,
    backgroundColor: C.border,
    marginVertical: 10,
    border:0.4,
    borderColor:'#333',
  },

  soldBy: { 
    color: C.text, 
    fontWeight: '600' 
},

  price: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: C.text, 
    marginTop: 6 
},
  oldPrice: {
    marginTop: 2,
    color: C.strike,
    textDecorationLine: 'line-through',
    fontSize: 24,
  },

  cta: {
    backgroundColor: '#B84953',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width:238,
    height:56,
    textAlign:'center',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    
    ...SHADOW,
  },
  ctaTxt: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16 
},

  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '600', 
    color: '#070707',
     marginBottom: 14
     },
 cols: {
    flexDirection: 'row',
    alignItems: 'stretch',   
  },
  col: {
    flex: 1,
  },
  vDivider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#000',
    marginHorizontal: 20,
    border:100,
    
  },
  item: {
    marginBottom: 18,
    paddingLeft:0,
    marginLeft:0,
  },
  label: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 4,
    fontWeight:500,
    fontStyle:'medium',
  },
  value: {
    color: '#333',
    fontSize: 16,
    fontWeight: '400',
  },
topRightBtn2: { right: 10, top: 56 },
  hItem: {
     flex: 1, 
     gap: 4
     },
  hLabel: { 
    color: C.sub, 
    fontSize: 12 
},
  hValue: { 
    color: C.text, 
    fontWeight: '700' 
},
  dividerV: {
     width: 1, 
     backgroundColor: C.border,
      marginHorizontal: 12 
    },

  reviewCard: {
    marginTop: 12,
    backgroundColor: C.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    height:115,

    borderColor: '#989696',
    ...SHADOW,
  },
  reviewHeader: {
     flexDirection: 'row', 
     alignItems: 'center', 
     marginBottom: 8
     },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 17,
    backgroundColor: '#E2C8C6',
    marginRight: 10,
  },
  revName: { 
    fontWeight: '500', 
    color: '#333333' , 
    fontSize:14,
},
  revEmail: {
     color: '#333333',
      fontSize: 10 
    },
  revText: {
     color: '#333333',
      fontSize:16, 
      marginTop: 12 , 
      flexDirection:'row', 
      justifyContent:'flex-start', 
      alignItems:'center'
    },
});
