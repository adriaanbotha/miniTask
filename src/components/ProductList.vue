<template>
  <div class="h-full">
    <div v-if="isProductLoading" class="h-40 flex justify-center items-center">
      <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!isProductLoading" class="pt-8 flex justify-center items-center">
      <table
        class="border-2 border-black"
        style="width: -webkit-fill-available"
      >
        <thead
          class="
            font-bold
            border-1 border-black border-2 border-black
            bg-ab-grayLighter
          "
        >
          <th class="text-left">ID</th>
          <th>Name</th>
          <th>Sku</th>
        </thead>
        <tbody>
          <tr
            v-for="item in getProductList"
            :key="item"
            class="hover:bg-ab-grayLight cursor-pointer"
            @click="showDetail(item)"
          >
            <td class="pl-1">{{ item.id }}</td>
            <td class="pl-10">{{ item.name }}</td>
            <td class="pl-10">{{ item.sku }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="!isProductLoading"
      class="pt-5 h-8 flex italic justify-center items-center"
    >
      <p>Select the row above to view it's details...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "ProductList",
  data() {
    return {
      searchText: null,
    };
  },
  computed: {
    ...mapGetters(["getProductList", "isProductLoading"]),
  },
  methods: {
    ...mapActions(["fetchCategoryByIds"]),
    ...mapMutations(["setProductDetail"]),

    showDetail(itemDetail) {
      this.$store.commit("setProductDetail", itemDetail);
      this.$store.dispatch("fetchCategoryByIds", itemDetail.categories);
      this.$router.push({ name: "ProductItem", params: { id: itemDetail.id } });
    },
  },
};
</script>
