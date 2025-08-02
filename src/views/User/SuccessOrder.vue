<template>
    <main-header />

    <section class="success-section py-8 px-4 md:px-8 lg:px-16">
        <div class="container mx-auto">
            <div class="success-message text-center py-12">
                <h3 class="text-xl text-green-400 font-semibold">Payment Successful!</h3>
                <p class="text-gray-600">Thank you for your order. Your payment has been processed successfully.</p>
                <router-link to="/shop" class="mt-4">
                    <action-button btnvalue="Continue Shopping" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition" />
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

export default {
    components: { SubHeader, ActionButton, MainHeader, MainFooter, CategoryBar },
    name: "SuccessOrder",
    data() {
        return {
            
        };
    },
    methods: {

    },
    computed: {
        
    },
    mounted() {

    }
};
</script>

<style scoped>

</style>