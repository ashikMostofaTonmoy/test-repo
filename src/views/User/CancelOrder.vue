<template>
    <main-header />

    <section class="cancel-section py-8 px-4 md:px-8 lg:px-16">
        <div class="container mx-auto">
            <div class="cancel-message text-center py-12">
                <h3 class="text-xl text-red-400 font-semibold">Payment Cancelled</h3>
                <p class="text-gray-600">Your payment has been cancelled. If you have any questions, please contact support.</p>
                <router-link to="/shop" class="mt-4">
                    <action-button btnvalue="Return to Shop" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition" />
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
    name: "CancelOrder",
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