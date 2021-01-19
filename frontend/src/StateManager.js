import { atom } from "recoil";

const listData = atom({
  key: "listDataState",
  default: [],
});

const route = atom({
  key: "routeState",
  default: "",
});

const user = atom({
  key: "userState",
  default: undefined
})

export { listData, route, user };
