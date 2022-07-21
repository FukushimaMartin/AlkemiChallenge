import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios';
import "./Post.css"


function Operation() {
  let {id} = useParams()
  const [operationObject, setOperationObject] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:3001/operations/byId/${id}`).then((response) => {
      setOperationObject(response.data)
    })
  }, [])

  
  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='typeOperation'>{operationObject.typeOperation}</div>
        <div className='amount'>{operationObject.amount}</div>
        <div className='concept'>{operationObject.concept}</div>
        <div className='dateOperation'>{operationObject.dateOperation}</div>
      </div>
    </div>
  )
}

export default Operation