import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
/** Signup functional component */
function Signup (){
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    checkbox: true,
    role: 'admin'
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
      $.post('/user/new', {...values}).then(response =>
        window.location.href = 'http://localhost:1337/kanban'
      );
    }
  });

  return (
    <div>
      <main className="login-form">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">Register</div>
                <div className="card-body">
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

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
            </div>
          </div>
        </div>
    </div>
</div>

</main>
    </div>
  );
}

if ( document.getElementById('signup') ) {
  ReactDOM.render(<Signup/>, document.getElementById('signup'));
}
