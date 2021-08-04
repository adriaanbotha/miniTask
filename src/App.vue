<template>
  <div class="bg-white h-full">
    <Header />
    <div class="">
      <div class="container mx-auto">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../src/components/Header.vue";
import Footer from "../src/components/Footer.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapActions(["fetchAllCategories", "fetchAllProducts"]),
  },
  created() {
    this.$store.dispatch("fetchAllCategories");
    let query = {
      page: 1,
      categories_in: [],
    };
    this.$store.dispatch("fetchAllProducts", query);
  },
};
</script>
