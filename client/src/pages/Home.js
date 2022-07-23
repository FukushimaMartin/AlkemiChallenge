import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "./Home.css";

function Home() {
  const [listOfOperations, setListOfOperations] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/operations").then((response) => {
      setListOfOperations(response.data)
    })
  }, [])
  var total = 0
  

  return (
    <div className="App">
      {listOfOperations.forEach((value, index) => {
        value.typeOperation === 'ingreso' 
          ? total += value.amount 
          : total -= value.amount
      })}
      <div className='total'>
        <h1> Balance Total: {total} </h1>
      </div>
      {/*                     index = key    */}
      {listOfOperations.map((value, index) => {
        const fecha = new Date(value.dateOperation)
        
        return (
          <div 
            key={index} 
            className="operation" 
            onClick={ () => {navigate(`/operation/${value.id}`)}}
          >
            <div className="dateOperation"> 
              {fecha.getDay() < 10 ? '0' + fecha.getDay() : fecha.getDay()}/
              {fecha.getMonth() + 1 < 10 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1}/
              {fecha.getFullYear()}
            </div>
            <div className="concept"> {value.concept} </div>
            <div className="amountContainer">
              { value.typeOperation === 'egreso' 
                ? <div className='amount red'> {value.amount} </div> 
                : <div className='amount green'> {value.amount} </div> }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home