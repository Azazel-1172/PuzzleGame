import { createStore } from "vuex";

export default createStore({
  state: {
    ImageList: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    },
  },
  mutations: {
    setImageList(state, payload) {
      const { ShowImageList, id } = payload;
      state.ImageList[id] = ShowImageList;
    },
  },
});
