<template>
    <main-header />
    <sub-header
        heading="Checkout"
        subHeading="Complete your order by filling the form below"
    />
    <section class="mb-5 p-5">
        <div class="container">
            <form class="billing-info" @submit.prevent="placeOrder">
                <div v-if="user" class="form">
                    <div class="text-3xl font-semibold">Billing Address</div>
                    <div class="form-group">
                        <div class="form-control">
                            <label>First Name *</label>
                            <input type="text" v-model="fields.first_name" required />
                        </div>
                        <div class="form-control">
                            <label>Last Name *</label>
                            <input type="text" v-model="fields.last_name" required />
                        </div>
                    </div>
                    <div class="form-control">
                        <label>Street Address*</label>
                        <input
                            type="text"
                            placeholder="House number and Street number"
                            required
                            v-model="fields.street_address"
                        />
                    </div>
                    <div class="form-group">
                        <div class="form-control">
                            <label>Town / City *</label>
                            <input type="text" v-model="fields.city" required />
                        </div>
                        <div class="form-control">
                            <label>State / Country *</label>
                            <input type="text" v-model="fields.state" required />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-control">
                            <label>Email Address *</label>
                            <input type="email" v-model="fields.email" required readonly />
                        </div>
                        <div class="form-control">
                            <label for="">Phone Number *</label>
                            <input type="text" v-model="fields.phone_number" required />
                        </div>
                    </div>
                    <div class="form-control">
                        <label>Shipping Address *</label>
                        <textarea
                            rows="10"
                            placeholder="Enter your shipping address"
                            v-model="shipping_address"
                            required
                        ></textarea>
                    </div>
                </div>
                <div v-else class="form">
                    <div class="text-3xl font-semibold">Create Account With Billing Address</div>
                    <div class="form-group">
                        <div class="form-control">
                            <label>First Name *</label>
                            <input type="text" v-model="fields.first_name" required />
                        </div>
                        <div class="form-control">
                            <label>Last Name *</label>
                            <input type="text" v-model="fields.last_name" required />
                        </div>
                    </div>
                    <div class="form-control">
                        <label>Street Address*</label>
                        <input
                            type="text"
                            placeholder="House number and Street number"
                            required 
                            v-model="fields.street_address"
                        />
                    </div>
                    <div class="form-group">
                        <div class="form-control">
                            <label>Town / City *</label>
                            <input type="text" v-model="fields.city" required />
                        </div>
                        <div class="form-control">
                            <label>State / County *</label>
                            <input type="text" v-model="fields.state" required />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-control">
                            <label>Email Address *</label>
                            <input type="email" v-model="fields.email" required />
                        </div>
                        <div class="form-control">
                            <label for="">Phone Number *</label>
                            <input type="text" v-model="fields.phone_number" required />
                        </div>
                    </div>
                    <div class="form-control">
                        <label>Password *</label>
                        <input type="password" v-model="fields.password" required />
                    </div>
                    <div class="form-control">
                        <label>Shipping Address *</label>
                        <textarea
                            rows="10"
                            placeholder="Enter your shipping address"
                            v-model="shipping_address"
                            required
                        ></textarea>
                    </div>
                </div>
                <aside>
                    <h4>Your Order</h4>
                    <table class="table table-summary">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item, index) in cart" :key="index">
                                <td>
                                    <span>{{ item.name }}</span> <br />
                                    Size: {{ item.size }}
                                    Color: {{ item.colorName }} <br />
                                </td>
                                <td>
                                    {{ currency + ' ' + item.price }} X {{ item.quantity }}
                                </td>
                            </tr>

                            <tr class="summary-subtotal">
                                <td>Subtotal:</td>
                                <td>{{ currency + ' ' + subtotal }}</td>
                            </tr>
                            <tr v-if="total !== subtotal" class="">
                                <td>Coupon Discount:</td>
                                <td>{{ currency + ' ' + formatPrice(total - subtotal) }}</td>
                            </tr>
                            
                            <!-- End .summary-subtotal -->
                            <tr>
                                <td>Shipping:</td>
                                <td>{{ currency + ' ' + formatPrice(shippingFee) }}</td>
                            </tr>
                            <tr>
                                <td>Tax ({{ taxPercentage }}%):</td>
                                <td>{{ currency + ' ' + formatPrice(tax) }}</td>
                            </tr>
                            <tr class="summary-total">
                                <td>Total:</td>
                                <td>
                                    {{ currency + ' ' + formatPrice(finalTotal) }}
                                </td>
                            </tr>
                            <!-- End .summary-total -->
                        </tbody>
                    </table>
                    <button class="submit" :class="{ payment: !noOrder }">
                        <template v-if="noOrder">
                            <span>Place Order</span>
                            <div class="icon">
                                <i class="fa fa-credit-card"></i>
                            </div>
                        </template>
                        <button-preloader v-else />
                    </button>
                </aside>
            </form>
        </div>
    </section>
    <success-modal
        @close-modal="closeModal"
        :price="finalTotal"
        :email="this.fields.email"
        :reference="referenceMessage"
        :order_id="order_id"
        :title="title"
        :isError="isError"
        v-if="showModal"
    />
    <main-footer />
</template> 

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import ButtonPreloader from "@/components/preloaders/ButtonPreloader.vue";
import SubHeader from "@/components/SubHeader.vue";
import ActionButton from "@/components/ActionButton.vue";
import SuccessModal from "@/components/SuccessModal.vue";
import CategoryBar from "@/components/CategoryBar.vue";
import { loadStripe } from "@stripe/stripe-js";

import { mapState, mapGetters, mapActions } from "vuex";
import axios from "@/axios";

export default {
    data() {
        return {
            noOrder: true,
            referenceMessage: "",
            order_id: null,
            price: "",
            showModal: false,
            title: "",
            isError: false,

            shippingFee: 0,
            taxPercentage: 0,
            currency: "",
            tax: 0,
            discount: 0,
            finalTotal: 0,
            shipping_address: "",

            fields: {
                first_name: "",
                last_name: "",
                street_address: "",
                city: "",
                state: "",
                email: "",
                phone_number: "",
                password: "",
            },
            
        };
    },
    components: {
        MainHeader,
        MainFooter,
        ButtonPreloader,
        SubHeader,
        ActionButton,
        SuccessModal,
        CategoryBar,
    },
    computed: {
        ...mapState(["user", "cart"]),

        ...mapGetters(["subtotal", "total", 'getUser', 'getAccessToken', 'getCoupon']),
    },
    methods: {
        ...mapActions(["set_user"]),
        formatPrice(price) {
            return price.toFixed(2);
        },
        async getCompanySetting() {
            try {
                const response = await axios.get("/get-company-setting/");
                this.shippingFee = parseFloat(response.data.shipping_fee);
                this.taxPercentage = parseFloat(response.data.tax); 
                this.currency = response.data.currency_symbol;

                const taxAmount = (this.taxPercentage / 100) * this.total;

                this.finalTotal = this.total + this.shippingFee + taxAmount;
                this.tax = taxAmount; 
            } catch (error) {
                console.error("Error fetching company settings:", error);
            }
        },

        async checkout() {
            const stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);

            try {
                const response = await axios.post("/create-checkout-session/", {
                    order_id: this.order_id,
                }, {
                    headers: this.user ? {
                        Authorization: `Bearer ${this.getAccessToken}`
                    } : {}
                });

                if (response.data && response.data.session_id) {
                    // Redirect to Stripe Checkout
                    const { error } = await stripe.redirectToCheckout({ sessionId: response.data.session_id });
                    if (error) {
                        console.error("Error redirecting to checkout:", error);
                        alert("There was an error processing your payment. Please try again.");
                    }
                } else {
                    console.error("No session ID returned from the server.");
                    alert("Failed to create a checkout session. Please try again.");
                }
            } catch (error) {
                console.error("Error during checkout:", error);
                alert("An error occurred while processing your request. Please try again.");
            }
        },

        async placeOrder() { 
            try {
                // After successful payment, place the order
                const response = await axios.post("/place-order/", {
                    orders: this.cart.map((item) => ({
                        product_id: item.id,
                        color: item.color,
                        quantity: item.quantity,
                        size: item.size,
                    })),
                    order_info: {
                        discount: this.discount,
                        shipping_fee: this.shippingFee,
                        tax: this.tax,
                        final_total: this.finalTotal,
                        subtotal: this.subtotal,
                        payment_method: "card",
                        shipping_address: this.shipping_address,
                    },
                    billing_address: this.fields,
                    is_registered: !!this.user,
                    coupon: this.getCoupon,
                }, {
                    headers: this.user ? {
                        Authorization: `Bearer ${this.getAccessToken}`
                    } : {}
                });

                if (response.data.valid) {
                    if (response.data.user_info) {
                        this.$store.dispatch("set_user", response.data.user_info);
                    }
                    this.referenceMessage = response.data.message;
                    this.order_id = response.data.order_id;
                    this.title = "Success";
                    this.$store.commit("setCoupon", "");
                    this.$store.commit("setTotal", 0);
                    this.$store.commit("emptyCart");
                    this.finalTotal = 0;

                    // Wait for checkout to complete
                    await this.checkout(); 

                } else {
                    this.referenceMessage = response.data.error;
                    this.title = "Error";
                    this.isError = true;
                    this.showModal = true;
                }
            } catch (error) {
                console.error("Error placing order:", error);
                alert("An error occurred while placing your order. Please try again.");
            }
        },
        closeModal() {
            this.showModal = false;
        },
    },
    mounted() {
        
        this.getCompanySetting();
        if (this.user) {
            this.fields.email = this.user.email;
            this.fields.first_name = this.user.first_name;
            this.fields.last_name = this.user.last_name;
            this.fields.street_address = this.user.street_address;
            this.fields.city = this.user.city;
            this.fields.state = this.user.state;
            this.fields.phone_number = this.user.phone_number;
        }

    },
};
</script>

<style scoped>
.coupon {
    display: flex;
    gap: 15px;
}

.billing-info {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-top: 15px;
}

.billing-info h4 {
    margin-bottom: 15px;
}

.form {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

form input,
form textarea {
    border-radius: 0px;
    padding: 0px;
}

.form-group {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.form-control {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

label {
    font-size: 1.5rem;
}

.form-control input,
.form-control textarea {
    padding: 10px 12px;
    outline: none;
    transition: 0.25s;
    background-color: whitesmoke;
    width: 100%;
}

textarea {
    resize: vertical;
}

.form-control input:focus,
.form-control textarea:focus {
    border: 1px solid var(--dim-blue);
    background-color: white;
}

aside {
    flex: 1;
    padding: 25px;
    border: 1px dashed lightgray;
    background-color: whitesmoke;
    height: auto;
}

aside h4 {
    padding-bottom: 20px;
    border-bottom: 1px solid black;
}

table {
    border-collapse: collapse;
    width: 100%;
}

.table.table-summary thead th,
.table.table-summary .summary-subtotal td {
    color: var(--brown);
    font-weight: 500;
    font-size: 1.6rem;
}

.table.table-summary thead th:last-child,
.table.table-summary tbody td:last-child {
    text-align: right;
    min-width: 90px;
}
table thead tr th {
    text-align: left;
    font-size: 1.6rem;
    font-weight: 400;
}

table tbody tr td {
    font-size: 1.6rem;
    font-weight: 400;
}

.table.table-summary tbody td {
    padding: 0;
    height: 70px;
    border-bottom: 0.1rem solid #ebebeb;
}

.table.table-summary .summary-total td {
    font-weight: 400;
    font-size: 1.6rem;
    color: var(--dim-blue);
    border-bottom: none;
}

table tbody tr td span {
    width: 150px;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 10px;
}

.submit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    font-size: 1.6rem;
    width: 100%;
    color: var(--dim-blue);
    background-color: transparent;
    border-radius: 0px;
    border: 1px solid var(--dim-blue);
}

.icon {
    position: absolute;
    right: 20px;
}

.submit:hover,
.submit:focus,
.submit:active,
.payment {
    background-color: var(--dim-blue);
    color: white;
}

.submit:nth-child(2) {
    display: none;
}

.submit:hover:nth-child(1),
.submit:focus:nth-child(1) {
    display: none;
}

@media (max-width: 790px) {
    .billing-info,
    .form-group {
        flex-direction: column;
        width: 100%;
    }
    aside,
    .form {
        width: 100%;
    }
    table tbody tr td span {
        width: 100%;
        white-space: break-spaces;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
