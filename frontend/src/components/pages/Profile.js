import React, { useEffect } from 'react';
import "../../resources/styles/profile.css";
import avatar from "../../resources/images/avatar.svg";
import { useRecoilValue } from 'recoil';
import { user } from '../../StateManager';
import { useHistory } from 'react-router-dom';

export default function Profile() {
  const currentUser = useRecoilValue(user);
  const history = useHistory();

  if(currentUser == undefined) {
    history.push("/");
  }

  return(
    <div className="wrapper">
      <section className="container-fluid d-flex flex-column align-items-center">
        <img src={avatar} width="100px" height="100px"></img>
        <h2>Welcome back, {currentUser!=undefined?currentUser.firstName:""}</h2>
      </section>
    </div>
  )

}