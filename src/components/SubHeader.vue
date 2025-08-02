<template>
  <div class="sub-heading bg-dim-blue text-white h-20vh flex flex-col items-center justify-center p-6 mb-10">
    <h2 class="text-5xl font-bold mb-2">{{ heading }}</h2>
    <p class="text-xl text-grey">{{ subHeading }}</p>
  </div>
</template>

<script>
export default {
  name: "SubHeader",
  props: {
    heading: String,
    subHeading: String,
  },
};
</script>

<style scoped>
.sub-heading {
  background-color: var(--dim-blue);
  color: white;
  height: 20vh;
  display: grid;
  place-content: center;
  text-align: center;
  margin-bottom: 2.5rem;
}

.sub-heading p {
  font-size: 1.9rem;
  color: var(--grey);
}
</style>