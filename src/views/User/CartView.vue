<template>
    <main-header />
    <sub-header
        heading="Cart"
        subHeading=""
    />
    <section class="cart-section">
        <div class="container mx-auto px-4">
            <section v-if="cart.length">
                <div class="cart-details overflow-x-auto">
                    <table class="min-w-full table-auto">
                        <thead>
                            <tr>
                                <td class="text-left">Image</td>
                                <td class="text-left">Product</td>
                                <td class="text-left">Color</td>
                                <td class="text-left">Price</td>
                                <td class="text-left">Quantity</td>
                                <td class="text-left">Subtotal</td>
                                <td class="text-left">Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in cart" :key="index">
                                <td class="py-2 text-center">
                                    <img
                                        :src="item.image"
                                        :alt="item.brand"
                                        class="img"
                                    />
                                </td>
                                <td class="py-2 text-center">{{ item.name }} ({{ item.size }})</td>
                                <td class="py-2 text-center">
                                    <div class="color-container">
                                        <div class="color-circle" :style="{ background: item.color }"></div>
                                    </div>
                                </td>
                                <td class="py-2 text-center">
                                    {{ item.currency }}
                                    {{ item.price }}
                                </td>
                                <td class="py-2 text-center">
                                    <input
                                        type="number"
                                        v-model="item.quantity"
                                        placeholder="QTY"
                                        min="1"
                                        @input="updateTotalPrice(item)"
                                    />
                                </td>
                                <td class="py-2 text-center">
                                    {{ item.currency }}
                                    {{
                                        (item.quantity * item.price).toFixed(2)
                                    }}
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

                <p v-if="errorMessageCart" class="text-red-500">{{ errorMessageCart }}</p>

                <div class="checkout-section mt-4">
                    <div class="coupon mb-4">
                        <h3 class="text-lg font-semibold">Apply Coupon</h3>
                        <form @submit.prevent="applyCupon" class="flex flex-col md:flex-row gap-2">
                            <input
                                type="text"
                                placeholder="Enter coupon code"
                                v-model="cuponCode"
                                class="border border-gray-300 rounded-md p-2 flex-grow"
                            />
                            <action-button btnvalue="Apply" />
                        </form>
                        <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
                        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
                    </div>
                    <div class="checkout">
                        <table class="min-w-full">
                            <thead>
                                <tr>
                                    <td class="text-left">Cart Total</td>
                                    <td class="text-left">$ {{ subtotal }}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- <tr>
                                    <td>Shipping Fee</td>
                                    <td>{{currency}} {{shippingFee}} </td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td>{{taxPercentage}}% ({{currency}} {{ formatPrice(tax) }})</td>
                                </tr> -->
                                <tr v-if="couponApplied">
                                    <td>Coupon Discount</td>
                                    <td>
                                        <strong>
                                            - ${{ formatPrice(subtotal - total) }}
                                        </strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Total</strong></td>
                                    <td>
                                        <strong
                                            >$
                                            {{ formatPrice(total) }}</strong
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <router-link to="/checkout">
                            <action-button btnvalue="Proceed to Checkout" />
                        </router-link>
                    </div>
                </div>
            </section>
            <div class="no-cart mb-5" v-else>
                <div class="no-cart-text flex flex-col items-center">
                    <img
                        src="@/assets/images/empty-cart.svg"
                        alt="empty-cart"
                    />
                    <h3>Your cart is empty!</h3>
                    <p>Browse our shop and discover our latest products.</p>
                </div>
                <router-link class="mb-5" to="/shop">
                    <action-button btnvalue="Start Shopping" />
                </router-link>
            </div>
        </div>
    </section>
    <main-footer />
</template>

<script>
import SubHeader from "@/components/SubHeader.vue";
import ActionButton from "@/components/ActionButton.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import CategoryBar from "@/components/CategoryBar.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "@/axios";

export default {
    components: { SubHeader, ActionButton, MainHeader, MainFooter, CategoryBar },

    name: "CartView",
    data() {
        return {
            total: 0,
            cuponCode: "",
            successMessage: "",
            errorMessage: "",
            errorMessageCart: "",
            couponApplied: false,
            shippingFee: 0,
            currency: "",
            taxPercentage: 0,
            tax: 0,
        };
    },
    methods: {
        ...mapActions(["delete_item", "update_quantity"]),
        deleteItem(index) {
            this.delete_item(index);
        },

        formatPrice(price) {
            return price.toFixed(2);
        },

        async verifyProductStock(item) {
            try {
                const cartQuantity = item.quantity;

                let response = await axios.post("/verify-product-stock/", {
                    product_id: item.id,
                    color: item.color,
                    quantity: cartQuantity,
                });

                if (response.data.valid) {
                    this.errorMessageCart = "";
                    this.update_quantity(item);
                    this.total = 0;
                    this.cart.forEach((item) => {
                        this.total += item.quantity * item.price;
                    });
                    this.total = this.total;
                    this.$store.commit("setTotal", this.total);
                } else {
                    this.errorMessageCart = response.data.error;
                    item.quantity = item.quantity - 1;
                }

            } catch (error) {
                console.error("Error verifying product stock:", error);
            }
        },

        // update total price of cart and increase the quantity of product in cart
        updateTotalPrice(item) {
            this.verifyProductStock(item);
        },
        async applyCupon() {
            if (!this.cuponCode) {
                this.errorMessage = "Please enter a coupon code";
                this.successMessage = "";
                return;
            }
            if (!this.getUser?.id) {
                this.errorMessage = "Please login to apply coupon";
                this.successMessage = "";
                return;
            }
            try {
                const formData = new FormData();
                formData.append("cupon_code", this.cuponCode);
                formData.append("total_amount", this.subtotal);
                formData.append("customer", this.getUser?.id);

                const response = await axios.post("/apply-cupon/", formData);

                if (response.data.total_amount) {
                    this.total = response.data.total_amount;
                    this.$store.commit("setTotal", this.total);
                    this.successMessage = response.data.message;
                    this.couponApplied = true;
                    this.$store.commit("setCoupon", this.cuponCode);
                    this.errorMessage = "";
                }
            } catch (error) {
                this.errorMessage = error.response?.data?.error || "Invalid coupon code";
                this.successMessage = "";
                console.error("Error applying coupon:", error.response?.data?.error || error.message);
            }
        },

        async getCompanySetting() {
            try {
                const response = await axios.get("/get-company-setting/");
                this.shippingFee = parseFloat(response.data.shipping_fee);
                this.taxPercentage = parseFloat(response.data.tax); //store the tax percentage
                this.currency = response.data.currency_symbol;

                const subtotal = parseFloat(this.subtotal);

                const taxAmount = (this.taxPercentage / 100) * subtotal;

                this.total = subtotal;
                this.$store.commit("setTotal", this.total);
                this.tax = taxAmount; 
            } catch (error) {
                console.error("Error fetching company settings:", error);
            }
        },


    },
    computed: {
        ...mapState(["cart"]),
        ...mapGetters(["subtotal", "getUser"]),
    },
    mounted() {
        this.cart.forEach((item) => {
            this.total += item.quantity * item.price;
        });
        this.getCompanySetting();
        // this.total = this.total;
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
