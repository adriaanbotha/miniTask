// import { GET_ALL_PRODUCTS } from "./Types";
import axios from "axios";

// initial state
const state = () => ({
  products: [],
  productsPaginatedData: {
    current_page: 1,
  },
  product: null,
  isProductLoading: false,
});

// getters
const getters = {
  getProductList: (state) => state.products,
  getProductsPaginatedData: (state) => state.productsPaginatedData,
  getProduct: (state) => state.product,
  isProductLoading: (state) => state.isProductLoading,
};

// actions
const actions = {
  async fetchAllProducts({ commit }, query = null) {
    let page = 1;
    let categories_in = [];
    let limit = 10;
    if (query !== null) {
      page = query ? query.page : page;
      categories_in = query.categories_in;
    }
    commit("setProductIsLoading", true);
    let url = "";
    if (categories_in.length > 0) {
      url = `https://www.adorebeauty.com.au/api/ecommerce/catalog/products?categories:in=${categories_in}&limit=${limit}&page=${page}`;
    } else {
      url = `https://www.adorebeauty.com.au/api/ecommerce/catalog/products?limit=${limit}&page=${page}`;
    }
    await axios
      .get(url)
      .then((res) => {
        const products = res.data.data;
        commit("setProducts", products);
        commit("setProductsPaginated", res.data.meta.pagination);
        commit("setProductIsLoading", false);
      })
      .catch((err) => {
        commit("setProductIsLoading", false);
      });
  },
};

// mutations
const mutations = {
  setProducts: (state, products) => {
    state.products = products;
  },

  setProductsPaginated: (state, productsPaginatedData) => {
    state.productsPaginatedData = productsPaginatedData;
  },

  setProductDetail: (state, product) => {
    state.product = product;
  },

  setProductDetailInput: (state, e) => {
    let product = state.product;
    product[e.target.name] = e.target.value;
    state.product = product;
  },

  setProductIsLoading(state, isLoading) {
    state.isProductLoading = isLoading;
  },
};

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
