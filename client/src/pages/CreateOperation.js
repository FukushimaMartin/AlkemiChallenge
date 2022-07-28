import "./CreateOperation.css"
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import {useNavigate} from "react-router-dom";

function CreateOperation() {
  const navigate = useNavigate()

  const initialValues = {
    typeOperation: "ingreso",
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
            id="inputCreateOperation" 
            name="typeOperation"
            >
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
          </Field>
          

          <label>Monto: </label>
          <ErrorMessage name="amount" component="span"/>
          <Field type="number"
            autocomplete="off"
            id="inputCreateOperation" 
            name="amount"
            placeholder="Ex. 520.."
          />

          <label>Concepto: </label>
          <ErrorMessage name="concept" component="span"/>
          <Field 
            autocomplete="off"
            id="inputCreateOperation" 
            name="concept"
            placeholder="Ex. zapatillas.."
          />

          <label>Fecha: </label>
          <ErrorMessage name="dateOperation" component="span"/>
          <Field type="date"
            autocomplete="off"
            id="inputCreateOperation" 
            name="dateOperation"
          />

          <button type='submit'> Create Operation </button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateOperation