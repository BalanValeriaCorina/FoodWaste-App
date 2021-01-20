import React, { useEffect } from "react";
import "../../resources/styles/profile.css";
import avatar from "../../resources/images/avatar.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { friends, user } from "../../StateManager";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Profile() {
  const currentUser = useRecoilValue(user); //takes the state of a user
  const setCurrentFriends = useSetRecoilState(friends); //update friends
  const history = useHistory(); //after refreshing the state of a user is lost, and this history is taking us back home then see if

  if (currentUser == undefined) {
    history.push("/");
  }

  let invites = [];
  if (currentUser.invites) {
    invites = JSON.parse(currentUser.invites);
  }

  useEffect(() => {
    Axios.get("http://localhost:8080/friends/" + currentUser.id)
      .then((res) => {
        setCurrentFriends(res.data.friends);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="wrapper">
      {invites.map((invite) => {
        return (
          <div
            key={invite.id}
            className="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            <strong>{invite.name} invited you to see their fridge!</strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        );
      })}
      <section className="container-fluid d-flex flex-column align-items-center">
        <img src={avatar} width="100px" height="100px"></img>
        <h2>
          Welcome back, {currentUser != undefined ? currentUser.firstName : ""}
        </h2>
      </section>
    </div>
  );
}
