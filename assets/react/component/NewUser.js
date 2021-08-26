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
    phoneNo: '',
    email: '',
    password: '',
    verified: true,
    seen: false,
    userRole: 'user',
  });
  const validationSchema = Yup.object({
    phoneNo: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    seen: Yup.boolean().required('Required'),
    userRole: Yup.string().required('Required'),
  });
  const {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit ( values ) {
      $.post('/user/new', {...values}).then(response => {
        props.onModalClose();
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
              <Form.Label>phoneNo</Form.Label>
              <Form.Control type="text" placeholder="enter this format 3012055881"
                name="phoneNo" value={values.phoneNo} onChange={handleChange}/>
              <p className="text-danger">{errors.phoneNo ? errors.phoneNo : null}</p>
            </Form.Group>
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
              <input className="checkbox ml-4" type="checkbox" name="seen" onChange={handleChange} checked={values.seen}/>
              <p className="text-danger">{errors.seen ? errors.seen : null}</p>
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
