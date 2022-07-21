import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import "./CreatePost.css"
import axios from "axios"
import {useNavigate} from "react-router-dom";

function CreatePost() {
  const navigate= useNavigate()

  const initialValues = {
    typeOperation: "",
    amount: "",
    concept: "",
    dateOperation: "",
  }

  const validationSchema = Yup.object().shape({
    typeOperation: Yup.string().required(),
    amount: Yup.number().required(),
    concept: Yup.string().min(3).max(30).required(),
    dateOperation: Yup.date().required()
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/operations", data).then((response) => {
      navigate("/")
    })
  }

  
  return (
    <div className="createOperationPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>

          <label>Tipo de Operacion: </label>
          <ErrorMessage name="typeOperation" component="span"/>
          <Field as="select"
            autocomplete="off"
            id="inputCreatePost" 
            name="typeOperation"
            placeholder="Ex. ingreso, egreso..">
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
          </Field>
          

          <label>Monto: </label>
          <ErrorMessage name="amount" component="span"/>
          <Field type="number"
            autocomplete="off"
            id="inputCreatePost" 
            name="amount"
            placeholder="Ex. 520.."
          />

          <label>Concepto: </label>
          <ErrorMessage name="concept" component="span"/>
          <Field 
            autocomplete="off"
            id="inputCreatePost" 
            name="concept"
            placeholder="Ex. zapatillas.."
          />

          <label>Fecha: </label>
          <ErrorMessage name="dateOperation" component="span"/>
          <Field type="date"
            autocomplete="off"
            id="inputCreatePost" 
            name="dateOperation"
            placeholder="Ex. 17/05/2001.."
          />

          <button type='submit'> Create Post </button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost