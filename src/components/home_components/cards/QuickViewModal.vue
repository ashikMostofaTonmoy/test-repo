<template>
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <!-- Modal panel -->
        <div class="flex min-h-screen items-center justify-center p-4">
            <div class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                <!-- Close button -->
                <button @click="$emit('close')" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Content -->
                <div class="flex p-6">
                    <!-- Product Image -->
                    <div class="w-1/2">
                        <img :src="product.image" :alt="product.name" class="w-full h-auto object-cover rounded-lg">
                    </div>

                    <!-- Product Details -->
                    <div class="w-1/2 pl-6">
                        <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
                        <p class="mt-2 text-sm text-gray-500">{{ product.brand }}</p>
                        
                        <div class="mt-4">
                            <p class="text-2xl font-bold text-gray-900">{{ product.price }}</p>
                            
                            <div class="mt-2">
                                <span class="text-yellow-400">
                                    <i v-for="rating in product.ratings" :key="rating" class="fas fa-star"></i>
                                </span>
                            </div>
                        </div>

                        <div class="mt-6">
                            <p class="text-sm text-gray-600">
                                Status: 
                                <span :class="product.in_stock ? 'text-green-600' : 'text-red-600'">
                                    {{ product.in_stock ? 'In Stock' : 'Out of Stock' }}
                                </span>
                            </p>
                        </div>

                        <div class="mt-6 space-y-3">
                            <button 
                                @click="$router.push('/cart/' + product.id)"
                                class="w-full bg-black text-white py-2 px-4 rounded-md transition"
                            >
                                View Details
                            </button>
                            <button 
                                @click="handleWishlist(product.id)"
                                class="w-full border border-gray-500 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition"
                            >
                                {{ isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'QuickViewModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters(["getWishlist"]),
        isInWishlist() {
            return this.$store.getters.getWishlist.some(item => item === this.product.id);
        }
    },
    methods: {
        handleWishlist(productId) {
            if (this.isInWishlist) {
                this.$store.dispatch('remove_from_wishlist', productId);
            } else {
                this.$store.dispatch('add_to_wishlist', productId);
            }
        }
    }
}
</script>
