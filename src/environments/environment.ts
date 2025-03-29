export const environment = {
    production: false,
    apiUrl: 'http://localhost:5000/api', // Your local backend URL
    firebaseConfig: {
      apiKey: "YOUR_FIREBASE_API_KEY",
      authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
      projectId: "YOUR_FIREBASE_PROJECT_ID",
      storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
      messagingSenderId: "YOUR_FIREBASE_SENDER_ID",
      appId: "YOUR_FIREBASE_APP_ID"
    },
    stripePublicKey: "YOUR_STRIPE_PUBLIC_KEY", // If using Stripe
    paypalClientId: "YOUR_PAYPAL_CLIENT_ID", // If using PayPal
    defaultPageSize: 12,
    currency: 'USD',
    currencySymbol: '$',
    features: {
      socialLogin: true,
      wishlist: true,
      productCompare: true,
      reviews: true
    }
  };