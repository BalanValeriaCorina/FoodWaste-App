import React, { useEffect } from 'react';
import "../../resources/styles/profile.css";
import avatar from "../../resources/images/avatar.svg";
import { useRecoilValue } from 'recoil';
import { user } from '../../StateManager';
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import Toast from 'react-bootstrap/Toast'
import Popup from './popup';


// class Food extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={food:[]};
//   }

//   save(){
//     var food=[...this.state.food];
//     food.push(this.newproduct.value)
//     this.setState({food});
//   }
// };




export default function Profile() {

  
  
  
  useEffect(() => {
    let addbutton = document.getElementById("addbutton");
    addbutton.addEventListener("click", () => {
      console.log("sfe")
    var date=document.getElementById("expirationdate").value;
    var inpDate= new Date(date);
    var currDate=new Date();

    if(inpDate.setHours(0, 0, 0, 0) ==  currDate.setHours(0, 0, 0, 0)) 
          { 
              console.log("This date si today")
          }
     if(inpDate.setHours(0, 0, 0, 0) <  currDate.setHours(0, 0, 0, 0)) {
      console.log("The date passsed");
      
  }

      let product = document.getElementById("productname");
      let quantity = document.getElementById("quantity");
        let measurementUnit = document.getElementById("Measurementunit");

        Axios.post("http://localhost:8080/product", {
      quantity: quantity.value,
      measurementUnit: measurementUnit.value
      
    })

    .then((res) => {
      console.log(res);
      
    })
    .catch((err) => {
      console.error(err);
    });



}); 
}, []);





  
  


  const currentUser = useRecoilValue(user);
  const history = useHistory();

  if(currentUser == undefined) {
    history.push("/");}

  

  return(

    <main>
    <div className="wrapper">
      <section className="container-fluid d-flex flex-column align-items-center">
        <img src={avatar} width="100px" height="100px"></img>
        <h2>Welcome back, {currentUser!=undefined?currentUser.firstName:""}</h2>
      </section>
    </div>
    

    
    <div className="product">
    <form className="container">
        <div className="mb-3">
          <label htmlFor="Product Name" className="form-label">
            Product Name
          </label>
          <input type="text" className="form-control" id="productname"></input>
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
          <input type="text" className="form-control" id="Measurementunit"></input>
          </div>
          <div className="mb-3">
          <label htmlFor="Expirationdate" className="form-label">
            Expiration Date
          </label>
          <input type="date" className="form-control" id="expirationdate"></input>
          </div>
          <button 
          type="button"
          className="btn btn-primary"
          id="addbutton"
        >
          Add
        </button>
        <button 
          type="button"
          className="btn btn-primary"
          id="Removebutton"
        >
          Remove
        </button>
          </form>
    </div>


    <div className="list">
      <ul>
        
      </ul>
    </div>

    
    </main>
  )

}
