import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios';
import "./Operation.css"


function Operation() {
  let {id} = useParams()
  const [operationObject, setOperationObject] = useState({})

  const fecha = new Date(operationObject.dateOperation)

  useEffect(() => {
    axios.get(`http://localhost:3001/operations/byId/${id}`).then((response) => {
      setOperationObject(response.data)
    })
  }, [])
  
  return (
    <div className='postOperation'>
      
      <div className='typeOperation'>
        {operationObject.typeOperation === 'ingreso'
          ? <div className='green'>Ingreso</div>
          : <div className='red'>Egreso</div>
        }
      </div>
      <div className='conceptContainerOperation'>
        <label className='conceptLabelOperation'>Concepto: </label>
        <label className='conceptOperation'>{operationObject.concept}</label>
        
      </div>
      <div className='amountOperation'>Monto: ${operationObject.amount} </div>
      <div className="dateOperation"> 
          {fecha.getDay() < 10 ? '0' + fecha.getDay() : fecha.getDay()}/
          {fecha.getMonth() + 1 < 10 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1}/
          {fecha.getFullYear()}
      </div>
    </div>
  )
}

export default Operation