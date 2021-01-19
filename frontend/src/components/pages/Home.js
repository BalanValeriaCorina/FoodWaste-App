import React from "react";
import "../../resources/styles/home.css";
import fridge from "../../resources/images/fridge.svg";
import give_food from "../../resources/images/give_food.svg";
import Jumbotron from "../reusables/Jumbotron";

export default function Home() {
  return (
    <div>
      <Jumbotron></Jumbotron>
      <section className="container-fluid d-flex flex-md-row flex-column justify-content-md-between align-items-center presentation-section">
        <img src={fridge}></img>
        <p className="text-center">
          List the contents of your fridge that are about to go bad and share
          them with your friends or other people on social media. They'll sure
          find something tasty in there!
        </p>
      </section>
      <section className="container-fluid d-flex flex-md-row-reverse flex-column justify-content-md-between align-items-center presentation-section">
        <img src={give_food}></img>
        <p className="text-center">
          Instead of thowing away the food you think you don't need, gift it to people
          that would otherwise pay for it.
        </p>
      </section>
    </div>
  );
}
