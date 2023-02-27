import { createContext, useEffect, useState } from "react";
import { getAuth, signInAnonymously, onAuthStateChanged} from 'firebase/auth'
import { db, getCategories, getProducts, getCart } from "./firebase/firebase";
import {doc, setDoc, addDoc, deleteDoc, getDocs, collection, query, where} from 'firebase/firestore'
import { useLocation } from "react-router";



export const AppContext = createContext({
    user: '',
    setUser: () => {},
    cart: {},
    setCart: () => {},
    fetchCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    checkoutCart: () => {},
    categories: [],
    setCategories: () => {},
    products: [],
    setProducts: () => {},
    checkedOut: '',
    setCheckedOut: () => {},
})


const AppProvider = ({children}) => {
    const [user, setUser] = useState()
    const [cart, setCart] = useState({})
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [checkedOut, setCheckedOut] = useState(false)

    const fetchProducts = async () => {
        let arr = []
        let data = await getProducts()
        data.forEach((p) => {
          arr.push(p.data())
        })
        setProducts(arr)
    }
    const fetchCategories = async () => {
        let arr = []
        let data = await getCategories()
        data.forEach((c) => {
            arr.push(c.data().name)
        })
        setCategories(arr)
    }

    const fetchCart = async () => {
        let data = await getCart(user)
        setCart(data.data())
    }

    const addToCart = async (user, product, qty) => {
        const cartRef = collection(db, 'carts', user, 'pending')
        const q = query(cartRef, where('checkedOut', '==', false))
        const snap = await getDocs(q)
        let data = {}
        if (!snap.empty) {
            snap.forEach(async (snap) => {
                let i = snap.data().products.findIndex((p) => p.id === product)
                if (i !== -1) {
                    let q = snap.data().products[i].qty
                    let arr = [...snap.data().products]
                    arr[i].qty = q + qty
                    data = {products: arr}
                } else {
                    data = {products: [...snap.data().products, {id: product, qty: qty}]}
                }
                await setDoc(doc(db, 'carts', user, 'pending', snap.id), data, {merge: true})
            })
        } else {
            data = {
                user: user,
                products: [{id: product, qty: qty}],
                paid: false,
                pmtType: null,
                billing: {
                    name: '',
                    email: '',
                    phone: null,
                },
                shipping: {
                    address: '',
                    code: '',
                    city: '',
                    country: ''
                },
                checkedOut: false,
            }
            console.log(data)
            await addDoc(collection(db, 'carts', user, 'pending'), data)
        }
        const newSnap = await getDocs(cartRef)
        newSnap.forEach(snap => {
            setCart(snap.data())
        })
    }

    const removeFromCart = async (user, product, qty) => {
        const cartRef = collection(db, 'carts', user, 'pending')
        const q = query(cartRef, where('checkedOut', '==', false))
        const snap = await getDocs(q)
        snap.forEach(async(snap) => {
            let arr = [...snap.data().products]
            let data = {}
            if (qty !== 'all') {
                let i = snap.data().products.findIndex(p => p.id === product)
                let q = snap.data().products[i].qty
                arr[i].qty = q - qty
                if (arr[i].qty === 0) {
                    arr.splice(i, 1)
                }
                data = {products: arr}
            } if (qty === 'all') {
                let i = snap.data().products.findIndex(p => p.id === product)
                arr.splice(i, 1)
                data = {products: arr}
            }
            await setDoc(doc(db, 'carts', user, 'pending', snap.id), data, {merge: true})
        })
        const newSnap = await getDocs(cartRef)
        newSnap.forEach((snap) => {
            setCart(snap.data())
        })
    }

    const checkoutCart = async (user, pmtType, billing, shipping) => {
        const cartRef = collection(db, 'carts', user, 'pending')
        const q = query(cartRef, where('checkedOut', '==', false))
        const snap = await getDocs(q)
        snap.forEach(async(snap) => {
            let paid = ''
            if (pmtType === '1') {
                paid = true
            }
            if (pmtType === '2') {
                paid = false
            }
            let data = {
                user: user,
                products: [...snap.data().products],
                paid: paid,
                pmtType: pmtType,
                billing: billing,
                shipping: shipping,
                checkedOut: true,
            }
            await setDoc(doc(db, 'carts', user, 'complete', snap.id), data)
            await deleteDoc(doc(db, 'carts', user, 'pending', snap.id))
            setCheckedOut(true)
            setCart([])
        })
    }

    useEffect(() => {
        const auth = getAuth()
        signInAnonymously(auth).then(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user.uid)
                } else {
                    console.log('No user')
                } 
            })
        }).catch(err => {
            console.error(err)
        })
        fetchProducts()
        fetchCategories()
    }, [])


    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                cart,
                setCart,
                fetchCart,
                addToCart,
                removeFromCart,
                checkoutCart,
                categories,
                setCategories,
                products,
                setProducts,
                checkedOut,
                setCheckedOut,
            }}>
                {children}
            </AppContext.Provider>
    )
}

export default AppProvider
