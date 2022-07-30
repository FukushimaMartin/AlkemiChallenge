import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
// import * as Yup from "yup"
import axios from 'axios';
import './ChangeOperation.css'

function ChangeOperation() {
  let {id} = useParams()
  let navigate = useNavigate()
  const [operationObject, setOperationObject] = useState({})


  useEffect(() => {
    axios.get(`http://localhost:3001/operations/byId/${id}`).then((response) => {
      setOperationObject(response.data)
    })
  }, [])

  const fecha = new Date(operationObject.dateOperation)

  const initialValues = {
    id: id,
    amount: operationObject.amount,
    concept: operationObject.concept,
    dateOperation: operationObject.dateOperation,
  }
  /*const validationSchema = Yup.object().shape({
    amount: Yup.number().required(),
    concept: Yup.string().min(3).max(30).required(),
    dateOperation: Yup.date().required()
  })*/

  const onSubmit = (data) => {
    axios.put("http://localhost:3001/operations/changeOperation", data).then((response) => {
      navigate(`/operation/${id}`)
    })
  }

  return (
    <div className='changeOperationContainer'>
      <div className='changeOperation'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} /*validationSchema={validationSchema}*/>
          <Form className='formChangeContainer'>
            <div className='typeOperation'>
              {operationObject.typeOperation === 'ingreso'
                ? <div className='green'>Ingreso</div>
                : <div className='red'>Egreso</div>
              }
            </div>

            <div className='conceptContainerChangeOperation'>
              <label className='labelChangeOperation'>Concepto: </label>
              <Field
                autocomplete= "off"
                id= "inputChangeConcept" 
                name= "concept"
                placeholder={operationObject.concept}
                />
            </div>
            <ErrorMessage name="concept" component="span"/>
              
            <div className='amountContainerChangeOperation'>
              <div className='labelChangeOperation'>Monto: </div>
              <Field type="number"
                autocomplete= "off"
                id= "inputChangeAmount"
                name= "amount"
                placeholder= {operationObject.amount}
                />
            </div>
            <ErrorMessage name="amount" component="span"/>

            <div className='dateContainerChangeOperation'>
              <div className='labelChangeOperation'>Fecha: </div>
              <Field type="date"
                autocomplete="off"
                id="inputChangeDate"
                name="dateOperation"
                />
              <div className="dateChangeOperation"> 
                {fecha.getDay() < 10 ? '0' + fecha.getDay() : fecha.getDay()}/
                {fecha.getMonth() + 1 < 10 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1}/
                {fecha.getFullYear()}
              </div>
            </div>
            <ErrorMessage name="dateOperation" component="span"/>

            <button type='submit'> Confirmar </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default ChangeOperation;
