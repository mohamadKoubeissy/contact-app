import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export class Environment {
  static firebase = {
    apiKey: "AIzaSyCohgzTHMTrRb2WGu3Ak7cNCw08BvuBBWQ",
    authDomain: "contact-app-8ff5a.firebaseapp.com",
    projectId: "contact-app-8ff5a",
    storageBucket: "contact-app-8ff5a.appspot.com",
    messagingSenderId: "1081231309903",
    appId: "1:1081231309903:web:3f62796f3bc18a6d23fe3a",
    measurementId: "G-L44EW0VZQR"
  }

  // Initialize Firebase
  /* app = initializeApp(Environment.firebaseConfig);
  analytics = getAnalytics(this.app); */


}
