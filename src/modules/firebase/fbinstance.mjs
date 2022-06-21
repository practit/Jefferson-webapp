// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
const use_emulators = process.env.DEVELOPMENT_MODE === "1" || process.env.NODE_ENV === "development";
const AUTH_PORT = process.env.AUTH_EMULATOR_PORT || "9099";
const FIRESTORE_PORT = parseInt(process.env.FIRESTORE_EMULATOR_PORT) || 8084;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD1M9-i3J-BGY8Kq21CJUPbshqXtvyLN-M",
	authDomain: "jefferson-abd10.firebaseapp.com",
	projectId: "jefferson-abd10",
	storageBucket: "jefferson-abd10.appspot.com",
	messagingSenderId: "250274327982",
	appId: "1:250274327982:web:a0c83e3c3a0158204dac3f",
	measurementId: "G-NKBYL64MTR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = "No implementado aun" || getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
// Use emulators on development
if (use_emulators) {
	console.warn("Using firebase Emulators!")
	connectAuthEmulator(auth, "http://localhost:"+AUTH_PORT);
	connectFirestoreEmulator(db, "localhost", FIRESTORE_PORT);
}
export { firebaseConfig, app, analytics, db, auth };
