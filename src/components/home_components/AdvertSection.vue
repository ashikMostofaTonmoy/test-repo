<template>
  <section>
    <div class="">
      <div class="ad2">
        <advert-card
          advertText="These are the best fits for the summer season"
          advertTitle="spring/summer"
          backgroundImage="third"
          :haveButton="false"
        />
        <advert-card
          advertText="These are the best fits for the summer season"
          advertTitle="spring/summer"
          backgroundImage="fourth"
          :haveButton="false"
        />
        <advert-card
          advertText="These are the best fits for the summer season"
          advertTitle="spring/summer"
          backgroundImage="fifth"
          :haveButton="false"
        />
      </div>
    </div>
  </section>
</template>

<script>
import AdvertCard from "./cards/AdvertCard.vue";

export default {
  components: { AdvertCard },
  name: "AdvertSection",
};
</script>

<style scoped>
.ad1,
.ad2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ad2 {
  gap: 0rem;
}

@media (max-width: 670px) {
  .ad1,
  .ad2 {
    flex-wrap: wrap;
    gap: 0;
  }

  .ad2 advert-card {
    margin-bottom: 0;
  }
}
</style>
