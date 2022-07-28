import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai"
import FlatList from 'flatlist-react';
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

  const renderOperation = (value, index) => {
    const fecha = new Date(value.dateOperation)
    return(
      <div 
        key={index} 
        className="operationHome" 
        onClick={ () => {navigate(`/operation/${value.id}`)}}
      >
        <div className="dateHome"> 
          {fecha.getDay() < 10 ? '0' + fecha.getDay() : fecha.getDay()}/
          {fecha.getMonth() + 1 < 10 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1}/
          {fecha.getFullYear()}
        </div>
        <div className="conceptHome"> {value.concept} </div>
        <div className="amountContainerHome">
          { value.typeOperation === 'egreso' 
            ? <div className='amountHome red'> {value.amount} </div> 
            : <div className='amountHome green'> {value.amount} </div> }
        </div>
      </div>
    )
  }
  
  return (
    <div className="homeContainer">
      {listOfOperations.forEach((value, index) => {
        value.typeOperation === 'ingreso' 
          ? total += value.amount 
          : total -= value.amount
      })}
      <div className='total'>
        <h1> Balance Total: {total} </h1>
      </div>
      <div className='newOperationContainer'> 
        <AiFillPlusCircle 
          color="#00a680" 
          className='newOperationIcon' 
          onClick={ () => {navigate(`/createoperation`)} }
        /> 
      </div>
      <div>
        <FlatList 
          list={listOfOperations}
          renderItem={renderOperation}
          limit={10}
          reversed
        /> 
      </div>
    </div>
  )
}

export default Home