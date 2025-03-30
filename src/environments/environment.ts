export const environment = {
    production: false,
    apiUrl: 'http://localhost:5000/api', // Your local backend URL
    firebaseConfig : {
      apiKey: "AIzaSyAn8vKY3glQQ4zgtV6APwEuUjbPU0MYeUM",
      authDomain: "ecommerce-app-demo-project.firebaseapp.com",
      projectId: "ecommerce-app-demo-project",
      storageBucket: "ecommerce-app-demo-project.firebasestorage.app",
      messagingSenderId: "378017185622",
      appId: "1:378017185622:web:a08634f8001ac2efc5e0f7"
    },
    stripePublicKey: "YOUR_STRIPE_PUBLIC_KEY", // If using Stripe
    paypalClientId: "YOUR_PAYPAL_CLIENT_ID", // If using PayPal
    defaultPageSize: 12,
    currency: 'INR',
    currencySymbol: '₹',
    features: {
      socialLogin: true,
      wishlist: true,
      productCompare: true,
      reviews: true
    }
  };