import React, { Suspense } from "react";
import { useSetRecoilState } from "recoil";
import { listData, route } from "../../StateManager";
import ObjectList from "../reusables/ObjectList";


  export default function Login() {
    function reg(){
        window.open('http://localhost:3000/profile','_self' )
    }
    const setRoute = useSetRecoilState(route);
    setRoute("login");


    return(
        
        
        <div>
        <form className="container">  
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input type="text" className="form-control" id="lastname"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input type="text" className="form-control" id="firstname"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email"></input>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              id="usertype"
            >
              <option defaultValue>Open this select menu</option>
              <option value="1">Person</option>
              <option value="2">Company</option>
            </select>
          </div>
          <button onClick={reg} type="button" className="btn btn-primary" id="userbutton">
            Login
          </button>
          
        </form>
  
        <Suspense fallback={<p>Loading...</p>}>
          <ObjectList></ObjectList>
        </Suspense>
      </div>
         
      
    );
  }