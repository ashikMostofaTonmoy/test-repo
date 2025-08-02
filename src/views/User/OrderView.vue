<template>
    <main-header />

    <section class="order-section py-8 px-4 md:px-8 lg:px-16">
        <div class="container mx-auto">
            <div v-if="orders.length" class="order-list overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                    <thead class="bg-gray-200 text-gray-700 uppercase text-base">
                        <tr>
                            <th class="px-6 py-3 border">Order ID</th>
                            <th class="px-6 py-3 border">Date</th>
                            <th class="px-6 py-3 border">Order Status</th>
                            <th class="px-6 py-3 border">Total</th>
                            <th class="px-6 py-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.id" class="border-b hover:bg-gray-100 transition">
                            <td class="px-6 py-4 border text-center font-semibold text-xl">{{ order.order_id }}</td>
                            <td class="px-6 py-4 border text-center text-xl">{{ formatDate(order.created_at) }}</td>
                            <td class="px-6 py-4 border text-center">
                                <span :class="getStatusClass(order.order_status)" class="px-4 py-2 rounded-full text-xl font-semibold">
                                    {{ order.order_status.toUpperCase() }}
                                </span>
                            </td>
                            <td class="px-6 py-4 border text-center font-bold text-xl text-gray-800">${{ order.total_price }}</td>
                            <td class="px-6 py-4 border text-center flex justify-center gap-2">
                                <button @click="openModal(order, 'details')" class="px-3 py-1 text-xl bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                    Details
                                </button>
                                <button @click="openModal(order, 'track')" class="px-3 py-1 text-xl bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                                    Track
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else class="no-orders text-center py-12">
                <div class="no-orders-text flex flex-col items-center">
                    <img src="@/assets/images/empty-cart.svg" alt="empty-orders" class="w-36 mb-4" />
                    <h3 class="text-xl font-semibold">You have no orders yet!</h3>
                    <p class="text-gray-600">Browse our shop and start shopping today.</p>
                    <router-link to="/shop" class="mt-4">
                        <action-button btnvalue="Start Shopping" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition" />
                    </router-link>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal Component -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-6xl transform scale-95 transition-transform duration-300 animate-fadeIn">
            <!-- Modal Header -->
            <div class="flex justify-between items-center border-b pb-3">
                <h2 class="text-2xl font-bold text-gray-800">{{ modalType === 'details' ? 'Order Details' : 'Track Order' }}</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-red-500 text-2xl transition">&times;</button>
            </div>

            <!-- Order Details -->
            <div v-if="modalType === 'details'" class="mt-4 space-y-6">
            <!-- Order Info -->
            <div class="bg-white rounded-lg shadow p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4">
                <div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Order ID: </span> <span class="text-base">{{ selectedOrder.order_id }}</span>
                    </div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Date: </span> <span class="text-base">{{ formatDate(selectedOrder.created_at) }}</span>
                    </div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Order Status: </span>
                        <span :class="getStatusClass(selectedOrder.order_status)" class="px-2 py-0.5 rounded text-sm text-white">
                            {{ selectedOrder.order_status.charAt(0).toUpperCase() + selectedOrder.order_status.slice(1) }}
                        </span>
                    </div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Payment Status: </span>
                        <span :class="getPaymentStatusClass(selectedOrder.payment_status)" class="px-2 py-0.5 rounded text-sm text-white">
                            {{ selectedOrder.payment_status.charAt(0).toUpperCase() + selectedOrder.payment_status.slice(1) }}
                        </span>
                    </div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Shipping Address: </span> <span class="text-base">{{ selectedOrder.shipping_address }}</span>
                    </div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Payment Method: </span> <span class="text-base">{{ selectedOrder.payment_method.toUpperCase() }}</span>
                    </div>
                </div>

                <div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Subtotal:</span> <span class="text-base">${{ selectedOrder.subtotal }}</span>
                    </div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Discount:</span> <span class="text-base">${{ selectedOrder.discount }}</span>
                    </div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Tax:</span> <span class="text-base">${{ selectedOrder.tax }}</span>
                    </div>
                    <div class="mb-2">
                        <span class="font-semibold text-base">Shipping Cost:</span> <span class="text-base">${{ selectedOrder.shipping_cost }}</span>
                    </div>
                    <div class="font-semibold text-lg text-green-600">
                        Total Price: ${{ selectedOrder.total_price }}
                    </div>
                </div>
            </div>
        </div>

            

            <!-- Order Items -->
            <div class="mt-6">
                <p class="text-gray-700 font-semibold text-xl">Items: </p>
                <ul class="list-none mt-2 space-y-4">
                    <li v-for="item in selectedOrder.items" :key="item.id" class="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
                        <div class="flex justify-between">
                            <span class="font-medium text-xl">{{ item.product_name }}</span>
                            <span class="text-gray-600">${{ item.price_at_purchase }} x {{ item.quantity }}</span>
                            <span class="text-gray-600">${{ item.price_at_purchase * item.quantity }}</span>
                        </div>
                        <div class="mt-2 text-sm text-gray-500">
                             <span class="font-medium text-lg">Color: {{ item.color_name || 'N/A' }} </span> 
                             <span class="font-medium text-lg"> Size: {{ item.size_name || 'N/A' }}</span>
                        </div>
                    </li>
                </ul>
            </div>


        </div>

            <!-- Tracking Order -->
            <div v-else-if="modalType === 'track'" class="mt-4 space-y-6">
                <!-- Order Info -->
                <div>
                    <p><strong>Order ID: </strong> {{ selectedOrder.order_id }}</p>
                    <p><strong>Current Status: </strong>
                        <span :class="getStatusClass(selectedOrder.order_status)" class="px-3 py-1 rounded-lg text-white">
                            {{ selectedOrder.order_status.charAt(0).toUpperCase() + selectedOrder.order_status.slice(1) }}
                        </span>
                    </p>
                </div>

                <!-- Tracking Information -->
                <div class="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                    <p class="text-gray-700 font-semibold text-xl">Tracking Information:</p>
                    <p class="text-gray-600 italic">Your order is on the way! (Tracking details will be available soon.)</p>
                </div>
            </div>


            <!-- Close Button -->
            <div class="flex justify-end mt-6">
                <button @click="closeModal" class="px-5 py-2 text-lg font-medium bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
                    Close
                </button>
            </div>
        </div>
    </div>


    <main-footer />
</template>

<script>
import SubHeader from "@/components/SubHeader.vue";
import ActionButton from "@/components/ActionButton.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import CategoryBar from "@/components/CategoryBar.vue";
import axios from "@/axios";
import { mapGetters } from "vuex";

export default {
    components: { SubHeader, ActionButton, MainHeader, MainFooter, CategoryBar },
    name: "OrderView",
    data() {
        return {
            orders: [],
            showModal: false,
            selectedOrder: null,
            modalType: "" // 'details' or 'track'
        };
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await axios.get("get-orders/", {
                    headers: {
                        Authorization: `Bearer ${this.getAccessToken}`
                    }
                });
                this.orders = response.data;
            } catch (error) {
                console.error("Error fetching orders", error);
            }
        },
        openModal(order, type) {
            this.selectedOrder = order;
            this.fetchOrderItems(order.id);
            this.modalType = type;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedOrder = null;
        },
        async fetchOrderItems(orderId) {
            try {
                const response = await axios.get(`get-order-items/${orderId}/`, {
                    headers: {
                        Authorization: `Bearer ${this.getAccessToken}`
                    }
                });
                this.selectedOrder.items = response.data;
            } catch (error) {
                console.error("Error fetching order items", error);
            }
        },
        
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        getStatusClass(status) {
            switch (status) {
                case 'pending': return 'bg-yellow-200 text-yellow-700';
                case 'confirmed': return 'bg-blue-200 text-blue-700';
                case 'shipped': return 'bg-green-200 text-green-700';
                case 'delivered': return 'bg-green-200 text-green-700';
                case 'canceled': return 'bg-red-200 text-red-700';
                default: return 'bg-gray-200 text-gray-700';
            }
        },
        getPaymentStatusClass(status) {
            switch (status) {
                case 'pending': return 'bg-yellow-200 text-yellow-700';
                case 'paid': return 'bg-green-200 text-green-700';
                case 'failed': return 'bg-red-200 text-red-700';
                default: return 'bg-gray-200 text-gray-700';
            }
        },
    },
    computed: {
        ...mapGetters(["getAccessToken"])
    },
    mounted() {
        this.fetchOrders();
    }
};
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
}
</style>