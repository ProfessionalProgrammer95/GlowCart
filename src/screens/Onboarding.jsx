import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
    Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Onboarding({ navigation }) {

     const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate progress bar on mount
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,   // 3 seconds for loading
      useNativeDriver: false,
    }).start(() => {
      // after progress completes, you can auto-navigate OR reset
      // navigation.navigate('Login');
    });
  }, []);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], // fill range
  });

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.imageWrap}>
        <ImageBackground
          source={require('../assets/onboarding-bg.png')}
          resizeMode="cover"
          style={styles.bg}
        />
      </View>

      <View style={styles.bottomBlock}>
        <Text style={styles.brand}>Viorra</Text>
        <Text style={styles.tagline}>Your Beauty, Delivered.</Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Login')}
          style={styles.cta}
        >
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.pager}>
          <Animated.View style={[styles.progress, { width: barWidth }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2D7D7' },


  imageWrap: {
    height: height * 0.73,
    width: '100%',
  },
  bg: { flex: 1 },


  bottomBlock: {
    flex: 1,
    backgroundColor: '#e3c2ba',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 1,                                
    paddingBottom: Platform.select({ ios: 26, android: 32 }),
  },

  brand: {
    color: '#ffffff',
    fontSize: 60,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    textAlign: 'center',
   marginTop:-65,
  },
  tagline: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 8,
  },

  cta: {
    marginTop: 52,
    height: 56,
   
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B84953',
    width: width * 0.45,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 4 },
    }),
  },
  ctaText: { color: '#fff', fontWeight: '500', fontSize: 24 },

 pager: {
    marginTop: 40,
    width: 120,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
    overflow: 'hidden',
  },
  progress: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
});
