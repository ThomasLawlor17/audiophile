import { createContext, useEffect, useState } from "react";
import { getAuth, signInAnonymously, onAuthStateChanged} from 'firebase/auth'
import { db, getCategories, getProducts, getCart } from "./firebase/firebase";
import {doc, setDoc, getDoc, onSnapshot} from 'firebase/firestore'



export const AppContext = createContext({
    user: '',
    setUser: () => {},
    cart: {},
    setCart: () => {},
    fetchCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    categories: [],
    setCategories: () => {},
    products: [],
    setProducts: () => {},
})


const AppProvider = ({children}) => {
    const [user, setUser] = useState()
    const [cart, setCart] = useState({})
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

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
        const cartRef = doc(db, 'carts', user)
        const snap = await getDoc(cartRef)
        let data = {}
        if (snap.exists()) {
            let i = snap.data().products.findIndex((p) => p.id === product)
            if (i !== -1) {
                let q = snap.data().products[i].qty
                let arr = [...snap.data().products]
                arr[i].qty = q + qty
                data = {products: arr}
            } else {
                data = {products: [...snap.data().products, {id: product, qty: qty}]}
            }
        } else {
            data = {
                user: user,
                products: [...snap.data().products, {id: product, qty: qty}],
                paid: false,
            }
        }
        await setDoc(cartRef, data, {merge: true})
        const newSnap = await getDoc(cartRef)
        setCart(newSnap.data())
    }

    const removeFromCart = async (user, product, qty) => {
        const cartRef = doc(db, 'carts', user)
        const snap = await getDoc(cartRef)
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
        await setDoc(cartRef, data, {merge: true})
        const newSnap = await getDoc(cartRef)
        setCart(newSnap.data())
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
                categories,
                setCategories,
                products,
                setProducts,
            }}>
                {children}
            </AppContext.Provider>
    )
}

export default AppProvider
