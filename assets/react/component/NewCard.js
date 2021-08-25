// @flow

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { postImage } from '../component/utils/ajax';

/** NewCard functional component */
function NewCard ( props ) {
  const [show, setShow] = useState(true);
  const [baseImage, setBaseImage] = useState('');

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    image: '',
    checkbox: false,
    category: props.category
  });
  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    image: Yup.string().required('Required'),
    checkbox: Yup.boolean().required('Required'),
  });
  const {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues,
    enableReinitialize:true,
    validationSchema,
    onSubmit ( values ) {
      console.log(values);
      $.post('/card/new', {...values}).then(response => {
        props.onModalClose();
        props.getCardList();
        toastr.success(response.message);
      });
    }
  });
  useEffect(() => {
    if(props.data){
      setInitialValues({...props.data})
    }
  }, []);

  const uploadImage = async ( e ) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    setFieldValue('image', base64, true);
  };

  const convertBase64 = ( file ) => {
    return new Promise(( resolve, reject ) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = ( error ) => {
        reject(error);
      };
    });
  };
  return (
    <div>
      <Modal show={show} onHide={props.onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="container" style={{width: '85%'}}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title"
                name="title" value={values.title} onChange={handleChange}/>
              <Form.Text className="text-muted">
                Please Add new title.
              </Form.Text>
              <p className="text-danger">{errors.title ? errors.title : null}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description "
                name="description" value={values.description} onChange={handleChange}/>
              <p className="text-danger">{errors.description ? errors.description : null}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label>Completed</Form.Label>
              <input className="checkbox ml-4" type="checkbox" id="vehicle1" name="checkbox" onChange={handleChange} checked={values.checkbox} />

              <p className="text-danger">{errors.checkbox ? errors.checkbox : null}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>image</Form.Label>
              <Form.Control type="file" placeholder="Enter description"
                name="image" onChange={( e ) => {
                uploadImage(e);
              }}/>
              <p className="text-danger">{errors.image ? errors.image : null}</p>
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
