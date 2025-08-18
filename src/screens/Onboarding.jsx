// src/screens/Onboarding.js
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function Onboarding({ navigation }) {
  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/onboarding-bg.png')} // <-- replace this image file
        resizeMode="cover"
        style={styles.bg}
      >
        {/* Subtle dark-to-transparent overlay to improve text contrast */}
        <View style={styles.overlay} />

        {/* Bottom content block */}
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

          {/* iOS-style home indicator bar */}
          <View style={styles.homeIndicator} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#d9b7b9' }, 
  bg: { flex: 1, justifyContent: 'flex-end' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)', 
  },

  bottomBlock: {
    paddingHorizontal: 28,
    paddingBottom: Platform.select({ ios: 24, android: 28 }),
    alignItems: 'center',
    minHeight: height * 0.34,
    justifyContent: 'flex-end',
    gap: 14,
  },

  brand: {
    color: '#ffffff',
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '600',
    letterSpacing: 1,
  },
  tagline: {
    color: '#f7f2f2',
    fontSize: 14,
    lineHeight: 18,
    marginTop: -4,
    marginBottom: 6,
  },

  cta: {
    backgroundColor: '#B56576', 
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    minWidth: 170,
    alignItems: 'center',
    shadowColor: '#B56576',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  homeIndicator: {
    width: 120,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.85)',
    marginTop: 18,
    marginBottom: Platform.select({ ios: 6, android: 0 }),
  },
});
