import {React,useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./testcard.css";


const TestCard = () => {
    
        const [tests, setTests] = useState([]);

        useEffect(() => {
            axios.get("http://localhost:5000/api/tests")
                .then(response => {
                    setTests(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the test data!", error);
                });
        }, []);



  return (
    <>
        <div class="card">
            <div class="card-header">
                Test Name
            </div>
            <div class="card-header"></div>
            <div class="card-body">
                <p className="text-3xl bg-orange-600">Test Description</p>
                <p class="card-text">Test Date: 2023-10-10</p>
                <p class="card-text">Total Time of Test: 2 hours</p>
                <p class="card-text">Test Time: 10:00 AM</p>
               <button> <Link to="/testInstructions" class="btn">Attempt Test</Link></button>
            </div>
        </div>
    </>
  );
};

export default TestCard;
