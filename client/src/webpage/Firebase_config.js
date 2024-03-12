// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx8zhx-C65Y2mCbfr3fyJ3YLDwWP7o_N8",
  authDomain: "phone-91840.firebaseapp.com",
  projectId: "phone-91840",
  storageBucket: "phone-91840.appspot.com",
  messagingSenderId: "837491167109",
  appId: "1:837491167109:web:56ec1a668972347f5fbeec",
  measurementId: "G-TEFJ9PZKGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app