<template>
    <router-view />
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";

export default {
    name: "App",
    computed: {
        ...mapGetters(["getAccessToken"]) // Correct way to map getters
    },
    async created() {
        await this.verifyUser();
    },
    methods: {
        ...mapActions(["remove_user"]),
        async verifyUser() {
            const accessToken = this.getAccessToken;

            const tokenParts = accessToken.split('.');
            if (tokenParts.length !== 3) {
                return;
            }

            try {
                const decodedPayload = atob(tokenParts[1]);
                const parsedPayload = JSON.parse(decodedPayload);

                const currentTime = Date.now() / 1000;  
                if (parsedPayload.exp && parsedPayload.exp < currentTime) {
                    this.remove_user(); 
                    return;
                }

            } catch (error) {
                console.error("Error decoding token:", error);
            }

        }
    }
};
</script>

<style lang="scss">
/* Default Styles */
@import url("https://fonts.googleapis.com/css?family=League+Spartan:100,200,300,regular,500,600,700,800,900");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

:root {
    /* Primary Colors */
    --text: #4e4537;
    --brown: #926c00;
    --grey: #98b0a8;
    --dim-blue: #000000;
    --dark-blue: #2f4858;
    --dark-green: #000000;
    --light-green: #00b89323;
    --bg: #f0eff4;
    --purple: #845ec2;
    --grey-2: rgba(228, 220, 220, 0.767);
    --red: #f51a2d;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    /* font-display: swap; */
}

html {
    font-size: 62.5%;
}

body {
    color: var(--text);
    width: 100%;
}

html,
body {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #d6d6d6;
}

::-webkit-scrollbar {
    width: 4px;
    height: 1px;
}

::-webkit-scrollbar-track {
    border-radius: 24px;
}

::-webkit-scrollbar-thumb {
    width: 4px;
    background-color: #d6d6d6;
    border-radius: 24px;
}

section {
    width: 100%;
    padding-block: 5px;
}

.container {
    width: 85%;
    margin-inline: auto;
    max-width: 1440px;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.25s, color 0.25s;
    border: none;
}



h1 {
    font-size: 5rem;
    line-height: 6rem;
}

h2 {
    font-size: 4.6rem;
    line-height: 5.4rem;
}

h3 {
    font-size: 3.2rem;
    line-height: 4.4rem;
}

h4 {
    font-size: 2rem;
}

h6 {
    font-size: 1.2rem;
    font-weight: 700;
}

p {
    font-size: 1.7rem;
    color: #535348;
    font-weight: 400;
    padding-block: 1rem;
}

ul {
    list-style-type: none;
}

input,
textarea {
    border-radius: 5px;
    border: 1px solid lightgrey;
    padding: 12px;
    font-size: 1.6rem;
}

input[type="number"] {
    margin-right: 1rem;
    padding: 1rem 0 1rem 1rem;
    outline: none;
    width: 5rem;
}

/* Validation Colors */
.weak {
    color: #ff0000;
}

.medium {
    color: #ffc107;
}

.strong {
    color: #4caf50;
}




// probhlems begin here

.container .hero__text h3 {
    font-size: 3.2rem !important;
    line-height: 4.4rem !important;
}

.container h3 {
    font-size: 3.2rem !important;
    line-height: 4.4rem !important;
}

.container .hero__text h4 {
    font-size: 2rem !important;
}

.footer-col h4 {
    font-size: 2rem;
}

.products h2 {
    display: inline-block;
    margin-bottom: 10px;

    font-size: 4.6rem;
    line-height: 5.4rem;
}




</style>
