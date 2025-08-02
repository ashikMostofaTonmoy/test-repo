<template>
    <main-header />
    <sub-header heading="Shop" subHeading="Save more with coupons up to 70% off" />
    <div class="container">

        <div class="pb-5 ">
            <div class="filter-container rounded-lg flex flex-wrap items-center justify-between text-lg p-4 md:flex-nowrap  md:space-y-0 md:space-x-6 ">
                <!-- New In Checkbox -->
                <div class="text-left border border-gray-300 rounded-lg p-2.5 mb-3 md:mb-0 md:border-l md:border-gray-300 relative px-4 w-full ">
                    <!-- <input type="checkbox" id="newIn" class="mr-4 h-8 w-8"> -->
                    <input v-model="filters.search" type="text" placeholder="Search products..."
                        class="mr-4 text-2xl border-none p-3  focus:outline-none" @input="applyFilters" />
                </div>

                <!-- Category Dropdown -->
                <select v-model="filters.category"
                    class="text-2xl text-left bg-transparent border border-gray-300 rounded-lg p-[13px] mb-3 md:border-l md:border-gray-300 relative px-4 w-full"
                    @change="applyFilters">
                    <option value="">Category</option>
                    <option v-for="category in filters.categories" :key="category.id" :value="category.name">
                        {{ category.name }}
                    </option>
                </select>


                <!-- Category Dropdown -->
                <div class=" flex items-center  filter-item text-center border border-gray-300 rounded-lg p-5 mb-3 md:border-l md:border-gray-300 relative px-4 w-full">
                    <!-- Label -->
                    <label class="text-xl font-semibold text-gray-700 min-w-[100px]"> Price Range 
                        <!-- Price Range: <span class="text-gray-700 font-bold">${{ filters.min_price }}</span> - -->
                        <!-- <span class="text-gray-600 font-bold">${{ filters.max_price }}</span> -->
                    </label>

                    <!-- Range Slider Wrapper -->
                    <div class="relative w-full h-5 p-5 flex items-center">
                        <!-- Slider (noUiSlider) -->
                        <div ref="priceRangeSlider" class="w-full"></div>
                    </div>
                </div>

                <!-- Reset Button -->
                <div class="text-center border border-gray-300 rounded-lg p-2  md:border-gray-300 relative px-4 w-full hover:cursor-pointer hover:bg-gray-100" @click="resetFilters "> 
                    <button
                        class="flex items-center text-center px-6 py-4 text-2xl text-teal-600 font-medium hover:text-teal-800 transition-colors"
                        >
                        Reset Filter
                        <!-- <svg class="ml-2 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd" />
                        </svg> -->
                    </button>
                </div>
            </div>
        </div>


        <div class="shop-layout">
            <!-- Right Side: Product List -->
            <div class="product__container" v-if="loaded">
                <product-card v-for="(product, index) in products" :key="index" :productId="product._id"
                    :productName="product.name" :brand="product.category_name" :price="product.price"
                    :currency="product.currency" :ratings=5 :image_url="product.image"
                    :in_stock="product.stock_quantity > 0" />
            </div>
            <product-preloader v-else> Loading products... </product-preloader>
        </div>

        <!-- Pagination -->
        <div class="pagination">
            <vue-awesome-paginate :total-items="total" :max-pages-shown="3" v-model="page"
                :show-breakpoint-buttons="false" :on-click="fetchNewPage" paginate-buttons-class="btn"
                active-page-class="btn-active" back-button-class="back-btn" next-button-class="next-btn"
                :hide-prev-next-when-ends="true">
                <template #prev-button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </template>
                <template #next-button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg>
                </template>
            </vue-awesome-paginate>
        </div>
    </div>

    <main-footer />
</template>

<script>
import SubHeader from "@/components/SubHeader.vue";
import ProductCard from "@/components/home_components/cards/ProductCard.vue";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
import CategoryBar from "@/components/CategoryBar.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import axios from "@/axios";

export default {
    name: "ShopView",
    components: {
        SubHeader,
        ProductCard,
        MainHeader,
        MainFooter,
        "product-preloader": ProductPreloader,
        CategoryBar,
    },
    data() {
        return {
            products: [],
            page: 1,
            loaded: false,
            total: 0,
            selectedCategory: "",
            filters: {
                search: "",
                ordering: "",
                categories: [],
                category: "",
                min_price: 0,
                max_price: 0,
                color: "",
                is_featured: false,
            },
        };
    },
    created() {
        this.getProducts();
        this.fetchCategories();
    },
    mounted() {
        this.initPriceRangeSlider();
    },
    methods: {
        resetFilters() {
            this.filters = {
                search: "",
                ordering: "",
                categories: this.filters.categories,
                category: "",
                min_price: 0,
                max_price: 0,
                color: "",
                is_featured: false,
            };

            this.page = 1;
            this.applyFilters();
        },
        getProducts() {
            this.loaded = false;
            const params = new URLSearchParams();

            const category = this.$route.query.category;
            // if (category) params.append("category", category);
            // else params.append("category", this.filters.category);

            if (this.filters.category) params.append("category", this.filters.category);
            else if (category) params.append("category", category);


            if (this.filters.search) params.append("search", this.filters.search);
            if (this.filters.ordering) params.append("ordering", this.filters.ordering);
            // if (this.filters.category) params.append("category", this.filters.category);
            if (this.filters.min_price) params.append("min_price", this.filters.min_price);
            if (this.filters.max_price) params.append("max_price", this.filters.max_price);


            axios
                .get(`/filter-products/?${params.toString()}&page=${this.page}`)
                .then((res) => {
                    this.products = res.data.results;
                    this.total = res.data.total_pages;
                    this.loaded = true;
                })
                .catch((err) => {
                    console.log(err);
                    this.loaded = false;
                });
        },
        initPriceRangeSlider() {
            const slider = noUiSlider.create(this.$refs.priceRangeSlider, {
                start: [this.filters.min_price, this.filters.max_price],
                connect: true,
                range: {
                    min: 0,
                    max: 10000,
                },
                step: 10,
                tooltips: true, // Show tooltips
                format: {
                    to: function (value) {
                        return Math.round(value); // Round value for cleaner display
                    },
                    from: function (value) {
                        return Number(value); // Convert to number for internal use
                    },
                },
            });

            slider.on("update", (values, handle) => {
                if (handle === 0) {
                    this.filters.min_price = Math.round(values[0]);
                } else {
                    this.filters.max_price = Math.round(values[1]);
                }
                this.applyFilters();
            });
        },
        applyFilters() {
            this.page = 1; // Reset pagination when filters change
            this.getProducts();
        },
        fetchCategories() {
            axios.get("/category").then((res) => {
                this.filters.categories = res.data;
            });
        },
        fetchNewPage(page) {
            this.page = page;
            this.getProducts();
            window.scrollTo(0, 0);
        },
    },
    watch: {
        "$route.query.category": {
            handler() {
                this.getProducts();
            },
        },
    },
};
</script>

<style>
/* Layout */
.shop-layout {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

/* Hide default slider appearance */
/* Hide default slider appearance */





/* Decrease the size of the slider handle */
/* Decrease the size of the slider handle */
.noUi-handle {
    width: 2px;  /* Adjust the width of the handle */
    height: 2px; /* Adjust the height of the handle */
    background-color: #000000;  /* Set a custom color for the handle */
    border-radius: 2%;  /* Make the handle circular */
    box-shadow: none; /* Remove any shadow */
}

/* Adjust the active handle on hover */
.noUi-handle:active {
    background-color: #000000; /* Darker shade when active */
    box-shadow: none; /* Remove shadow when active */
}



/* Products */
.product__container {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    /* padding: 3rem 1rem; */
}

@media screen and (max-width: 1024px) {
    .shop-layout {
        flex-direction: column;
    }

    /* .filter-sidebar {
        width: 100%;
        margin-bottom: 20px;
    } */
}

@media screen and (max-width: 768px) {
    .product__container {
        grid-template-columns: repeat(2, minmax(140px, 1fr));
        gap: 10px;
        padding: 1rem;
    }
}

.btn {
    border: none;
    background-color: #f2f2f2;
    padding-inline: 20px;
    height: 40px;
    border: 2px solid var(--grey-2);
    font-size: 1.7rem;
    margin-inline: 5px;
    cursor: pointer;
}

.back-btn,
.next-btn {
    background-color: #f2f2f2;
    color: black;
}

.btn:hover {
    background-color: #083e46;
    border-color: #083e46;
    color: white;
}

.btn-active {
    background-color: #083e46;
    color: white;
    border-color: #083e46;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
}
</style>