import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import FlatList from 'flatlist-react';
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoMdSync } from "react-icons/io"
import "./Operations.css";

export default function Operations() {
  const [listOfOperations, setListOfOperations] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/operations").then((response) => {
      setListOfOperations(response.data)
    })
  }, [])

  const deleteOperation = (id) => {
    axios.delete(`http://localhost:3001/operations/${id}`).then(() => {
      navigate("/")
    })
  }

  const renderOperation = (value, index) => {
    const fecha = new Date(value.dateOperation)

    return (
      <div className='operationContainer'>
        <div 
          key={index} 
          className="operation" 
          onClick={ () => {navigate(`/operation/${value.id}`)}}
        >
          <div className="date"> 
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
        <div className='iconContainer'> 
          <IoMdSync
            color="#008000" 
            className='updateIcon' 
            onClick={ () => {navigate(`/changeoperation/${value.id}`)} }
          />
          <RiDeleteBin6Line 
            color="#FF0000" 
            className='deleteIcon' 
            onClick={ () => {deleteOperation(value.id)} }
          />
        </div>
      </div>
    )
  }

  return (
    <div className='operationsContainer'>
      <FlatList 
        list={listOfOperations}
        renderItem={renderOperation}
        reversed
      />
    </div>
  )
}
