<template>
  <div class="grid grid-cols-6">
    <div class="col-start-3 col-span-2 mt-2">
      <input
        class="w-full p-2 border-2 border-black"
        type="text"
        v-model="searchText"
        placeholder="Search Products by Category..."
      />
    </div>
    <div class="mt-2">
      <button class="w-20 bg-black text-white" style="height: 44px">
        <i class="text-white fa fa-search"> Add</i>
      </button>
    </div>
    <div
      v-if="searchText"
      class="
        py-2
        w-full
        col-start-3 col-span-2
        border-2 border-black
        bg-ab-grayLighter
      "
    >
      <ul>
        <li
          class="cursor-pointer"
          v-for="data in resultQuery"
          :key="data"
          @click="selectCategory(data)"
        >
          {{ data.name }}
        </li>
      </ul>
    </div>
  </div>
  <div class="pt-1 grid grid-cols-6">
    <div class="col-start-2 col-span-3 flex items-center">
      <label>Categories: </label>
      <p class="font-bold italic pl-2">{{ this.resultCategories }}</p>
    </div>
    <div>
      <button
        class="w-20 p-2 bg-black text-white"
        @click="this.setCategoriesFilterPopNow"
      >
        <i class="text-white fa fa-eraser"> </i> Last
      </button>
      <button
        class="ml-1 w-20 p-2 bg-black text-white"
        @click="this.clearCategoriesFilterNow"
      >
        <i class="text-white fa fa-trash"></i> All
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      searchText: null,
    };
  },
  computed: {
    ...mapGetters([
      "getCategoryList",
      "getCategoriesFilter",
      "getProductsPaginatedData",
    ]),
    resultQuery() {
      if (this.searchText) {
        return this.getCategoryList.filter((item) => {
          return this.searchText
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      }
    },
    resultCategories() {
      return this.getCategoriesFilter
        .map((item) => item.name)
        .join(" | ")
        .toString();
    },
  },

  methods: {
    ...mapActions(["fetchAllProducts"]),
    ...mapMutations([
      "setCategoriesFilterPush",
      "setCategoriesFilterPop",
      "clearCategoriesFilter",
    ]),

    selectCategory(data) {
      this.$store.commit("setCategoriesFilterPush", data);
      this.searchText = "";

      let query = {
        page: this.getProductsPaginatedData.current_page,
        categories_in: this.getCategoriesFilter.map((item) => item.id),
      };
      // Retrieve latest products by category
      this.$store.dispatch("fetchAllProducts", query);
    },
    clearCategoriesFilterNow() {
      this.$store.commit("clearCategoriesFilter");
      this.clearResults();
    },
    setCategoriesFilterPopNow() {
      this.$store.commit("setCategoriesFilterPop");
      this.clearResults();
    },
    clearResults() {
      let query = {
        page: 1,
        categories_in: [],
      };
      this.$store.dispatch("fetchAllProducts", query);
    },
  },
};
</script>
