import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state: {
        user: null,
        accessToken: null,
        refreshToken: null,
        cart: [],
        wishlist: [],
        products: [],
        coupon: [],
        total: 0,
    },
    mutations: {
        // loginUser(state, payload) {
        //     state.user = payload.user;
        //     state.accessToken = payload.access;
        //     state.refreshToken = payload.refresh;
        // },
        loginUser(state, payload) {
            state.user = payload.user || payload;  // Ensure proper assignment
            state.accessToken = payload.access || payload.accessToken || null;
            state.refreshToken = payload.refresh || payload.refreshToken || null;
        },
        logoutUser(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.cart = [];
        },
        addToCart(state, payload) {
            if (state.cart.length > 0) {
                // Find an item in the cart with the same _id, size, and color
                let existingItem = state.cart.find(
                    (item) =>
                        item._id === payload._id &&
                        item.size === payload.size &&
                        item.color === payload.color
                );
        
                // If a matching item is found
                if (existingItem) {
                    // If the item's quantity is less than 101, increase the quantity
                    existingItem.quantity += payload.quantity;
                }
                // If no matching item is found, add the new item to the cart
                else {
                    state.cart = [...state.cart, payload];
                }
            }
            // If the cart is empty, add the item
            else {
                state.cart = [...state.cart, payload];
            }
        },
        addToWishlist(state, payload) {
            // check if the product is already in the wishlist
            if (!state.wishlist.some(item => item === payload)) {
                state.wishlist = [...state.wishlist, payload];
            }
        },
        removeFromWishlist(state, payload) {
            // find the index of the item in the wishlist
            const index = state.wishlist.findIndex(item => item === payload);
            if (index !== -1) {
                state.wishlist.splice(index, 1);
            }
        },
        deleteItem(state, index) {
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        updateQuantity(state, payload) {
            // increase the quantity of the item in the cart
            if (payload.quantity > 0) {
                let item = state.cart.find(
                    (item) =>
                        item._id === payload._id && item.size === payload.size
                );
                item.quantity = payload.quantity;
            }
        },
        emptyCart(state) {
            state.cart = [];
        },
        setProducts(state, payload) {
            state.products = payload;
        },
        setTotal(state, payload) {
            state.total = payload;
        },
        setCoupon(state, payload) {
            state.coupon = payload;
        },
    },
    actions: {
        set_user(context, payload) {
            context.commit("loginUser", payload);
        },
        remove_user(context) {
            context.commit("logoutUser");
        },
        add_to_cart(context, payload) {
            context.commit("addToCart", payload);
        },
        add_to_wishlist(context, payload) {
            context.commit("addToWishlist", payload);
        },
        remove_from_wishlist(context, payload) {
            context.commit("removeFromWishlist", payload);
        },
        delete_item(context, payload) {
            context.commit("deleteItem", payload);
        },
        update_quantity(context, payload) {
            context.commit("updateQuantity", payload);
        },
        clear_cart(context) {
            context.commit("emptyCart");
        },
        set_products(context, payload) {
            context.commit("setProducts", payload);
        },
        set_total(context, payload) {
            context.commit("setTotal", payload);
        },
        set_coupon(context, payload) {
            context.commit("setCoupon", payload);
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.accessToken,
        getUser: (state) => state.user,
        getAccessToken: (state) => state.accessToken,
        subtotal: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
        total: (state) => state.total,
        getCoupon: (state) => state.coupon,
        getHash: (state) => {
            if (state.user && state.user.email) {
                var md5 = require("blueimp-md5/js/md5");
                return `https://www.gravatar.com/avatar/` + md5(state.user.email) + `?d=mp`;
            }
            return "";
        },
        getProducts: (state) => state.products,
        getWishlist: (state) => state.wishlist,
    },    
    plugins: [
        createPersistedState({
            storage: window.localStorage, // Ensure it persists in localStorage
        }),
    ],
});

//export store
export default store;
