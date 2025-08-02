<template>
    <header
        :class="{ 'fixed top-0 left-0 w-full bg-white z-10': isFixed, 'bg-white': !isFixed }">
        
        <div class="bg-[#dcf0ef] flex items-center justify-center min-h-[20px] px-4 text-center relative">
            <p class="text-black font-medium text-sm md:text-lg lg:text-xl">
                Next day delivery to home or free to store.*
            </p>
            <div class="absolute right-4 md:right-8 flex gap-4">
                <a href="#" class="text-black font-medium text-sm md:text-lg lg:text-xl hover:text-blue-600 transition-colors">Store Location</a>
                <a href="#" class="text-black font-medium text-sm md:text-lg lg:text-xl hover:text-blue-600 transition-colors">Help</a>
            </div>
        </div>




        <div class="container mx-auto px-6 md:px-64 py-4 flex items-center justify-between flex-wrap">
            <!-- Mobile menu button -->
            <button class="lg:hidden order-1" @click="isMenuOpen = !isMenuOpen"
                :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'">
                <XIcon v-if="isMenuOpen" class="h-10 w-10" />
                <MenuIcon v-else class="h-10 w-10" />
            </button>

            <!-- Logo and Search Bar Container for desktop -->
            <div class="flex-1 flex flex-col lg:flex-row items-center lg:items-center order-2 lg:order-1">
                <!-- Logo -->
                <div class="flex-shrink-0 mr-0 lg:mr-10 lg:mb-0">
                    <router-link to="/" class="font-bold text-5xl tracking-wider text-gray-800 hover:text-gray-600 transition-colors duration-300 p-2 rounded-lg bg-white">
                        FINCH & Co
                    </router-link>
                </div>

                <!-- Search bar - now next to logo on desktop -->
                <div class="hidden lg:flex flex-1 max-w-xl relative">
                    <input type="text" placeholder="Search product or brand"
                        class="w-full py-4 px-8 pr-14 text-xl rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300" />
                    <button class="absolute right-5 top-1/2 transform -translate-y-1/2" aria-label="Search">
                        <SearchIcon class="h-8 w-8 text-gray-500" />
                    </button>
                </div>
            </div>


            <!-- Icons - hidden on mobile, shown on desktop -->
            <div class="hidden lg:flex items-center space-x-10 order-3">
                <router-link v-if="!user" to="/signup" aria-label="Account" class="p-2">
                    <UserIcon class="h-10 w-10" />
                </router-link>
                <div v-if="user" class="relative">
                    <button @click="toggleDropdown" aria-label="User menu" class="p-2 flex items-center">
                        <ShieldUserIcon class="h-10 w-10" />
                        <span class="ml-2 text-xl font-semibold">{{ user.first_name + " " + user.last_name }}</span>
                    </button>
                    <div v-if="showDropdown" class="absolute right-0 z-[100] mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg">
                        <router-link to="/order" class="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-100 text-xl font-semibold">
                            <ArchiveIcon class="h-7 w-7 mr-2" />
                            Orders
                        </router-link>
                        <router-link to="/profile" class="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-100 text-xl font-semibold">
                            <UserIcon class="h-7 w-7 mr-2" />
                            Profile
                        </router-link>
                        <button @click="logout" class="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-100 text-xl font-semibold">
                            <LogOutIcon class="h-7 w-7 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
                <router-link to="/wishlist" aria-label="Wishlist" class="relative p-2">
                    <HeartIcon class="h-10 w-10" />
                    <span
                        class="absolute -top-2 -right-2 bg-black text-white text-base font-medium rounded-full h-7 w-7 flex items-center justify-center">
                        {{ wishlist.length }}
                    </span>
                </router-link>
                <router-link to="/cart" aria-label="Shopping bag" class="relative p-2">
                    <ShoppingBagIcon class="h-10 w-10" />
                    <span
                        class="absolute -top-2 -right-2 bg-black text-white text-base font-medium rounded-full h-7 w-7 flex items-center justify-center">
                        {{ cart.length }}
                    </span>
                </router-link>
                <router-link to="/checkout" v-if="cart.length > 0" 
                    class="bg-green-200 hover:bg-gray-300 text-gray-800 px-10 py-4 text-xl font-medium rounded-full transition-colors">
                    Checkout
                </router-link>
                <span 
                    v-else 
                    class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-10 py-4 text-xl font-medium rounded-full transition-colors">
                    Checkout
                </span>
            </div>
        </div>

        <!-- Mobile search - shown on mobile only -->
        <div class="lg:hidden px-6 pb-6 order-4 w-full">
            <div class="relative">
                <input type="text" placeholder="Search product or brand"
                    class="w-full py-4 px-8 pr-14 text-xl rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300" />
                <button class="absolute right-5 top-1/2 transform -translate-y-1/2" aria-label="Search">
                    <SearchIcon class="h-8 w-8 text-gray-500" />
                </button>
            </div>
        </div>

        <!-- Mobile menu - shown when menu is open with animation -->
        <div v-if="isMenuOpen" class="lg:hidden px-6 py-6 bg-white border-t border-gray-200 overflow-hidden transition-transform duration-500 ease-in-out transform translate-y-0">
            
            <nav class="flex flex-col">

                <router-link v-if="!user" to="/signup" class="mobile-nav-item flex items-center space-x-4 py-4 text-xl">
                    <UserIcon class="h-9 w-9" />
                    <span>Account</span>
                </router-link>

                <router-link v-if="user" to="/profile" class="mobile-nav-item flex items-center space-x-4 py-4 text-xl">
                    <HeartIcon class="h-9 w-9" />
                    <span>Profile</span>
                </router-link>

                <router-link v-if="user" to="/order" class="mobile-nav-item flex items-center space-x-4 py-4 text-xl">
                    <ArchiveIcon class="h-9 w-9" />
                    <span>Orders</span>
                </router-link>

                <router-link to="/wishlist" class="mobile-nav-item flex items-center space-x-4 py-4 text-xl">
                    <HeartIcon class="h-9 w-9" />
                    <span>Wishlist</span>
                </router-link>
                <router-link to="/cart" class="mobile-nav-item flex items-center space-x-4 py-4 text-xl">
                    <ShoppingBagIcon class="h-9 w-9" />
                    <span
                        class="">
                        {{ cart.length }} Items
                    </span>
                </router-link>
                <button v-if="user" @click="logout" class="mobile-nav-item flex items-center space-x-4 py-4 text-xl">
                    <LogOutIcon class="h-9 w-9" />
                    <span>Logout</span>
                </button>
                <router-link 
                    v-if="cart.length > 0" 
                    to="/checkout"
                    class="mobile-nav-item bg-green-300 hover:bg-gray-300 text-gray-800 px-8 py-4 text-xl font-medium rounded-full text-center transition-colors mt-4">
                    Checkout
                </router-link>
                <span 
                    v-else 
                    class="mobile-nav-item bg-gray-200 text-gray-400 px-8 py-4 text-xl font-medium rounded-full text-center mt-4 cursor-not-allowed">
                    Checkout
                </span>
            </nav>
        </div>

        <div class="bg-black relative">
            <!-- <div class="container mx-auto">
                <div
                    class="flex flex-no-wrap justify-center md:justify-center space-x-4 md:space-x-6 category-bar overflow-x-auto whitespace-nowrap relative z-50">
                    <a v-for="category in categories" :key="category.name" href="#"
                    class="text-white text-2xl font-bold px-4 md:px-6 py-4 transition-colors duration-300 hover:bg-white hover:text-black text-center relative"
                    @click="showMenu(category)" @mouseleave="hideMenu">
                    {{ category.name }}
                    </a>
                </div>
            </div>  -->

            <div class="container mx-auto overflow-hidden">
                <div class="flex overflow-x-auto md:justify-center md:space-x-8 whitespace-nowrap scrollbar-hide scroll-smooth snap-x snap-mandatory category-bar">
                    <a v-for="category in categories" :key="category.name" href="#"
                        class="text-white text-2xl font-semibold px-4 md:px-6 py-4 transition-colors duration-300 hover:bg-white hover:text-black text-center relative snap-start"
                        @click="showMenu(category)" @mouseleave="hideMenu">
                        {{ category.name }}
                    </a>
                </div>
            </div>


            <!-- Background Overlay (Moved below category bar) -->
            <div v-if="activeCategory" class="fixed inset-0 bg-black opacity-30 z-40 pointer-events-none"></div>

            <!-- Megamenu -->
            <div v-if="activeCategory"
            class="absolute top-full left-0 md:w-3/4 mx-auto right-0 bg-white shadow-lg py-6 z-50 transition-opacity duration-300 category-menu rounded-sm shadow-xl"
            @mouseenter="cancelHide" @mouseleave="hideMenu">
                <div class="container mx-auto px-4 relative">
                    <span class="text-2xl font-semibold mb-4">{{ activeCategory.name }}</span>
                    <ul class="grid grid-cols-2 md:grid-cols-6 gap-6 mt-4">
                    <li v-for="(item, index) in activeCategory.subcategories" :key="index"
                        class="text-gray-700 hover:text-black text-xl cursor-pointer">
                        <router-link :to="`/shop/?category=${item.name}`">
                        {{ item.name }}
                        <img v-if="item.image" :src="item.image" alt="category" class="w-20 h-20" />
                        </router-link>
                    </li>
                    </ul>
                </div>
            </div>
        </div>

    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from '@/axios'
import {
    Search as SearchIcon,
    User as UserIcon,
    ShieldUser as ShieldUserIcon,
    Heart as HeartIcon,
    ShoppingBag as ShoppingBagIcon,
    Menu as MenuIcon,
    X as XIcon,
    LogOut as LogOutIcon,
    Archive as ArchiveIcon,
} from 'lucide-vue-next'

// State
const isMenuOpen = ref(false);
const isFixed = ref(false);
const showDropdown = ref(false); // Define showDropdown here
const dropdownRef = ref(null); // Reference for the dropdown
const buttonRef = ref(null); // Reference for the button

// Scroll event handler
const handleScroll = () => {
    isFixed.value = window.scrollY > 0;
};

// Handle clicks outside the dropdown
const handleClickOutside = (event) => {
    if (
        dropdownRef.value && !dropdownRef.value.contains(event.target) &&
        buttonRef.value && !buttonRef.value.contains(event.target)
    ) {
        showDropdown.value = false; // Hide dropdown if clicked outside
    }
};


onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOutside);
});

// Method to toggle dropdown
const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value; // Use showDropdown from ref
    console.log("Dropdown toggled:", showDropdown.value);
};
</script>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ActionButton from "./ActionButton.vue";
// import axios from "@/axios";

export default {
    components: { ActionButton },
    name: "MainHeader",
    props: {
        msg: String,
    },
    data() {
        return {
            showSideNav: false,
            searchQuery: "",

            activeCategory: null,
            hideTimeout: null,
            categories: [
                
            ]

        };
    },

    async created() {
        let res = await axios.get("/menu-items/");
        let res2 = await axios.get("/category/");

        let categoryMap = {};
        res.data.forEach(category => {
        categoryMap[category.id] = {
            id: category.id,
            name: category.name,
            subcategories: []
        };
        });

        res2.data.forEach(category => {
        categoryMap[category.parent].subcategories.push({name: category.name, image: category.logo});


        });
        this.categories = categoryMap

        // if (this.getAccessToken) {
        //     const accessToken = typeof this.getAccessToken === 'string' ? this.getAccessToken.trim() : null;
        //     if (accessToken) {
        //         try {
        //             const response = await axios.get("/verify-token/", {
        //                 headers: {
        //                     Authorization: `Bearer ${accessToken}` // Use the trimmed token
        //                 }
        //             });

        //             if (response.status === 200) {
        //                 this.$store.commit("set_user", response.data.user);
        //             } else { 
        //                 this.remove_user();
        //             }
        //         } catch (error) {
        //             console.error("Error verifying token:", error);
        //             this.remove_user(); // Handle error (e.g., token is invalid)
        //         }
        //     } else {
        //         console.error("Access token is empty.");
        //         this.remove_user();  
        //     }
        // }


        console.log(this.categories);
    },

    methods: {
        ...mapActions(["remove_user"]),
        ...mapGetters(["getAccessToken"]),

        showNav() {
            this.showSideNav = true;
        },
        performSearch() {
            if (this.searchQuery.trim()) {
                this.$router.push({ path: "/search", query: { q: this.searchQuery } });
            }
        },
        hideNav() {
            this.showSideNav = false;
        },
        logout() {
            this.remove_user();
            this.$router.push("/login");
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
            this.$nextTick(() => {
                console.log("Dropdown toggled:", this.showDropdown);
            });
        },

        showMenu(category) {
            clearTimeout(this.hideTimeout);
            this.activeCategory = category;
        },
        hideMenu() {
            this.hideTimeout = setTimeout(() => {
                this.activeCategory = null;
            }, 200);
        },
        cancelHide() {
            clearTimeout(this.hideTimeout);
        }
    },
    computed: {
        ...mapState(["user", "cart", 'wishlist']),
        ...mapGetters(["getHash"]),
    },
};
</script>



<style scoped>
.mobile-nav-item {
    opacity: 0;
    transform: translateY(20px);
    animation: slideIn 0.3s forwards;
    animation-delay: calc(var(--index, 0) * 0.1s);
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Apply animation delay to each item */
.mobile-nav-item:nth-child(1) {
    --index: 1;
}

.mobile-nav-item:nth-child(2) {
    --index: 2;
}

.mobile-nav-item:nth-child(3) {
    --index: 3;
}

.mobile-nav-item:nth-child(4) {
    --index: 4;
}



.category-bar {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}




</style>