import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext'; // << add this

const colors = {
  bg: '#FBE9E7',
  card: '#DEA0A2',
  primary: '#B56576',
  textDark: '#5A4A4A',
  textMid: '#7A6E6E',
  textMute: '#9A8F8F',
  white: '#ffffff',
  line: '#E7D6D6',
};

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [secure, setSecure] = useState(true);
  const { login } = useAuth(); // << from AuthContext

  const handleLogin = () => {
    if (!email.trim() || !pwd.trim()) {
      return Alert.alert('Missing info', 'Please enter email and password.');
    }
    // mock login (replace with API if needed)
    login(email, pwd);
    navigation.replace('HomeTabs'); // no back to login
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top rounded card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Hello Again!</Text>
          <Text style={styles.heroSub}>Welcome back you’ve been missed.</Text>
        </View>

        {/* Inputs */}
        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Enter your email Id"
              placeholderTextColor={colors.textMute}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Ionicons name="mail-outline" size={20} color={colors.textMute} />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={colors.textMute}
              style={styles.input}
              secureTextEntry={secure}
              value={pwd}
              onChangeText={setPwd}
            />
            <TouchableOpacity onPress={() => setSecure(s => !s)}>
              <Ionicons
                name={secure ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={colors.textMute}
              />
            </TouchableOpacity>
          </View>

          {/* Single Log In button (styled) */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.loginBtn, (!email || !pwd) && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={!email || !pwd}
          >
            <Text style={styles.loginTxt}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotWrap}>
            <Text style={styles.forgot}>Forgot password</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.dividerTxt}>Or Continue With</Text>
            <View style={styles.line} />
          </View>

          {/* Social row */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.9}>
              <Ionicons name="logo-google" size={24} color="#EA4335" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.9}>
              <Ionicons name="logo-apple" size={26} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.9}>
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
          </View>

          {/* Footer link */}
          <Text style={styles.footer}>
            Not a Member?{' '}
            <Text
              style={styles.register}
              onPress={() => navigation?.navigate?.('Register')}
            >
              Register Now
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SHADOW =
  Platform.OS === 'ios'
    ? {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      }
    : { elevation: 6 };

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: 28 },

  heroCard: {
    marginTop: 4,
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingTop: 36,
    paddingBottom: 28,
    alignItems: 'center',
    ...SHADOW,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  heroSub: {
    color: '#FDEBEB',
    fontSize: 15,
    fontWeight: '500',
  },

  form: { marginTop: 26, paddingHorizontal: 18 },
  inputWrap: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EFE2E2',
    ...SHADOW,
  },
  input: { flex: 1, color: colors.textDark, fontSize: 15, marginRight: 10 },

  forgotWrap: { alignItems: 'flex-end', marginTop: 10, marginBottom: 12 },
  forgot: { color: '#D14B4B', textDecorationLine: 'underline', fontSize: 13 },

  loginBtn: {
    backgroundColor: colors.primary,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    ...SHADOW,
  },
  loginTxt: { color: colors.white, fontSize: 18, fontWeight: '700' },

  dividerRow: {
    marginTop: 22,
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: { flex: 1, height: 1, backgroundColor: colors.line },
  dividerTxt: { color: colors.textMid, fontSize: 13, fontWeight: '600', marginHorizontal: 12 },

  socialRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0E2E2',
    ...SHADOW,
  },

  footer: { textAlign: 'center', marginTop: 22, color: colors.textMid, fontSize: 14 },
  register: { color: '#DB3C3C', fontWeight: '700' },
});
