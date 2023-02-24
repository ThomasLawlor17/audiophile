import {initializeApp} from 'firebase/app'
import {getDatabase, ref, get} from 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MS_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}
const app = initializeApp(firebaseConfig)

export const database = getDatabase(app)

export const getData = (target) => {
    const dbRef = ref(database, `${target}/`)
    return get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val())
            return snapshot.val()
        } else {
            console.log('No Data Available')
        }
    }).catch((err) => {
        console.error(err)
    })
}

