<template>
  <div class="bg-white">
    <div
      class="
        py-2
        w-full
        text-ab-grayDark
        flex
        items-center
        border-b-2 border-ab-grayDark
      "
    >
      <p
        class="p-2 hover:bg-ab-grayDark hover:text-white cursor-pointer"
        @click="goBack"
      >
        &lt; Back to list
      </p>
    </div>
    <div class="flex flex-col items-center justify-evenly">
      <h1 class="text-4xl">{{ this.getProduct.name }}</h1>
      <p class="text-xl">{{ getCategaryNames }}</p>
      <div
        v-if="isCategoriesByIdLoading"
        class="h-8 flex justify-center items-center"
      >
        <i class="fa fa-refresh fa-spin fa-1x fa-fw"></i>
        <span class="sr-only">Loading...</span>
      </div>
      <p v-if="!isCategoriesByIdLoading" class="text-xl">
        SKU: {{ this.getProduct.sku }}
      </p>
      <p class="text-xl">
        Price: {{ getCurrencyFormat(this.getProduct.price) }}
      </p>
      <div
        class="pt-5 text-xl text-center"
        v-html="getParagraph(this.getProduct.description)"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductItem",
  props: ["id"],
  computed: {
    ...mapGetters([
      "getProduct",
      "getCategoryList",
      "getCurrentCategoryByIds",
      "isCategoriesByIdLoading",
    ]),
    getCategaryNames() {
      return this.getCurrentCategoryByIds
        .join(", ")
        .toString()
        .toLocaleLowerCase();
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getCurrencyFormat(num) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "AUD",
      });
      return formatter.format(num);
    },
    getParagraph(par) {
      return "Description: ".concat(par);
    },
  },
};
</script>
