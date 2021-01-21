import React, { useEffect } from "react";
import "../../resources/styles/profile.css";
import avatar from "../../resources/images/avatar.svg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { user, friends, currentProducts } from "../../StateManager";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Facebook from "./facebook.jpg";
import Instagram from "./insta.jpg";

export default function Profile() {
  const currentUser = useRecoilValue(user); //takes the state of a user
  const setCurrentFriends = useSetRecoilState(friends); //update friends
  const history = useHistory(); //after refreshing the state of a user is lost, and this history is taking us back home then see if
  const [products, setProducts] = useRecoilState(currentProducts);

  function getProducts() {
    //get products from db
    Axios.get("http://localhost:8080/products/" + currentUser.id)
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (currentUser == undefined) {
    history.push("/");
  }

  let invites = []; //doar afisarea invitatiilor pe profil
  if (currentUser.invites) {
    invites = JSON.parse(currentUser.invites);
  }

  // open social media apps
  function openfb() {
    let fbbutton = document.getElementById("facebook");
    fbbutton.addEventListener("click", () => {
      window.open("https://ro-ro.facebook.com/");
    });
  }

  function openinsta() {
    let instabutton = document.getElementById("instagram");
    instabutton.addEventListener("click", () => {
      window.open("https://www.instagram.com/");
    });
  }

  // insert product in database

  useEffect(() => {
    getProducts(); //take prods from db at the loading stage

    Axios.get("http://localhost:8080/friends/" + currentUser.id)
      .then((res) => {
        setCurrentFriends(res.data.friends);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    let addbutton = document.getElementById("addbutton"); //Mariana's code
    addbutton.addEventListener("click", () => {
      console.log("sfe");
      var date = document.getElementById("expirationdate").value;
      var inpDate = new Date(date);
      var currDate = new Date();

      if (inpDate.setHours(0, 0, 0, 0) == currDate.setHours(0, 0, 0, 0)) {
        console.log("This date si today");
      }
      if (inpDate.setHours(0, 0, 0, 0) < currDate.setHours(0, 0, 0, 0)) {
        console.log("The date passsed");
      }

      let product = document.getElementById("productname");
      let quantity = document.getElementById("quantity");
      let measurementUnit = document.getElementById("Measurementunit");

      Axios.post("http://localhost:8080/product", {
        //add a new product to the db
        id: currentUser.id,
        foodName: product.value,
        quantity: quantity.value,
        measurementUnit: measurementUnit.value,
      })
        .then((res) => {
          getProducts();
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, [setProducts]);

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

      {/* Product form */}
      <div className="product">
        <form className="container">
          <div className="mb-3">
            <label htmlFor="Product Name" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="productname"
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="Quantity" className="form-label">
              Quantity
            </label>
            <input type="number" className="form-control" id="quantity"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="Quantity" className="form-label">
              Quantity
            </label>
            <input type="number" className="form-control" id="quantity"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="Measurementunit" className="form-label">
              Measurement Unit
            </label>
            <input
              type="text"
              className="form-control"
              id="Measurementunit"
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="Expirationdate" className="form-label">
              Expiration Date
            </label>
            <input
              type="date"
              className="form-control"
              id="expirationdate"
            ></input>
          </div>
          <button type="button" className="btn btn-primary" id="addbutton">
            Add
          </button>
          <button
            type="button"
            className="btn btn-primary ml-4"
            id="Removebutton"
          >
            Remove
          </button>
        </form>
      </div>

      <div className="list">
        <ul className="w-100">
          {products.map((prod) => {
            return (
              <div
                className="d-flex justify-content-around"
                key={prod.userId + " - " + prod.foodId}
              >
                <h4>{prod.name}</h4>
                <h5>
                  {prod.quantity} {prod.measurementUnit}
                </h5>
              </div>
            );
          })}
        </ul>
      </div>

      {/* Button for social media */}
      <div className="socialmedia">
        <img onClick={openfb} id="facebook" src={Facebook} />
        <img onClick={openinsta} id="instagram" src={Instagram} />
      </div>
    </div>
  );
}
