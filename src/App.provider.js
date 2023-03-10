import { createContext, useEffect, useState } from "react";
import { getAuth, signInAnonymously, onAuthStateChanged} from 'firebase/auth'
import { db, getCategories, getProducts, getCart } from "./firebase/firebase";
import {doc, setDoc, addDoc, deleteDoc, getDocs, collection, query, where} from 'firebase/firestore'



export const AppContext = createContext({
    width: '',
    user: '',
    setUser: () => {},
    cart: {},
    setCart: () => {},
    fetchCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    checkoutCart: () => {},
    cartOpen: '',
    setCartOpen: () => {},
    itemAdded: '',
    setItemAdded: () => {},
    categories: [],
    setCategories: () => {},
    products: [],
    setProducts: () => {},
    checkedOut: '',
    setCheckedOut: () => {},
    checkoutSummary: '',
    setCheckoutSummary: () => {},
    splitProductName: () => {},
    getItemCategory: () => {},
})


const AppProvider = ({children}) => {
    const [width, setWidth] = useState(getWindowWidth())
    const [user, setUser] = useState()
    const [cart, setCart] = useState({})
    const [cartOpen, setCartOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [checkedOut, setCheckedOut] = useState(false)
    const [checkoutSummary, setCheckoutSummary] = useState([])

    function getWindowWidth() {
        const width = window.innerWidth
        return width
    }

    useEffect(() => {
        function handleResize() {
            setWidth(getWindowWidth())
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [setWidth])

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

    const fetchCart = async (id) => {
        let data = await getCart(id)
        setCart(data.products)
    }

    const addToCart = async (user, product, qty) => {
        const productRef = collection(db, 'products')
        const productQ = query(productRef, where('id', '==', product))
        const p = await getDocs(productQ)
        let price = ''
        let slug = ''
        p.forEach(p => {
            price = p.data().price
            slug = p.data().slug
        })
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
                    data = {products: [...snap.data().products, {id: product, qty: qty, price: price, slug: slug}]}
                }
                await setDoc(doc(db, 'carts', user, 'pending', snap.id), data, {merge: true})
            })
        } else {
            data = {
                user: user,
                products: [{id: product, qty: qty, price: price, slug: slug}],
                subtotal: '',
                shipping: '',
                tax: '',
                total: '',
                paid: false,
                payment: {
                    pmtType: null,
                    emNo: '',
                    emPin: '',
                },
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
            await addDoc(collection(db, 'carts', user, 'pending'), data)
        }
        const newSnap = await getDocs(cartRef)
        newSnap.forEach(snap => {
            setCart(snap.data().products)
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
                let arr = []
                data = {products: arr}
            }
            await setDoc(doc(db, 'carts', user, 'pending', snap.id), data, {merge: true})
        })
        const newSnap = await getDocs(cartRef)
        newSnap.forEach((snap) => {
            setCart(snap.data().products)
        })
    }

    const checkoutCart = async (user, payment, billing, shipping) => {
        const cartRef = collection(db, 'carts', user, 'pending')
        const q = query(cartRef, where('checkedOut', '==', false))
        const snap = await getDocs(q)
        snap.forEach(async(snap) => {
            let paid = ''
            if (payment.pmtType === '1') {
                paid = true
            }
            if (payment.pmtType === '2') {
                paid = false
            }
            let subtotal = snap.data().products.map(p => p.qty * p.price).reduce((a, b) => a + b)
            let data = {
                user: user,
                products: [...snap.data().products],
                subtotal: subtotal,
                shipping: 50,
                tax: subtotal * 0.2,
                total: subtotal + 50,
                paid: paid,
                payment: payment,
                billing: billing,
                shipping: shipping,
                checkedOut: true,
            }
            await setDoc(doc(db, 'carts', user, 'complete', snap.id), data)
            await deleteDoc(doc(db, 'carts', user, 'pending', snap.id))
            setCheckedOut(true)
            setCheckoutSummary([...cart])
            setCart([])
        })
    }

    const splitProductName = (name, category) => {
        let arr = name.split(category === 'speakers' ? 'Speaker' : category.charAt(0).toUpperCase() + category.slice(1))
        return (
          <h2>{arr[0]}<br/>{category === 'speakers' ? 'speaker' : category}</h2>
        )
    }
    const getItemCategory = (slug) => {
        let product = products.find(product => product.slug === slug)
        return product.category
    }


    useEffect(() => {
        const auth = getAuth()
        signInAnonymously(auth).then(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user.uid)
                    fetchCart(user.uid)
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
                width,
                user,
                setUser,
                cart,
                setCart,
                fetchCart,
                addToCart,
                removeFromCart,
                checkoutCart,
                cartOpen,
                setCartOpen,
                categories,
                setCategories,
                products,
                setProducts,
                checkedOut,
                setCheckedOut,
                checkoutSummary,
                setCheckoutSummary,
                splitProductName,
                getItemCategory,
            }}>
                {children}
            </AppContext.Provider>
    )
}

export default AppProvider
