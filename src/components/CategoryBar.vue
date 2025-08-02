<template>
  
</template>



<script>
import axios from "@/axios";

export default {
  name: "CategoryBar",
  data() {
    return {
      activeCategory: null,
      hideTimeout: null,
      categories: [
        // { name: "Women", subcategories: ["Dresses", "Tops", "Shoes", "Accessories"] },
      ]
    };
  },
  async created() {
    let res = await axios.get("/menu-items/");
    let res2 = await axios.get("/category/");
    // Create a map of categories by ID
    let categoryMap = {};
    res.data.forEach(category => {
      categoryMap[category.id] = {
        id: category.id,
        name: category.name,
        subcategories: []
      };
    });

    // Populate subcategories
    res2.data.forEach(category => {
      // if (category.parent !== null) {
      //     if (categoryMap[category.parent]) {
      //         categoryMap[category.parent].subcategories.push(category.name);
      //     }
      // }
      // if (category.id == categoryMap[category.id]){
      categoryMap[category.parent].subcategories.push({name: category.name, image: category.logo});
      // }


    });

    // Extract only top-level categories (parent === null)
    // this.categories = res.data
    //     .filter(category => category.parent === null)
    //     .map(category => categoryMap[category.id]);
    this.categories = categoryMap


    console.log(this.categories);
  },
  methods: {
    showMenu(category) {
      clearTimeout(this.hideTimeout);
      this.activeCategory = category;
    },
    hideMenu() {
      this.hideTimeout = setTimeout(() => {
        this.activeCategory = null;
      }, 200);
    },
    cancelHide() {
      clearTimeout(this.hideTimeout);
    }
  }
};
</script>

<style scoped>
.category-bar {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  scrollbar-width: none;
  /* Hide scrollbar for Firefox */
  -ms-overflow-style: none;
  /* Hide scrollbar for IE/Edge */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.category-bar::-webkit-scrollbar {
  display: none;
  /* Hide scrollbar for Chrome, Safari, and Opera */
}

.category-bar a {
  font-size: 16px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  flex-shrink: 0;
}

</style>