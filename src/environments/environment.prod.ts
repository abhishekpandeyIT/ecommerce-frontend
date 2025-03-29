export const environment = {
    production: true,
    apiUrl: 'https://your-production-api.com/api', // Your production backend URL
    firebaseConfig: {
      apiKey: "YOUR_PROD_FIREBASE_API_KEY",
      authDomain: "YOUR_PROD_FIREBASE_AUTH_DOMAIN",
      projectId: "YOUR_PROD_FIREBASE_PROJECT_ID",
      storageBucket: "YOUR_PROD_FIREBASE_STORAGE_BUCKET",
      messagingSenderId: "YOUR_PROD_FIREBASE_SENDER_ID",
      appId: "YOUR_PROD_FIREBASE_APP_ID"
    },
    stripePublicKey: "YOUR_PROD_STRIPE_PUBLIC_KEY",
    paypalClientId: "YOUR_PROD_PAYPAL_CLIENT_ID",
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