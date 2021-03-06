import React, {useState} from 'react';
import './App.css';
import {firebaseApp} from "./firebase-config";

function App() {

    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const  [success, setSuccess] = useState("");

    const addToFirebase = () => {

        console.log("addToFirebase was called")

        setError("")
        setSuccess("")

        if(name !== "") {
            console.log("Name:  " + name);
            // upload to firebase

            firebaseApp
                .firestore()
                .collection("names")
                .add({
                    name: name
                })
                .then((res) => {
                    console.log(res);
                    // successful
                    setSuccess("Thank you for adding your name")

                })
                .catch((err) => {
                    console.log(err);
                    // error was shown
                    setError(err.message)
                })

        } else {
            setError("Please enter name")
        }
    }


  return (
    <div className="container">
        { error !== "" && <div className="alert alert-danger">{error}</div> }
        { success !== "" && <div className="alert alert-success">{success}</div> }
        <input className="form-control" type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value) } />
      <button className="btn btn-primary" onClick={() => addToFirebase()} >Submit to firebase</button>
    </div>
  );
}

export default App;
