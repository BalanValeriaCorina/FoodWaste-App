import { atom } from "recoil";

const listData = atom({
  key: "listDataState",
  default: [],
});

const route = atom({
  key: "routeState",
  default: "",
});

export { listData, route };
