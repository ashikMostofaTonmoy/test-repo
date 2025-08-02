<template>
    <footer class="bg-white border-t border-gray-200 pt-8 pb-4">
      <!-- Social Networks -->
      <div class="container mx-auto px-4">
        <div class="text-center mb-6">
          <p class="font-medium text-xl text-gray-800">Our Social Networks</p>

          <div class="flex justify-center space-x-6">
            <a href="#" class="text-gray-800 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              <span class="sr-only">Facebook</span>
            </a>
            <a href="#" class="text-gray-800 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              <span class="sr-only">Twitter/X</span>
            </a>
            <a href="#" class="text-gray-800 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              <span class="sr-only">TikTok</span>
            </a>
            <a href="#" class="text-gray-800 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span class="sr-only">Instagram</span>
            </a>
            <a href="#" class="text-gray-800 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin"><line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
              <span class="sr-only">Pinterest</span>
            </a>
            <a href="#" class="text-gray-800 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              <span class="sr-only">YouTube</span>
            </a>
          </div>
        </div>
        
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          <!-- Column 1: My Account / Help -->
          <div class="">
            <div class="flex items-center mb-4 border-b border-t border-gray-200 pb-3 pt-4 hover:underline hover:cursor-pointer" @click="changeRoute('/signup')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user mr-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <div class="ml-5">
                <div class="font-medium text-lg text-gray-900">My Account</div>
                <div class="text-sm text-gray-600">Sign-in to your account</div>
              </div>
            </div>
            
            <h4 class="font-medium text-gray-900 mt-6 mb-3 text-xl">Help</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Frequently Asked Questions</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Delivery Information</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Arrange A Return</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Product Recall</a></li>
              <li>
                <a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Customer Services - 0333 777 8000</a>
                <p class="text-gray-500 text-lg leading-tight">Check your service provider for charges</p>
              </li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Contact Us</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Accessible Site</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Website Accessibility Policy</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Accessibility in Our Stores</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Site Map</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Complaints Process</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900 text-lg">Furniture Spare Parts</a></li>
            </ul>
          </div>
          
          <!-- Column 2: Change Country / Shopping With Us -->
          <div>
            <div class="flex items-center mb-4 border-b border-t border-gray-200 pb-3 pt-4 hover:underline hover:cursor-pointer" @click="changeRoute('/signup')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              <div class="ml-5">
                <div class="font-medium text-lg text-gray-900">Change Country</div>
                <div class="text-sm text-gray-600">Choose your shopping location</div>
              </div>
            </div>
            
            <h4 class="font-medium text-gray-900 mt-6 mb-3 text-xl">Shopping With Us</h4>
            <ul class="space-y-2 text-lg">
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Next Unlimited</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Next Credit Options</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">eGift Cards</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Gift Cards</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Gift Experiences</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Flowers, Plants & Wine</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Privacy & Cookie Policy</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Terms & Conditions</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Manually Manage Cookies</a></li>
            </ul>
          </div>
          
          <!-- Column 3: Store Locator / Departments -->
          <div>
            <div class="flex items-center mb-4 border-b border-t border-gray-200 pb-3 pt-4 hover:underline hover:cursor-pointer" @click="changeRoute('/signup')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div class="ml-5">
                <div class="font-medium text-lg text-gray-900">Store Locator</div>
                <div class="text-sm text-gray-600">Find your nearest store</div>
              </div>
            </div>
            
            <h4 class="font-medium text-gray-900 mt-6 mb-3 text-xl">Departments</h4>
            <ul class="space-y-2 text-lg">
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Womens</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Mens</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Boys</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Girls</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Home</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Furniture</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Beauty</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Brands</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Baby</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Sports</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Gifts</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Clearance</a></li>
            </ul>
          </div>
          
          <!-- Column 4: Start a Chat / More From Next -->
          <div>
            <div class="flex items-center mb-4 border-b border-t border-gray-200 pb-3 pt-4 hover:underline hover:cursor-pointer" @click="changeRoute('/signup')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <div class="ml-5">
                <div class="font-medium text-lg text-gray-900">Start a Chat</div>
                <div class="text-sm text-gray-600">For general enquires</div>
              </div>
            </div>
            
            <h4 class="font-medium text-gray-900 mt-6 mb-3 text-xl">More From Next</h4>
            <ul class="space-y-2 text-lg">
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Next App</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">The Company</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Media & Press</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Careers @ Next</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">View Our Modern Slavery Statement</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Gender Pay Report</a></li>
              <li><a href="#" class="text-gray-900 hover:text-gray-900">Corporate Responsibility Report</a></li>
            </ul>
          </div>
        </div>
        
        <!-- Bottom Footer -->
        <div class="border-t border-gray-200 pt-6 text-center">
          <p class="text-gray-900 text-xl mt-2">© 2025 Finch & Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
</template>

<script>
export default {
    name: "MainFooter",
    data() {
        return {
            date: new Date().getFullYear(),
        }
    },
    methods: {
        changeRoute(route) {
            this.$router.push(route);
        }
    }
};
</script>
