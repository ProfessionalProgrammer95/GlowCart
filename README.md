# GlowCart 🛒

GlowCart is a demo **React Native E-Commerce Mobile App** built for showcasing to HR/clients.  
It demonstrates **product listing, product details, wishlist management, and add-to-cart functionality** with a clean UI.

---

## ✨ Features
- Product listing with search and filters
- Product details with images, description, ratings & reviews
- Wishlist ❤️ (toggle heart icon to add/remove)
- Shopping cart 👜
- Persistent navigation flow with `React Navigation`
- Context API for `AuthContext` and `WishlistContext`
- Dummy API integration (`https://dummyjson.com/products`)
- Fully working **Release APK** build for client demonstration

---

## 🛠️ Tech Stack
- **React Native** (Expo Bare Workflow not used, pure RN)
- **React Navigation**
- **Context API** (for Authentication & Wishlist)
- **Axios** (API requests)
- **Vector Icons (Ionicons)**

---

## 📂 Project Structure
GlowCart/
│
├── App.jsx # Entry point
│
├── src/
│ ├── navigation/ # AppNavigator, Stack/Tabs
│ ├── context/ # AuthContext, WishlistContext
│ ├── screens/
│ │ ├── Home.jsx # Product list screen
│ │ ├── ProductDetails.jsx # Product details + Wishlist button
│ │ └── Wishlist.jsx # Wishlist screen
│ └── components/
│ └── ProductCard.jsx # Reusable product card
│
└── android/ # Native Android project (for APK build)



🚀 Getting Started
1. Clone the repo
git clone https://github.com/ProfessionalProgrammer95/GlowCart.git
cd glowcart

2. Install dependencies
npm install

3. Run Metro bundler
npx react-native start

4. Run on Android Emulator/Device
npx react-native run-android

🔑 Keystore Setup (for Signed APK)
Inside android/app/:

keytool -genkeypair -v -storetype JKS -keystore glowcart-release.keystore -alias glowcart -keyalg RSA -keysize 2048 -validity 10000
Add signing config in android/app/build.gradle under signingConfigs.

📦 Building Release APK
Run from android/ folder:
.\gradlew clean assembleRelease

The APK will be generated at:
android/app/build/outputs/apk/release/app-release.apk

🧪 Test APK on Device
adb install -r android/app/build/outputs/apk/release/app-release.apk
If package conflict:

adb uninstall com.glowcart
adb install -r android/app/build/outputs/apk/release/app-release.apk

📤 Deliverable
The file to share is:
android/app/build/outputs/apk/release/app-release.apk


Home Screen
Product Details with Wishlist
Wishlist Screen
Cart Checkout

👨‍💻 Author
Rakshitha V
Role: Frontend Developer Candidate

Purpose: Demo project for HR/Client review
