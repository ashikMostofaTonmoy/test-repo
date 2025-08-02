<template>
    <main-header />
    <section class="container p-3">
        <router-link to="/shop" class="mt-2" id="back"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg></router-link>
        <div class="cart-item" v-if="loaded">
            <div class="image-section mt-5">
                <img :src="activeImage" class="main-img rounded-lg" />
                <div class="img-thumbnails">
                    <img :src="product.image" class="thumbnail rounded-lg" @click="setActiveImage(product.image)" />
                    <img v-for="(image, index) in product.gallery" :key="index" :src="image.image"
                        class="thumbnail rounded-lg" @click="setActiveImage(image.image)" />
                </div>
            </div>
            <div class="product-details p-10 bg-white rounded-lg shadow-md">
                <div class="breadcrumbs text-sm text-gray-500 mb-4">
                    <span>Home / </span>
                    <span class="font-semibold text-gray-700">{{ product.category_name }}</span>
                </div>

                <h4 class="text-3xl font-bold text-gray-800 mb-2">{{ product.name }}</h4>
                <h4 class="text-3xl font-bold text-gray-800 mb-2">{{ formattedPrice }}</h4>

                <div class="color-selector mb-2">
                    <h4 class="text-xl font-semibold text-gray-800 mb-2">Select Color</h4>
                    <div class="color-options flex gap-4">
                        <div v-for="(color, index) in product.colors" :key="index"
                            class="color-option cursor-pointer p-3 flex items-center justify-center transition-all duration-200 ease-in-out"
                            @click="selectColor(color.hex_code, color.image, color.name)">
                            <div class="color-circle w-10 h-10 border-2 border-gray-100 rounded-full"
                                :class="selectedColor === color.hex_code ? 'w-12 h-12 border-2 border-gray-400' : ''"
                                :style="{ backgroundColor: color.hex_code }"></div>
                            <span class="color-name ml-2 font-medium text-gray-700">{{ color.name }}</span>
                        </div>
                    </div>
                    <p v-if="errorMessage" class="text-red-500 text-xl">{{ errorMessage }}</p>
                    <!-- <p class="text-red-500 text-xs mt-2" v-if="validColor">Please select a color</p> -->
                </div>

                <div class="size-selector mb-5">
                    <h4 class="block text-xl font-semibold text-gray-800 mb-4">Select Size</h4>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="(size, index) in product.size" :key="index" @click="selectSize(size.name)"
                            :class="selectedSize === size.name ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-800 border-gray-300'"
                            class="px-4 py-2 border rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                            {{ size.name }}
                        </button>
                    </div>
                    <p class="text-red-500 text-xs mt-2" v-if="validSize">Please select a size</p>
                </div>


                <div class="add-to-cart mb-2 flex flex-col md:flex-row items-center">
                    <input type="number" placeholder="QTY" min="1" max="100" v-model="quantity" style="font-size: 1.7rem;"
                        class="text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto" />
                    <action-button btnvalue="Add To Cart" @click="addItemToCart"
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out w-full md:w-auto mt-2 md:mt-0" />
                    
                    <router-link v-if="isProductInCart" to="/cart" style="font-size: 1.7rem; padding: 10px 20px; border: 2px solid var(--dim-blue)"
                        class="text-center border border-black text-black ml-2 rounded-lg hover:bg-black hover:text-white transition-all duration-200 ease-in-out w-full md:w-auto mt-2 md:mt-0">View Cart
                    </router-link>
                </div>

                <div class="product-details flex">
                    <h4 class="text-2xl font-semibold text-gray-800">Product Details</h4>
                    <p v-html="sanitizedHtml" class="text-gray-600 leading-relaxed"></p>
                </div>
            </div>

        </div>
        <product-preloader v-else> Loading Product... </product-preloader>


        <div class="p-5">
            <!-- Reviews Header -->
            <p class="text-4xl font-bold text-gray-800 pb-2 border-b border-gray-200">Reviews</p>

            <!-- Add Review Form -->
            <div class="mt-4 mb-5">
                <div class="flex flex-col space-y-2"> <!-- Changed to flex-col for vertical stacking -->
                    <div class="flex items-center">
                        <p class="mr-2 font-semibold">Give Ratings:</p>
                        <div class="flex items-center">
                            <svg v-for="i in 5" :key="`star-${i}`" @click="setRating(i)"
                                class="w-8 h-8 fill-current cursor-pointer"
                                :class="i <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        </div>
                    </div>
                    <textarea v-model="newReview.review" placeholder="Write Your Review Here" rows="4"
                        class="w-full p-2 mb-4 text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button @click="submitReview" style="margin-top: 1rem"
                        class="px-6 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all mt-6 duration-200 ease-in-out text-xl">Add Review</button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mt-5">
                <!-- Left Column - Summary -->
                <div class="bg-gray-50 p-4 rounded-sm">
                    <div class="flex items-center mb-2">
                        <img :src="activeImage" alt="User" class="w-64 rounded-sm mr-3" />
                        <div class="ml-2">
                            <div class="font-bold">4.5 <span class="text-gray-600 font-normal">/ 5</span></div>
                            <div class="flex items-center">
                                <div class="flex">
                                    <svg v-for="i in 4" :key="`full-${i}`" class="w-6 h-6 text-gray-700 fill-current"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <svg class="w-6 h-6 text-gray-800 fill-current" viewBox="0 0 24 24">
                                        <path
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                            fill="currentColor" opacity="0.3" />
                                    </svg>
                                </div>
                                <span class="text-gray-500 ml-1">(159)</span>
                            </div>
                        </div>
                    </div>

                    <div class="font-semibold text-2xl mb-3">Review Summary</div>

                    <div class="space-y-6 mb-5">
                        <div class="flex items-center">
                            <span class="w-full text-xl">5 Stars</span>
                            <span class="text-xl text-gray-800">(127)</span>
                        </div>

                        <div class="flex items-center">
                            <span class="w-full text-xl">4 Stars</span>
                            <span class="text-xl text-gray-800">(19)</span>
                        </div>

                        <div class="flex items-center">
                            <span class="w-full text-xl">3 Stars</span>
                            <span class="text-xl text-gray-800">(7)</span>
                        </div>

                        <div class="flex items-center">
                            <span class="w-full text-xl">2 Stars</span>
                            <span class="text-xl text-gray-800">(3)</span>
                        </div>

                        <div class="flex items-center">
                            <span class="w-full text-xl">1 Stars</span>
                            <span class="text-xl text-gray-800">(3)</span>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Reviews List -->
                <div class="md:col-span-3">
                    <!-- Review Item 1 -->
                    <div v-for="item in reviews" class="border-b border-gray-200 py-4">
                        <div class="flex justify-between">
                            <div>
                                <div class="flex">
                                    <svg v-for="i in 5" :key="`r1-${i}`" class="w-6 h-6 fill-current" :class="i <= item.rating ? 'text-gray-800' : 'text-gray-300'"
                                        viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                </div>
                                <p class="text-gray-600 mt-1">{{ formatDate(item.created_at) }}</p>
                            </div>
                            <div class="text-right">
                                <p class="font-medium">{{item.username}}</p>
                            </div>
                        </div>
                        <p class="text-gray-800">{{ item.review }}</p>
                    </div>
                </div>
            </div>
        </div>

    </section>

    <section class="feature__section">
        <div class="container">
            <relevent-products :featuredProducts="featuredProducts" />
        </div>
    </section>
    <main-footer />
</template>

<script>
import ProductCard from "@/components/home_components/cards/ProductCard.vue";
import ActionButton from "@/components/ActionButton.vue";
import MainHeader from "@/components/MainHeader.vue";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
import MainFooter from "@/components/MainFooter.vue";
import ReleventProducts from "@/components/home_components/products/ReleventProducts.vue";
import CategoryBar from "@/components/CategoryBar.vue";

import DOMPurify from "dompurify";



import { mapActions, mapState, mapGetters } from "vuex";

import axios from "@/axios";

export default {
    name: "CartItemView",
    components: {
        ProductCard,
        ActionButton,
        MainHeader,
        ReleventProducts,
        ProductPreloader,
        MainFooter,
        CategoryBar,
    },
    data() {
        return {
            activeImage: "",
            product: [],
            products: [],
            loaded: false,
            size: "",
            quantity: 1,
            validSize: false,
            selectedColor: '',
            selectedColorName: '',
            validColor: false,
            errorMessage: "",
            validStock: false,
            selectedSize: '',

            reviews: [],

            isProductInCart: false,

            newReview: {
                rating: 0, 
                review: '',
            },
        };
    },
    async created() {
        await this.fetchProductData();
        await this.fetchAllProducts();
    },
    watch: {
        "$route.params.id": {
            immediate: true,
            handler(newId) {
                this.fetchProductData();
                this.resetErrorStates();
            },
        },
    },
    methods: {
        ...mapActions(["add_to_cart"]),
        ...mapActions(["set_products"]),

        setRating(star) {
            this.newReview.rating = star; // Set the selected rating
        },
        submitReview() {
            console.log(this.$route.params.id)
            if (this.newReview.rating && this.newReview.review) {
                axios.post(`/product-reviews/${this.$route.params.id}/`, {
                    rating: this.newReview.rating,
                    review: this.newReview.review,
                    product_id: this.$route.params.id,
                }, {
                    headers: {
                        'Authorization': this.user ? `Bearer ${this.getAccessToken}` : '', // Ensure the token is included here
                    }
                }).then((response) => {
                    this.reviews.push(response.data);
                    this.newReview = { rating: 0, review: '' }; // Reset the form
                }).catch((error) => {
                    console.error("Failed to submit review:", error);
                });
            } else {
                alert("Please fill in both fields.");
            }
        },

        fiveStarCount() {
            return this.reviews.filter(review => review.rating === 5).length;
        },
        fourStarCount() {
            return this.reviews.filter(review => review.rating === 4).length;
        },
        threeStarCount() {
            return this.reviews.filter(review => review.rating === 3).length;
        },
        twoStarCount() {
            return this.reviews.filter(review => review.rating === 2).length;
        },
        oneStarCount() {
            return this.reviews.filter(review => review.rating === 1).length;
        },

        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric'};
            return new Date(dateString).toLocaleString('en-US', options);
        },

        setActiveImage(image) {
            this.activeImage = image;
        },
        handleColorSelection() {
            this.selectedColor = this.product.color;
        },
        selectColor(color, image, colorName) {
            this.selectedColor = color;
            this.activeImage = this.$serverUrl + image;
            this.selectedColorName = colorName;
            this.$emit('color-selected', color);
        },

        selectSize(size) {
            this.selectedSize = size;
            this.validSize = false;
            this.size = size;
        },

        async verifyProductStock() {
            if (this.selectedColor === "") {
                this.errorMessage = "Please select a color";
                return false;
            }
            try {

                let matchingItem = undefined;
                for (const item of this.cartItems) {
                    if (item.id == this.$route.params.id && item.color == this.selectedColor && item.size == this.size) {
                        matchingItem = item;
                    }
                }

                const cartQuantity = matchingItem ? matchingItem.quantity : 0;

                let response = await axios.post("/verify-product-stock/", {
                    product_id: this.$route.params.id,
                    color: this.selectedColor,
                    quantity: this.quantity + cartQuantity,
                });

                if (response.data.valid) {
                    this.validStock = true;
                    this.successMessage = response.data.message;
                    this.errorMessage = "";
                } else {
                    this.validStock = false;
                    this.successMessage = "";
                    this.errorMessage = response.data.error;
                }

                return this.validStock; // Ensure we return the result
            } catch (error) {
                console.error("Stock verification failed:", error);
                this.validStock = false;
                this.successMessage = "";
                this.errorMessage = "Failed to verify stock.";
                return false;
            }
        },

        async addItemToCart() {
            const stockAvailable = await this.verifyProductStock();
            if (!stockAvailable) return;
            if (this.selectedColor === "") {
                this.validColor = true;
            } else if (this.size === "Select Size") {
                this.validSize = true
            } else {
                let item = {
                    ...this.product,
                    quantity: this.quantity,
                    size: this.size,
                    color: this.selectedColor,
                    colorName: this.selectedColorName,
                };
                this.add_to_cart(item);
                this.isProductInCart = true;
                this.validColor = false;
                this.validSize = false;
            }
        },
        async fetchProductData() {
            try {
                let res = await axios.get(`/products/${this.$route.params.id}/`);
                this.product = res.data;
                this.loaded = true;
                this.activeImage = this.product.image;
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        },
        async fetchAllProducts() {
            try {
                let res1 = await axios.get("/products/");
                this.products = res1.data.results;
                this.set_products(this.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        resetErrorStates() {
            this.errorMessage = false;
            this.validColor = false;
            this.validSize = false;
            this.validStock = false;

        },
    },
    computed: {
        ...mapState(["user", "cart"]),
        ...mapGetters(["getAccessToken"]),
        cartItems() {
            return this.$store.state.cart;
        },
        formattedPrice() {
            return this.product.currency + " " + this.product.price;
        },
        sanitizedHtml() {
            return DOMPurify.sanitize(this.product.description);
        },
        featuredProducts() {
            return this.products.filter((product) => product.is_featured);
        },
    },
    async created() {
        let res = await axios.get(`/products/${this.$route.params.id}/`);
        this.product = res.data;
        this.loaded = true;
        this.activeImage = this.product.image;

        let res1 = await axios.get("/products/");
        this.products = res1.data.results.map((product) => {
            return product;
        });
        this.set_products(this.products);

        let reviews = await axios.get(`/product-reviews/${this.$route.params.id}/`);

        this.reviews = reviews.data;


    },

};
</script>

<style scoped>
.dropdown-container {
    width: 100%;
    max-width: 250px;
    /* Adjust width as needed */
    margin: 10px 0;
    position: relative;
}

.custom-select {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    color: #333;
    background-color: #fff;
    border: 2px solid #1b1a1ac7;
    /* Primary color border */
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    appearance: none;
    /* Remove default styling */
    transition: all 0.3s ease-in-out;
}

/* Arrow Icon for Select */
.custom-select::after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    font-size: 14px;
    color: #007bff;
}

/* Hover Effect */
.custom-select:hover {
    border-color: #0056b3;
}


.color-selector {
    margin-bottom: 2rem;
}

.color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1rem;
}

.color-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;
}

.color-option:hover {
    transform: scale(1.1);
}

.color-circle {
    /* width: 3rem;
    height: 3rem; */
    border-radius: 50%;
    /* border: 2px solid #ddd; */
    margin-bottom: 0.5rem;
}

.color-option.active .color-circle {
    border: 2px solid var(--dark-blue);
    box-shadow: 0 0 0 2px var(--dark-blue);
}

.color-name {
    font-size: 1.2rem;
    color: #666;
}

.color-option.active .color-name {
    color: var(--dark-blue);
    font-weight: 600;
}

@media (max-width: 599px) {
    .color-options {
        gap: 1.5rem;
    }

    .color-circle {
        width: 2.5rem;
        height: 2.5rem;
    }

    .color-name {
        font-size: 1rem;
    }
}

.cart-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5rem;
    padding-bottom: 2rem;
    margin-top: 10px;
}

.image-section {
    width: 40%;
}

.image-section,
.product-details {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#back {
    padding: 1rem 1.8rem;
    font-size: 2rem;
    border: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    background-color: var(--dark-blue);
    transition: opacity 0.25s;
    display: grid;
    place-content: center;
    width: fit-content;
}

#back:hover {
    opacity: 0.85;
}

.main-img {
    /* height: 55vh; */
    max-width: 100%;
    object-fit: contain;
}

.img-thumbnails {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    padding-top: 1rem;
    width: 100%;
}

.img-thumbnails .thumbnail {
    height: auto;
    max-width: 100%;
    cursor: pointer;
}

.img-thumbnails .thumbnail:hover {
    opacity: 0.7;
}

/* Product Details */
.product-details {
    width: 100%;
    padding-block: 2.5rem;
}

.product-details span {
    font-size: 1.4rem;
}

.product-details h4 {
    padding: 1.5rem 0 1rem 0;
}

.product-details select {
    max-width: 120px;
    padding: 0.8rem 1rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    cursor: pointer;
}

.extra {
    padding-block: 4.5rem;
    text-align: center;
}

.product-description {
    line-height: 2.5rem;
}

@media (max-width: 599px) {
    .cart-item {
        flex-direction: column;
    }

    .image-section,
    .product-details {
        width: 100%;
    }

    .image-section {
        padding-top: 2rem;
    }

    .image-section a {
        top: -2rem;
        left: 0;
    }
}
</style>
