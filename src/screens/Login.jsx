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
import { useAuth } from '../context/AuthContext'; 

const colors = {
  bg: '#FFEDE8',        
  card: '#F1B0B0',      
  primary: '#B84953',   
  textDark: '#5A4A4A',
  textMid:  '#887A7A',
  textMute: '#A79898',
  white:    '#B84953',
  white1:'#ffffff',
  line:     '#E8D7D7',
};

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [secure, setSecure] = useState(true);
  const { login } = useAuth(); 

  const handleLogin = () => {
    if (!email.trim() || !pwd.trim()) {
      return Alert.alert('Missing info', 'Please enter email and password.');
    }
    
    login(email, pwd);
    navigation.replace('HomeTabs'); 
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Hello Again!</Text>
          <Text style={styles.heroSub}>Welcome back you’ve been missed.</Text>
        </View>

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

          <TouchableOpacity style={styles.forgotWrap}>
            <Text style={styles.forgot}>Forgot password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.loginBtn, (!email || !pwd) && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={!email || !pwd}
          >
            <Text style={styles.loginTxt}>Log In</Text>
          </TouchableOpacity>

   
          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.dividerTxt}>Or Continue With</Text>
            <View style={styles.line} />
          </View>


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
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      }
    : { elevation: 6 };

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },

 
  scroll: { minHeight: '100%', paddingBottom: 24 },

  
  heroCard: {
    marginTop: 9,
    marginHorizontal: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 42,
    borderBottomRightRadius: 42,
    paddingVertical: 42,
    height: 247,
    width:430,
    alignItems: 'center',
    ...SHADOW,
  },
  heroTitle: {
   color: '#B84953',             
    fontFamily: 'PlayfairDisplay-ExtraBold', 
    fontWeight: '800',              
    fontSize: 34,                
    lineHeight: 34,                 
    letterSpacing: 0.68,            
    textAlign: 'center',
    marginBottom: 0,
     position: 'absolute',
    width: 285,
    height: 50,
    top: 76,
    left: 72,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroSub: 
     {
    position: 'absolute',
    width: 298,
    height: 66,
    top: 131,
    left: 66,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    alignItems: 'center',
    justifyContent: 'center',
     color: '#AD7373',
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: 0.52,
    textAlign: 'center',
  },

  form: { marginTop: 50, paddingHorizontal: 18 },

  inputWrap: {
    backgroundColor: colors.white1,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 68,
    width:374,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#989696',
    ...SHADOW,
  },
  input: {
    flex: 1,
    color: colors.textDark,
    fontSize: 15,
    marginRight: 10,
  },


  forgotWrap: {
     alignSelf: 'flex-end', 
     marginTop: 4, 
     marginBottom: 14
     },
  forgot: { 
    color: '#CC3D3D',
     textDecorationLine: 'underline', 
     fontSize: 16
     },


  loginBtn: {
    backgroundColor: '#f51a2cff',
    height: 61,
    width:374,
    borderRadius: 16,
    paddingHorizontal:32,
    paddingVertical:16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    ...SHADOW,
  },
  loginTxt: { color: '#ffffff', fontSize: 24, fontWeight: '800', },


  dividerRow: {
    marginTop: 40,
    alignItems: 'center',
    flexDirection: 'row',


  },
  line: { 
    flex: 1, 
    height: 1, 
    backgroundColor: '#6C6C6C'
 },
  dividerTxt: {
    color: '#6C6C6C',
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 15,
  },


  
  socialRow: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  socialBtn: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: colors.white1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFE2E2',
    ...SHADOW,
  },

  footer: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.textMid,
    fontSize: 16,
  },
  register: { 
    color: '#DB3C3C', 
    fontWeight: '600' 
},
});