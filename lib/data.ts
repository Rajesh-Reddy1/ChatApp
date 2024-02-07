export type msg = {
    sender: string,
    receiver: string,
    content: string,
    timestamp: number
}

import { randomUUID } from "crypto";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBbC2K7VyH059BoDoqmbaC0xSdwKJ6lOa8",
  authDomain: "chatapp-bde1a.firebaseapp.com",
  databaseURL: "https://chatapp-bde1a-default-rtdb.firebaseio.com",
  projectId: "chatapp-bde1a",
  storageBucket: "chatapp-bde1a.appspot.com",
  messagingSenderId: "665919633249",
  appId: "1:665919633249:web:bc853edb624519b0827720"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
