import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyD0m7PlxACESoXpjlzNi4wMVIGAXPsiOTQ",
    authDomain: "book-shop-tues.firebaseapp.com",
    databaseURL: "https://book-shop-tues.firebaseio.com",
    projectId: "book-shop-tues",
    storageBucket: "book-shop-tues.appspot.com",
    messagingSenderId: "176025908678"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();