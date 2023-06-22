import { initializeApp } from 'firebase/app';
import 'firebase/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAdi9vJjjsZbkTAOVHHF__7M7MhplMmta0',
	authDomain: 'storeshop-6967a.firebaseapp.com',
	projectId: 'storeshop-6967a',
	storageBucket: 'storeshop-6967a.appspot.com',
	messagingSenderId: '497365227626',
	appId: '1:497365227626:web:db60de3849d267d3281213',
	measurementId: 'G-TQRHBBL6S2',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage
