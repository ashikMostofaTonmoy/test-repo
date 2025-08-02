<template>
    <section class="signup grid-center">
        <div class="signup-box">
            <router-link to="/" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-x-lg close-signup" viewBox="0 0 16 16">
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
            </router-link>

            <div class="form-header">
                <h2>Create Account</h2>
                <p>Join us to get started with your shopping journey</p>
            </div>

            <form @submit.prevent="registerUser">
                <div class="form-grid">
                    <div class="form-item">
                        <label>First Name</label>
                        <input type="text" required v-model="firstName" placeholder="Enter your first name" />
                    </div>
                    <div class="form-item">
                        <label>Last Name</label>
                        <input type="text" required v-model="lastName" placeholder="Enter your last name" />
                    </div>
                </div>

                <div class="form-item">
                    <label>Email Address</label>
                    <input type="email" required v-model="emailAddress" placeholder="example@email.com" />
                </div>

                <div class="form-item">
                    <label>Password</label>
                    <div class="password-input">
                        <input :type="showPassword ? 'text' : 'password'" required minlength="4"
                            @keyup="validatePassword" v-model="password" placeholder="Create a strong password" />
                        <button type="button" class="toggle-password" @click="togglePassword">
                            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path
                                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                <path
                                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                <path
                                    d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                            </svg>
                        </button>
                    </div>
                    <div class="password-strength" v-if="validator">
                        <div class="strength-bar">
                            <div class="strength-indicator" :class="errorMessage"
                                :style="{ width: strengthPercentage + '%' }"></div>
                        </div>
                        <span :class="errorMessage">{{ errorMessage }}</span>
                    </div>
                </div>

                <div class="form-item">
                    <label>Phone Number</label>
                    <input type="tel" required v-model="phoneNumber" placeholder="Enter your phone number" />
                </div>

                <div class="consent-section">
                    <div class="checkbox-wrapper">
                        <input type="checkbox" id="terms" required v-model="terms" />
                        <label for="terms">
                            I accept the
                            <router-link to="/" style="text-decoration: none; color: #6d9def">Terms &
                                Conditions</router-link> and
                            Privacy and Cookie Notice
                        </label>
                    </div>

                    <div class="checkbox-wrapper">
                        <input type="checkbox" id="newsletter" v-model="newsletter" />
                        <label for="newsletter">
                            Send me personalized newsletters and exclusive offers
                        </label>
                    </div>
                </div>

                <div class="error-messages" v-if="email_error">
                    <p v-for="(error, index) in email_error" :key="index">
                        {{ error }}
                    </p>
                </div>

                <button type="submit" class="submit-button" :disabled="userCreated">
                    <button-preloader v-if="userCreated" />
                    <span v-else>Create Account</span>
                </button>

                <div class="form-footer">
                    <p>Already have an account? <router-link to="/login"
                            style="text-decoration: none; color: #6d9def">Log In</router-link></p>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import ButtonPreloader from "@/components/preloaders/ButtonPreloader.vue";
import axios from '@/axios'; 

export default {
    name: "SignUpBox",
    components: { ButtonPreloader },
    data() {
        return {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            phoneNumber: "",
            terms: false,
            newsletter: false,
            showPassword: false,
            errorMessage: "",
            validator: false,
            userCreated: false,
            email_error: "",
        };
    },
    computed: {
        strengthPercentage() {
            switch (this.errorMessage) {
                case 'weak': return 33;
                case 'medium': return 66;
                case 'strong': return 100;
                default: return 0;
            }
        }
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        validatePassword() {
            if (this.password.length === 0) {
                this.validator = false;
            } else {
                this.validator = true;
                if (this.password.length >= 8) {
                    this.errorMessage = "strong";
                } else if (this.password.length >= 4) {
                    this.errorMessage = "medium";
                } else {
                    this.errorMessage = "weak";
                }
            }
        },
        async registerUser() {
            this.userCreated = true;
            try {
                const response = await axios.post(
                    "/register/",
                    {
                        first_name: this.firstName,
                        last_name: this.lastName,
                        email: this.emailAddress,
                        password: this.password,
                        phone: this.phoneNumber,
                    }
                );

                if (response.status === 201) {
                    this.$router.push("/login");
                }
            } catch (error) {
                this.email_error = error.response?.data?.email || ["An error occurred"];
            } finally {
                this.userCreated = false;
            }
        },
    },
};
</script>

<style scoped>
.signup {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 2rem;
}

.grid-center {
    display: grid;
    place-items: center;
}

.signup-box {
    background: white;
    padding: 4rem;
    /* Increased padding */
    border-radius: 1rem;
    width: 100%;
    max-width: 800px;
    /* Increased max-width */
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    position: relative;
    font-size: 1.2rem
}


.close-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    color: #666;
    transition: color 0.2s;
}

.close-button:hover {
    color: #000;
}

.form-header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.form-header h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.form-header p {
    color: #666;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.form-item {
    margin-bottom: 1.5rem;
}

.form-item label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
}

.form-item input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;
}

.form-item input:focus {
    outline: none;
    border-color: #4F46E5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.password-input {
    position: relative;
}

.toggle-password {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 0;
}

.password-strength {
    margin-top: 0.75rem;
}

.strength-bar {
    height: 4px;
    background-color: #eee;
    border-radius: 2px;
    overflow: hidden;
}

.strength-indicator {
    height: 100%;
    transition: width 0.3s ease;
}

.strength-indicator.weak {
    background-color: #EF4444;
}

.strength-indicator.medium {
    background-color: #F59E0B;
}

.strength-indicator.strong {
    background-color: #10B981;
}

.password-strength span {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.875rem;
}

.password-strength span.weak {
    color: #EF4444;
}

.password-strength span.medium {
    color: #F59E0B;
}

.password-strength span.strong {
    color: #10B981;
}

.consent-section {
    margin: 2rem 0;
}

.checkbox-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.checkbox-wrapper input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.25rem;
}

.checkbox-wrapper label {
    font-size: 0.875rem;
    color: #666;
    line-height: 1.5;
}

.checkbox-wrapper a {
    color: #4F46E5;
    text-decoration: none;
}

.checkbox-wrapper a:hover {
    text-decoration: underline;
}

.error-messages {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #FEF2F2;
    border-radius: 0.5rem;
    border: 1px solid #FCA5A5;
}

.error-messages p {
    color: #DC2626;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
}

.submit-button {
    width: 100%;
    background-color: #000000;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

.submit-button:hover {
    background-color: #000000;
}

.submit-button:disabled {
    background-color: #A5B4FC;
    cursor: not-allowed;
}

.form-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
}

.form-footer p {
    color: #666;
}

.form-footer a {
    color: #4F46E5;
    text-decoration: none;
    font-weight: 500;
}

.form-footer a:hover {
    text-decoration: underline;
}

.signup-box label,
.signup-box input,
.signup-box button {
    font-size: 1.2rem;
    /* Adjust font size for labels, inputs, and buttons */
}

/* Responsive Styles */
@media (max-width: 640px) {
    .signup {
        padding: 1rem;
    }

    .signup-box {
        padding: 2rem;
    }

    .form-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .form-header h2 {
        font-size: 1.5rem;
    }

    .checkbox-wrapper label {
        font-size: 0.8125rem;
    }
}
</style>