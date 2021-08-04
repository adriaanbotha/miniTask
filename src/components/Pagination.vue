<template>
  <div v-if="!isProductLoading" class="px-64">
    <VueTailwindPagination
      :current="this.getProductsPaginatedData.current_page"
      :total="this.getProductsPaginatedData.total"
      :per-page="this.getProductsPaginatedData.per_page"
      @page-changed="getResults($event)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

export default {
  name: "Pagination",
  components: {
    VueTailwindPagination,
  },
  computed: {
    ...mapGetters([
      "getCategoriesFilter",
      "getProductsPaginatedData",
      "isProductLoading",
    ]),
  },

  methods: {
    ...mapActions(["fetchAllProducts"]),

    getResults(event) {
      this.$store.dispatch("fetchAllProducts", {
        page: event,
        categories_in: this.getCategoriesFilter.map((item) => item.id),
      });
    },
  },
};
</script>
