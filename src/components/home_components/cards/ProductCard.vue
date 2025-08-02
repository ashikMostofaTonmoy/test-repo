<template>
    <div class="product__card shadow-sm">
        <!-- <img :src="image_url" :alt="brand" class="product__image" loading="lazy" /> -->
        <div class="relative group">
            <img :src="image_url" :alt="brand" class="product__image transition-all duration-300" loading="lazy" />
            
            <!-- Black overlay on hover -->
            <div @click="$router.push('/cart/' + productId)" class="absolute inset-0"></div>

            <!-- Wishlist icon (Bottom Center) -->
            <div class="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="flex items-center space-x-2">
                    <button @click="addToWishlist(productId)" class="p-2 bg-white rounded-md shadow-md hover:bg-gray-200 transition">
                        <img 
                            :src="isInWishlist ? 'https://www.next.co.uk/static-content/icons/header/next/v2/vision/favourites-active-large.svg' : 'https://www.next.co.uk/static-content/icons/header/next/v2/vision/favourites-inactive-large.svg'"
                            alt="love" 
                            class="w-8 h-8"
                        >
                    </button>                    
                    <button @click.stop="openQuickView" class="p-2 bg-white rounded-md shadow-md hover:bg-gray-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- <div class="product__header">
            <span class="brand">{{ brand }}</span>
            <span v-if="!in_stock" class="product__qty">
                {{ in_stock ? "In Stock" : "Out of Stock" }}
            </span>
        </div> -->
        <div class="p-3">
            <p class="product__name text-md ">{{ productName }}</p>
            <div class="price">
                <span class="mr-4">{{ formattedPrice }}</span>
                <span class="rating">
                    <i v-for="rating in ratings" :key="rating" class="fas fa-star"></i>
                </span>
            </div>
        </div>

        <QuickViewModal 
            :show="showQuickView"
            :product="{
                id: productId,
                name: productName,
                price: formattedPrice,
                image: image_url,
                brand: brand,
                ratings: ratings,
                in_stock: in_stock
            }"
            @close="showQuickView = false"
        />

    </div>
</template>

<script>
import QuickViewModal from "./QuickViewModal.vue";
import {
    Heart as HeartIcon,
} from 'lucide-vue-next'

export default {
    name: "ProductCard",
    components: {
        QuickViewModal,
    },
    data() {
        return {
            showQuickView: false,
        };
    },
    props: [
        "productId",
        "image_url",
        "brand",
        "productName",
        "price",
        "currency",
        "ratings",
        "in_stock",
    ],
    methods: {
        addToWishlist(productId) {
            // check if the product is already in the wishlist
            if (!this.$store.getters.getWishlist.some(item => item === productId)) {
                this.$store.dispatch("add_to_wishlist", productId);
            }
        },
        openQuickView() {
            this.showQuickView = true;
        },
    },
    computed: {
        formattedPrice() {
            return this.currency + " " + this.price;
        },
        isInWishlist() {
            return this.$store.getters.getWishlist.some(item => item === this.productId);
        },
    },
};
</script>

<style scoped>
.product__card {
    /* border: 1px solid var(--grey); */
    /* box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); */
    transition: transform 0.05s ease-in;
    /* padding: 15px; */
    text-align: left;
    /* border-radius: 10px; */
    color: #222;
    cursor: pointer;
}

.product__image {
    height: auto;
    max-width: 100%;
    border-radius: 3px;
}

.product__name {
    font-size: 1.4rem;
    font-weight: 500;
    padding-block: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: black;
}

.product__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
}

.brand {
    font-size: 1.4rem;
    display: inline-block;
    font-weight: 700;
}

.product__qty {
    font-size: 1.2rem;
    display: inline-block;
    padding-top: 6px;
    background-color: var(--dark-green);
    color: white;
    border-radius: 6px;
    padding: 6px;
}

.rating {
    padding-bottom: 5px;
    color: rgb(0, 0, 0);
}

.rating i {
    font-size: 1.4rem;
}

.price {
    display: flex;
    align-items:start;
    justify-content: start;
}

.price span {
    font-size: 1.4rem;
    font-weight: 700;
}

.cart {
    cursor: pointer;
    height: 35px;
    width: 35px;
    color: var(--dark-green);
    border-radius: 50%;
    font-size: 1.9rem;
    display: grid;
    place-items: center;
    text-align: center;
    background-color: var(--light-green);
}
</style>
