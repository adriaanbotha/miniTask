import { createStore, createLogger } from "vuex";
import category from "./modules/Category";
import product from "./modules/Product";

const debug = process.env.NODE_ENV !== "production";

const Store = createStore({
  modules: {
    category,
    product,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default Store;
