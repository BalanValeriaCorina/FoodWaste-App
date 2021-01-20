import React from "react";
import { useRecoilValue } from "recoil";
import { currentFriend } from "../../StateManager";
import avatar from "../../resources/images/avatar.svg";

export default function FriendProfile() {
  let friend = useRecoilValue(currentFriend);

  return (
    <div>
      <section className="container-fluid d-flex flex-column align-items-center">
        <img src={avatar} width="100px" height="100px"></img>
        <h2>
          {friend != undefined ? friend.firstName + " " + friend.lastname : ""}
        </h2>
      </section>
    </div>
  );
}
