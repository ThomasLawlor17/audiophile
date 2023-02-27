import {initializeApp} from 'firebase/app'
import {getFirestore, setDoc, doc, getDoc, getDocs, collection} from 'firebase/firestore'

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
export const db = getFirestore(app)


export const getProducts = async() => {
    const productRef = collection(db, 'products')
    const productSnap = await getDocs(productRef)
    return productSnap
}

export const getCategories = async() => {
    const categoryRef = collection(db, 'categories')
    const categorySnap = await getDocs(categoryRef)
    return categorySnap
}

export const getCart = async(user) => {
    const cartRef = doc(db, 'carts', user)
    const cartSnap = await getDoc(cartRef)
    return cartSnap
}


// export const getData = (target) => {
//     const dbRef = ref(database, `${target}/`)
//     return get(dbRef).then((snapshot) => {
//         if (snapshot.exists()) {
//             return snapshot.val()
//         } else {
//             console.log('No Data Available')
//         }
//     }).catch((err) => {
//         console.error(err)
//     })
// }

// export const getUser = () => {
//     const auth = getAuth()
//     return signInAnonymously(auth).then(() => {
//         return onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 return user
//             } else {
//             }
//         })
//     }).catch(err => {
//         console.error(err)
//     })
// }

// export const getCart = (user) => {
//     const auth = getAuth()
//     return signInAnonymously(auth).then(() => {
//         return get(ref(database, `carts/${auth.currentUser.uid}`)).then((snapshot) => {
//             if (snapshot.exists()) {
//                 return snapshot.val()
//             }
//         })
//     }).catch(err => {
//         console.error(err)
//     })
// }

// // export const getCart = () => {
// //     const auth = getAuth()
// //     return signInAnonymously(auth).then(() => {
// //         const cartRef = ref(database, `carts/${auth.currentUser.uid}`)
// //         return onValue(cartRef, (snapshot) => {
// //             const data = snapshot.val()
// //             console.log(data)
// //             return data
// //         })
// //     })
// // }

// export const updateCart = (itemId, method, qty) => {
//     const auth = getAuth()
//     signInAnonymously(auth).then(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 get(ref(database, `carts/${user.uid}`)).then((snapshot) => {
//                     if (snapshot.exists()) {
//                         if (method === ('add' || 'reduce')) {
//                             const a = Object.values(snapshot.val().items)
//                             const b = a.map(a => {
//                                 return a.order
//                             }).sort((a, b) => b - a)
//                             const highestOrder = b[0]
//                             get(ref(database, `carts/${user.uid}/items/${itemId}`)).then(snapshot => {
//                                 if (snapshot.exists()) {
//                                     if (method === 'reduce' && snapshot.val().quantity === 1) {
//                                         remove(ref(database, `carts/${user.uid}/items/${itemId}`))
//                                     }
//                                     update(ref(database, `carts/${user.uid}/items/${itemId}`), {
//                                         quantity: snapshot.val().quantity + qty
//                                     })
//                                 } else {
//                                     update(ref(database, `carts/${user.uid}/items`), {
//                                         [itemId] : {
//                                             item: itemId,
//                                             quantity: qty,
//                                             order: highestOrder + 1
//                                         }
//                                     })
//                                 }
//                             })
//                         } if (method === 'delete') {
//                             remove(ref(database, `carts/${user.uid}/items/${itemId}`))
//                         } if (method === 'get') {
//                             return snapshot.val()
//                         }
//                     } else {
//                         const cartRef = ref(database, 'carts/')
//                         set(cartRef, {
//                             [user.uid]: {
//                                 user: user.uid,
//                                 items: {[itemId] : {item: itemId, quantity: qty, order: 1}},
//                                 paid: false,
//                             }                    
//                         })
//                     }
//                 })
//             }
//         })
//     }).catch((err) => {
//         console.error(err)
//     })
// }

