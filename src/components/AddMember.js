import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/AddMember.css';
import DatePicker from 'react-datepicker'
import { addMember } from '../api/api';

function AddMember(props) {
    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            postMember()
        }

        setValidated(true)
    };

    const postMember = async () => {
        var postingMember = await addMember(name.toString(), email.toString(), "", (new Date()).toString(), company.toString(), startDate.toString(), location.toString())

        if (postingMember.error) {
            window.location.reload()

        }
        else {
            window.location.reload()
        }
    };

    const handleNameChange = event => {
        setName(event.target.value)
    };

    const handleCompanyChange = event => {
        setCompany(event.target.value)
    };

    const handleLocationChange = event => {
        setLocation(event.target.value)
    };

    const handleEmailChange = event => {
        setEmail(event.target.value)
    };

    const handlePhoneChange = event => {
        setPhone(event.target.value)
    };

    const handleStartDateChange = event => {
        setStartDate(event.target.value)
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Member
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name *</Form.Label>
                        <Form.Control type="text" placeholder="Full Name..." required onChange={handleNameChange} value={name} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Company *</Form.Label>
                                <Form.Select aria-label="Default select example" required onChange={handleCompanyChange} value={company}>
                                    <option defaultValue disabled value="">Select Company</option>
                                    <option value="5d81dcfcb18f3e0010f5040d">Assignment demo</option>
                                    <option value="5d837099d4809b00104883ac">Los Angeles Lakers</option>
                                    <option value="5d8374f9d4809b00104883ee">Chicago Bulls</option>
                                    <option value="5d8381c6d4809b0010495ffa">Boston Celtics</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please select a company.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Location *</Form.Label>
                                <Form.Select aria-label="Default select example" required onChange={handleLocationChange} value={location}>
                                    <option defaultValue disabled value="">Select Location</option>
                                    <option value="5d81dcfcb18f3e0010f50407">West coast</option>
                                    <option value="5d839686e59be52704c30fbb">East coast</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please select a location.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Contact Email..." onChange={handleEmailChange} value={email} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Phone Number..." onChange={handlePhoneChange} value={phone} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Start Date *</Form.Label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            required
                            onChange={handleStartDateChange}
                            value={startDate} />
                    </Form.Group>
                    <hr />
                    <div className="float-end">
                        <Button className="cancelBtn" onClick={props.onHide}>Close</Button>
                        <Button type="submit" >Save</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddMember