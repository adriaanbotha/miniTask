import axios from "axios";

// initial state
const state = () => ({
  categories: [],
  categoriesFilter: [],
  currentCategoryByIds: [],
  isCategoriesLoading: false,
  isCategoriesByIdLoading: false,
});

// getters
const getters = {
  getCategoryList: (state) => state.categories,
  getCategoriesFilter: (state) => state.categoriesFilter,
  getCurrentCategoryByIds: (state) => state.currentCategoryByIds,
  isCategoriesLoading: (state) => state.isCategoriesLoading,
  isCategoriesByIdLoading: (state) => state.isCategoriesByIdLoading,
};

// actions
const actions = {
  async fetchAllCategories({ commit }) {
    commit("setCategoriesIsLoading", true);
    let url = `https://www.adorebeauty.com.au/api/ecommerce/catalog/categories`;
    await axios
      .get(url)
      .then((res) => {
        const categories = res.data.data;
        commit("setCategories", categories);
        commit("setCategoriesIsLoading", false);
      })
      .catch((err) => {
        commit("setCategoriesIsLoading", false);
      });
  },
  async fetchCategoryByIds({ commit }, ids) {
    commit("setCategoriesByIdIsLoading", true);
    commit("clearCurrentCategoryByIds");

    ids.forEach(async (id) => {
      let url = `https://www.adorebeauty.com.au/api/ecommerce/catalog/categories/${id}`;
      await axios
        .get(url)
        .then((res) => {
          const categoryName = res.data.data;
          commit("currentCategoryByIdsPush", res.data.data.name);
          commit("setCategoriesByIdIsLoading", false);
        })
        .catch((err) => {
          commit("setCategoriesByIdIsLoading", false);
        });
    });
  },
};

// mutations
const mutations = {
  setCategories: (state, categories) => {
    state.categories = categories;
  },

  setCategoriesFilterPush: (state, categoriesToFilter) => {
    state.categoriesFilter.push(categoriesToFilter);
  },

  setCategoriesFilterPop: (state) => {
    if (state.categoriesFilter.length > 0) {
      state.categoriesFilter.pop();
    }
  },

  clearCategoriesFilter: (state) => {
    state.categoriesFilter = [];
  },

  clearCurrentCategoryByIds: (state) => {
    state.currentCategoryByIds = [];
  },

  setCategoriesIsLoading(state, isLoading) {
    state.isCategoriesLoading = isLoading;
  },

  currentCategoryByIdsPush: (state, idName) => {
    state.currentCategoryByIds.push(idName);
  },

  setCategoriesByIdIsLoading(state, isLoading) {
    state.isCategoriesByIdLoading = isLoading;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
