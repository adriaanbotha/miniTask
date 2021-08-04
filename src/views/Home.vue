<template>
  <div class="bg-white">
    <CategoryListFilter />
    <ProductList />
    <Pagination />
  </div>
</template>

<script>
import CategoryListFilter from "../components/CategoryListFilter.vue";
import ProductList from "../components/ProductList.vue";
import Pagination from "../components/Pagination.vue";

export default {
  name: "App",
  components: {
    CategoryListFilter,
    ProductList,
    Pagination,
  },
};
</script>
