/**
 * @copyright MrMahir Pvt Ltd - https://mrmahir.com
 * @author Usama Naseer <unaseer932@gmail.com>
 * @since 2021-08-25
 */

// @flow

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { postImage } from '../component/utils/ajax';

/** NewCard functional component */
function NewCard ( props ) {
  const [show, setShow] = useState(true);

  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    checkbox: false,
    role: 'user'
  });
  const validationSchema = Yup.object({
      email: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
      checkbox: Yup.boolean().required('Required'),
      role: Yup.string().required('Required'),
  });
  const {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues,
    enableReinitialize:true,
    validationSchema,
    onSubmit ( values ) {
      $.post('/user/new', {...values}).then(response => {
        props.onModalClose()
      });
    }
  });

  return (
    <div>
      <Modal show={show} onHide={props.onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="container" style={{width: '85%'}}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter email"
                name="email" value={values.email} onChange={handleChange}/>
              <p className="text-danger">{errors.email ? errors.email : null}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Enter password "
                name="password" value={values.description} onChange={handleChange}/>
              <p className="text-danger">{errors.password ? errors.password : null}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label>Allow Access</Form.Label>
              <input className="checkbox ml-4" type="checkbox" id="vehicle1" name="checkbox" onChange={handleChange} checked={values.checkbox} />
              <p className="text-danger">{errors.checkbox ? errors.checkbox : null}</p>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewCard;
