<template>
    <section class="newsletter p-5 bg-gray-100">
        <div class="container mx-auto">
            <div class="newsletter-container text-center">
                <div class="newsletter-heading mb-4">
                    <h3 class="text-2xl font-bold">Subscribe to Our Newsletters</h3>
                    <p class="text-lg">
                        To stay up-to-date with our new arrivals and
                        <span class="font-semibold"> coupon giveaways.</span>
                    </p>
                </div>
                <form class="flex flex-col md:flex-row justify-center items-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        class="p-2 border border-gray-300 rounded-md mb-2 md:mb-0 md:mr-2 w-full md:w-1/3"
                    />
                    <button class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: "NewsLetter",
};
</script>

<style scoped>
.newsletter {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--dim-blue);
    color: white;
    min-height: 27vh;
}

.newsletter-heading p {
    color: white;
}

.newsletter-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
}

.newsletter-container p span {
    color: #05d3ee;
}

form {
    width: 40%;
    position: relative;
    margin-inline: auto;
    display: flex;
}

form input {
    width: 100%;
    padding: 1.6rem 2rem;
    font-size: 1.6rem;
    border-radius: 6px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border: none;
    outline: none;
}

form button {
    padding: 1.5rem 2.6rem;
    font-size: 1.7rem;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    font-weight: 500;
    color: white;
    background-color: var(--dark-green);
}

form button:hover {
    background-color: var(--grey);
}

@media (max-width: 999px) {
    .newsletter {
        text-align: center;
    }
    .newsletter-container {
        justify-content: center;
    }
    form {
        width: 100%;
    }
}
</style>
