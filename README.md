🌸 GlowCart – Beauty E-commerce App

GlowCart is a minimal cosmetic e-commerce mobile application built with React Native CLI. It replicates the provided Figma design while integrating a real product API. The project demonstrates modern mobile app development practices including navigation, API integration, reusable components, and clean UI/UX.

🚀 Features
🔐 Authentication

Onboarding Screen → Brand logo, tagline, and "Get Started" button.

Login Screen → Email/password fields, "Forgot password", social login UI.

Register Screen → Full name, email, password, confirm password fields with validation.

🛍️ Shopping Flow

Home/Product List Screen

Fetches products from DummyJSON API.

Search bar with live filtering.

Grid product cards with image, title, price, and wishlist icon.

Bottom Tab Navigation with Home, Offers, Wishlist, Profile.

Product Details Screen

Large product image with favorite/share.

Title, description, ratings, price + discount.

"Add to Bag" button.

Highlights section (dimensions, warranty, shipping).

Ratings & reviews with mock data.

Profile Screen

Mock user info.

Menu items: Address, Order History, Language, Notifications, Contact Us, Privacy, T&C.

Logout option.

⚙️ Technical Highlights

React Native CLI setup (npx react-native init GlowCart).

React Navigation for stack + bottom tabs.

Axios for API requests.

Context API (AuthContext) for login/register/logout state.

Reusable components: Button, Header, ProductCard.

FlatList for efficient product rendering.

Styled with StyleSheet API and platform-specific shadows.

Works on both Android & iOS.

📱 Screens

Onboarding

Login

Register

Home/Product List

Product Details

Profile

🛠️ Installation & Run
Prerequisites

Node.js, npm

Android Studio (for emulator)

Xcode (for iOS, Mac only)

Clone & Install
git clone https://github.com/<your-username>/GlowCart.git
cd GlowCart
npm install

Run Metro Bundler
npx react-native start

Run on Android
npx react-native run-android

Run on iOS
cd ios && pod install && cd ..
npx react-native run-ios

📂 Project Structure
GlowCart/
 └── src/
     ├── api/          # API calls (products.js)
     ├── components/   # Reusable UI (Button, Header, ProductCard)
     ├── context/      # AuthContext.js
     ├── navigation/   # AppNavigator, HomeTabs
     └── screens/      # Onboarding, Login, Register, Home, ProductDetails, Profile

🧑‍💻 Developer Notes

State Management → Context API used for authentication.

Dynamic Data → Products fetched from DummyJSON API.

UI Replication → Colors, fonts, and layout match provided Figma.

Known Limitations →

No real backend authentication (mocked with context).

Cart & Orders are placeholders.

Social login buttons are UI only.