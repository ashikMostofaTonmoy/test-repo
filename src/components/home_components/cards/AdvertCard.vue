<template>
    <article :class="backgroundImage">
        <div class="content">
            <h5>{{ advertTitle }}</h5>
            <p>{{ advertText }}</p>
            <button v-if="haveButton" :aria-label="buttonText">
                {{ buttonText }}
            </button>
        </div>
    </article>
</template>

<script>
export default {
    name: "AdvertCard",
    props: {
        advertTitle: String,
        advertText: String,
        buttonText: String,
        backgroundImage: String,
        haveButton: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style scoped>

.first {
    background-image: url("@/assets/images/banner/b17.webp");
}
.second {
    background-image: url("@/assets/images/banner/b10.webp");
}
.third {
    background-image: url("https://www.next.co.uk/cms/resource/blob/847156/b6db94418681ba9a544b2f258a83f8d1/210125-block4-womens-live-amend-data.jpg");
}
.fourth {
    background-image: url("https://www.next.co.uk/cms/resource/blob/838314/c5bd6be271eeb6e5a8b39c89856e5917/160125-block5-new-data.jpg");
    background-position: 40%;
}
.fifth {
    background-image: url("https://www.next.co.uk/cms/resource/blob/834612/fd25b4afe57a1ebd45a13104775bab43/160125-block6-data.jpg");
    background-position: 40%;
}

article {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-end; /* Align content to the bottom */
    justify-content: flex-start; /* Align content to the left */
    position: relative; /* For overlay effect */
    width: 100%;
    padding: 0;
    color: white;
    min-height: calc(100vh - 65px);
    /* margin-bottom: 1rem; */
    overflow: hidden; /* To clip content if needed */
}

article::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%; /* Adjust dark overlay height */
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    z-index: 1;
    pointer-events: none;
}

.content {
    position: relative;
    z-index: 2; /* Ensure content is above the overlay */
    padding: 2rem;
    text-align: left; /* Left-align text */
    max-width: 60%; /* Optional: Restrict text width */
}


h5 {
    font-size: 2rem;
}

article p {
    margin-top: 1rem;
    padding: 0;
    color: white;
}

button {
    border-radius: 0px;
    border: 1px solid white;
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    color: white;
    font-weight: 600;
    background-color: transparent;
    padding: 1.3rem 2.4rem;
    margin-top: 1rem;
}

article:hover button {
    border-color: ghostwhite;
    background-color: ghostwhite;
    color: black;
}

@media (max-width: 799px) {
    article {
        min-height: 60vh;
        background-size: cover; 
    }
}

@media (max-width: 670px) {
    article {
        min-height: auto;
        height: auto;
        aspect-ratio: 3 / 4; 
        background-size: fill; 
    }
}
</style>
