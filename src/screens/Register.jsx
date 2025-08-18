import React, { useState, useMemo } from 'react';
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
import { useAuth } from '../context/AuthContext'; // << add

const colors = {
  bg: '#FBE9E7',          // pale peach
  card: '#E8A5AB',        // top rounded card
  primary: '#B56576',     // button
  white: '#fff',
  textDark: '#554A4A',
  textMid: '#7A6E6E',
  textMute: '#A99A9A',
  line: '#E7D6D6',
};

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const { register } = useAuth(); // << from context

  const valid = useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(email);
    const passOk = pwd.length >= 6 && pwd === cpwd;
    return !!name && emailOk && passOk;
  }, [name, email, pwd, cpwd]);

  const onCreate = () => {
    if (!valid) {
      if (!name || !email || !pwd || !cpwd) return Alert.alert('Fill all fields');
      if (!/\S+@\S+\.\S+/.test(email)) return Alert.alert('Invalid email');
      if (pwd.length < 6) return Alert.alert('Password must be at least 6 characters');
      if (pwd !== cpwd) return Alert.alert('Passwords do not match');
    }
    // mock register (wire to API if needed)
    register(name, email, pwd);
    navigation.replace('HomeTabs'); // go directly to app, no back to Register
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Top header card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Join The Glow!</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={colors.textMute}
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Email Address"
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
              secureTextEntry={secure1}
              value={pwd}
              onChangeText={setPwd}
            />
            <TouchableOpacity onPress={() => setSecure1(s => !s)}>
              <Ionicons
                name={secure1 ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={colors.textMute}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={colors.textMute}
              style={styles.input}
              secureTextEntry={secure2}
              value={cpwd}
              onChangeText={setCpwd}
            />
            <TouchableOpacity onPress={() => setSecure2(s => !s)}>
              <Ionicons
                name={secure2 ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={colors.textMute}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.createBtn, !valid && { opacity: 0.6 }]}
            onPress={onCreate}
            disabled={!valid}
          >
            <Text style={styles.createTxt}>Create Account</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Already a Member?{' '}
            <Text style={styles.login} onPress={() => navigation?.navigate?.('Login')}>
              Log In
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
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingVertical: 34,
    alignItems: 'center',
    ...SHADOW,
  },
  heroTitle: {
    color: '#6C3E44',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.4,
  },

  form: { marginTop: 28, paddingHorizontal: 18 },

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
  input: {
    flex: 1,
    color: colors.textDark,
    fontSize: 15,
    marginRight: 10,
  },

  createBtn: {
    backgroundColor: colors.primary,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    ...SHADOW,
  },
  createTxt: { color: colors.white, fontSize: 18, fontWeight: '700' },

  footer: {
    textAlign: 'center',
    marginTop: 22,
    color: colors.textMid,
    fontSize: 14,
  },
  login: { color: '#DB3C3C', fontWeight: '700' },
});
