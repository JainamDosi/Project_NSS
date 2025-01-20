import {React,useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./testcard.css";


const TestCard = ({ test }) => {
    
        



  return (
    <>
        <div class="card">
            <div class="card-header">
                {test.name}
            </div>
            <div class="card-header"></div>
            <div class="card-body">
                <p className="text-base">{test.description}</p>
                <p class="card-text">Test Date: {test.testDate}</p>
                <p class="card-text">Total Time of Test: {test.duration}</p>
                <p class="card-text">Test Time: 10:00 AM</p>
               <button className="btn bg-slate-500 rounded-md">
                   Attempt Test
               </button>
            </div>
        </div>
    </>
  );
};

export default TestCard;
