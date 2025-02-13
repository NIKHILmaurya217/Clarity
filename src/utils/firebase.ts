import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import FirebaseOptions

const firebaseConfig: any = {
    apiKey: "AIzaSyB7s7xPUnucIz4Rzc191mTJJx6UvtYNhOY",
    authDomain: "clarity-003.firebaseapp.com",
    projectId: "clarity-003",
    storageBucket: "clarity-003.firebasestorage.app",
    messagingSenderId: "430627197761",
    appId: "1:430627197761:web:338409c0b836367a5947c0",
    measurementId: "G-V0YGFNBZNT"
      }

const  initializeAppTask = (()=> {
    const app = initializeApp(firebaseConfig); // Use the config object    
    const auth = getAuth(app);
    return auth
}) 

export { initializeAppTask };