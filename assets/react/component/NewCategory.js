import React,{useState} from 'react';
import { Modal,Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/** NewCategory functional component */
function NewCategory (props) {
  const [show, setShow] = useState(true);
  const [value,setValue] = useState({
    type: '',
    title:'',
  })
  const validationSchema = Yup.object({
    type: Yup.string().required('Required'),
    title: Yup.string().required('Required'),
  });
  const {handleSubmit, handleChange, values, errors} = useFormik({
    initialValues: value,
    validationSchema,
    onSubmit ( values ) {
      $.post('/category/new', {...values}).then(response => {
        props.onModalClose()
        props.getCategories()
        toastr.success(response.message);
      });
    }
  });

  return (
    <div>
        <Modal show={show} onHide={props.onModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} className="container" style={{width: '85%'}}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Enter category name"
                  name="type" value={values.type} onChange={handleChange}/>
                <Form.Text className="text-muted">
                  Please Add new Category.
                </Form.Text>
                <p className="text-danger">{errors.type ? errors.type : null}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title"
                  name="title" value={values.title} onChange={handleChange}/>
                <Form.Text className="text-muted">
                  Please Add new title.
                </Form.Text>
                <p className="text-danger">{errors.title ? errors.title : null}</p>
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

export default NewCategory;
