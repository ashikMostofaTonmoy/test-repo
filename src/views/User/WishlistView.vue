<template>
    <main-header />
    <sub-header heading="Wishlist" :subHeading="`${products.length} items in your wishlist`" />
    <section v-if="loading" class="cart-section">
        <div class="container">
            <section v-if="products.length">
                <div class="cart-details">
                    <table class="min-w-full table-auto">
                        <thead>
                            <tr>
                                <td class="text-left">Image</td>
                                <td class="text-left">Product</td>
                                <td class="text-left">Action</td>
                                <td class="text-left">Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in products" :key="index">
                                <td class="text-left">
                                    <img
                                        :src="item.image"
                                        :alt="item.brand"
                                        class="img"
                                    />
                                </td>
                                <td class="text-left">
                                    {{ item.name }}
                                </td>
                                <td class="text-left">
                                    <button class="text-white bg-black px-6 py-2 rounded shadow" @click="$router.push('/cart/' + item.id)">View Product</button>
                                </td>
                                <td class="py-2 text-center flex justify-center items-center">
                                    <svg
                                        @click="deleteItem(index)"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-x-circle delete-btn mt-5"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                        />
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                        />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <div class="no-cart mb-5" v-else>
                <div class="no-cart-text flex flex-col items-center">
                    <img
                        src="@/assets/images/empty-cart.svg"
                        alt="empty-cart"
                    />
                    <h3>Your wishlist is empty!</h3>
                    <p>Browse our shop and discover our latest products.</p>
                </div>
                <router-link class="mb-5" to="/shop">
                    <action-button btnvalue="Start Shopping" />
                </router-link>
            </div>
        </div>
    </section>
    <product-preloader type="inline" v-else>
            Loading products...
    </product-preloader>

    <main-footer />
</template>

<script>
import SubHeader from "@/components/SubHeader.vue";
import ActionButton from "@/components/ActionButton.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import CategoryBar from "@/components/CategoryBar.vue";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
import { mapState, mapGetters } from "vuex";
import axios from "@/axios";

export default {
    components: { SubHeader, ActionButton, MainHeader, MainFooter, CategoryBar, ProductPreloader },

    name: "WishlistView",
    data() {
        return {
            products: [],

            loading: true,
        };
    },
    methods: {
        async getProduct(id) {
            console.log(id);
            try {
                const response = await axios.get(`/products/${id}`);
                if (!this.products.some(p => p.id === response.data.id)) {
                    this.products.push(response.data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        },
        async loadWishlistProducts() {
            this.products = []; 
            
            try {
                await Promise.all(
                    this.getWishlist.map(item => this.getProduct(item))
                );
            } catch (error) {
                console.error('Error loading wishlist:', error);
            } finally {
                loading = false;
            }
        },
        async deleteItem(index) {
            this.getWishlist.splice(index, 1);
        },
    },
    computed: {
        ...mapState(["wishlist"]),
        ...mapGetters(["getWishlist"]),
    },
    mounted() {
        this.loadWishlistProducts();
    },
    watch: {
        wishlist: {
            handler() {
                this.loadWishlistProducts();
            },
            deep: true,
        },
    },
};
</script>

<style scoped>
.color-circle {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #ddd;
    margin-bottom: 0.5rem;
}

.color-container {
    display: flex;
    justify-content: center;
    align-items: center;
}


.no-cart {
    display: grid;
    place-items: center;
    gap: 30px;
}

.no-cart-text {
    text-align: center;
}

.no-cart img {
    height: 150px;
    width: 30%;
}

.cart-details {
    overflow-x: auto;
}
.img {
    height: 70px;
    width: 70px;
    margin-inline: auto;
    object-fit: contain;
}

table {
    border-collapse: collapse;
    white-space: nowrap;
    width: 100%;
}
td {
    font-size: 2rem;
}

.delete-btn {
    cursor: pointer;
}

.cart-details table thead {
    border: 1px solid lightgrey;
    border-left: none;
    border-right: none;
}

.cart-details table thead tr td {
    font-weight: 600;
    text-transform: uppercase;
    padding-block: 2rem;
    text-align: center;
}

.cart-details table tbody td {
    padding-block: 2rem;
    text-align: center;
}

.cart-details table tbody td i {
    cursor: pointer;
}

/* Checkout */
.checkout-section {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.coupon {
    width: 40%;
}

form {
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
}

form input {
    width: 100%;
}

.checkout {
    width: 40%;
    padding: 2.5rem;
    border: 1px solid lightgrey;
}

.checkout table {
    margin-bottom: 2rem;
}

.checkout td {
    border: 1px solid lightgrey;
    padding: 0.8rem;
}

@media (max-width: 699px) {
    .cart-details table {
        table-layout: fixed;
    }
    .cart-details table thead td {
        width: 200px;
    }
    .checkout-section {
        flex-direction: column;
        gap: 3rem;
    }
    .checkout,
    .coupon {
        width: 100%;
    }
}
</style>
