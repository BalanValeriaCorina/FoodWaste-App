import Axios from "axios";
import React from "react";
import { useEffect, Suspense } from "react";
import { useSetRecoilState } from "recoil";
import { listData, route } from "../../StateManager";
import ObjectList from "../reusables/ObjectList";

export default function Group() {
  const setData = useSetRecoilState(listData);
  const setRoute = useSetRecoilState(route);
  setRoute("groups");

  useEffect(() => {
    Axios.get("http://localhost:8080/groups")
      .then((res) => {
        let data = [];
        Array.from(res.data).forEach((element) => {
          data.push({
            id: element.id,
            name: element.name,
          });
        });
        setData(data);
      })
      .catch((err) => console.error(err));

    let groupbutton = document.getElementById("groupbutton");
    groupbutton.addEventListener("click", () => {
      let groupName = document.getElementById("groupname");

      Axios.post("http://localhost:8080/groups", {
        name: groupName.value,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, [setData]);

  return (
    <div>
      <h2>Group</h2>

      <form className="container">
        <div className="mb-3">
          <label htmlFor="groupid" className="form-label">
            Group ID
          </label>
          <input type="number" className="form-control" id="groupid"></input>
        </div>

        <div className="mb-3">
          <label htmlFor="groupname" className="form-label">
            Group Name
          </label>
          <input type="text" className="form-control" id="groupname"></input>
        </div>

        <button type="button" className="btn btn-primary" id="groupbutton">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-success ml-2"
          id="groupbutton-update"
        >
          Update Group
        </button>
      </form>

      <Suspense fallback={<p>Loading...</p>}>
        <ObjectList></ObjectList>
      </Suspense>
    </div>
  );
}
