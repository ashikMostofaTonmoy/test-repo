<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <main-header />
      
      <!-- Sub-header -->
      <sub-header heading="Profile" subHeading="View and edit your details" />
      
      <!-- Profile Content -->
      <div class="container mx-auto py-10">
        <div class="bg-white shadow-lg rounded-lg p-8 space-y-8">
          
          <!-- Profile Info -->
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-semibold text-gray-800">Your Profile</h1>
              <p class="text-gray-600">Manage your personal and shipping information</p>
            </div>
          </div>
  
          <!-- Editable Profile Form -->
          <div class="text-xl">
            <form @submit.prevent="updateProfile" class="space-y-6">
              
              <!-- Full Name -->
              <div class="flex space-x-4">
                <div class="flex-1">
                  <label for="firstName" class="block text-lxl font-medium text-gray-700">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    v-model="this.user.first_name" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div class="flex-1">
                  <label for="lastName" class="block text-lxl font-medium text-gray-700">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    v-model="this.user.last_name" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
  
              <!-- Address -->
              <div>
                <label for="streetAddress" class="block text-lxl font-medium text-gray-700">Street Address</label>
                <input 
                  type="text" 
                  id="streetAddress" 
                  v-model="this.user.street_address" 
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <!-- City, State, Country -->
              <div class="flex space-x-4">
                <div class="flex-1">
                  <label for="city" class="block text-lxl font-medium text-gray-700">Town / City</label>
                  <input 
                    type="text" 
                    id="city" 
                    v-model="this.user.city" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div class="flex-1">
                  <label for="state" class="block text-lxl font-medium text-gray-700">State / Country</label>
                  <input 
                    type="text" 
                    id="state" 
                    v-model="this.user.state" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
  
              <!-- Email and Phone Number -->
              <div class="flex space-x-4">
                <div class="flex-1">
                  <label for="email" class="block text-lxl font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="this.user.email" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div class="flex-1">
                  <label for="phoneNumber" class="block text-lxl font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="text" 
                    id="phoneNumber" 
                    v-model="this.user.phone_number" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
  
              <!-- Shipping Address -->
              <div>
                <label for="shippingAddress" class="block text-lxl font-medium text-gray-700">Shipping Address</label>
                <textarea 
                  id="shippingAddress" 
                  v-model="this.user.shipping_address" 
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"></textarea>
              </div>
  
              <!-- Submit Button -->
              <div class="flex justify-end">
                <button 
                  type="submit" 
                  class="bg-gray-800 text-white py-3 px-6 rounded-lg">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
      
      <!-- Footer -->
      <main-footer />
    </div>
  </template>
  
  <script>
  import SubHeader from "@/components/SubHeader.vue";
  import MainHeader from "@/components/MainHeader.vue";
  import MainFooter from "@/components/MainFooter.vue";
  import axios from "@/axios";
  import { mapState } from "vuex";

  
  export default {
    name: "ProfileView",
    components: {
      SubHeader,
      MainHeader,
      MainFooter
    },
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          streetAddress: "",
          city: "",
          state: "",
          email: "",
          phoneNumber: "",
          shippingAddress: ""
        },
      };
    },
    computed: {
      ...mapState(["user"]), 
    },
    mounted() {
      this.user = { ...this.$store.state.user };
    },
    methods: {
      async updateProfile() {
        try {
          const response = await axios.put("/user/profile", this.user);
          if (response.status === 200) {
            this.isEditing = false; // Exit edit mode
          }
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Additional custom styling can go here */
  </style>
  