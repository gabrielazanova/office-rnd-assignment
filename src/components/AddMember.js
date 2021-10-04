import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/AddMember.css';
import DatePicker from 'react-datepicker'
import { addMember } from '../api/api';

export default class AddMember extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            validated: false,
            name: '',
            company: '',
            location: '',
            email: '',
            phone: '',
            startDate: new Date(),
        }
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            this.postMember()
        }

        this.setState({ validated: true })
    };

    async postMember() {
        var postingMember = await addMember(this.state.name.toString(), this.state.email.toString(), "", (new Date()).toString(), this.state.company.toString(), this.state.startDate.toString(), this.state.location.toString())

        if (postingMember.error) {
            alert("An error occurred trying to add a member :(")
            window.location.reload()
        }
        else {
            alert("Successfully added a member!")
            window.location.reload()
        }
    };

    handleNameChange = event => {
        this.setState({name: event.target.value})
    };

    handleCompanyChange = event => {
        this.setState({company: event.target.value})
    };

    handleLocationChange = event => {
        this.setState({location: event.target.value})
    };

    handleEmailChange = event => {
        this.setState({email: event.target.value})
    };

    handlePhoneChange = event => {
        this.setState({phone: event.target.value})
    };

    handleStartDateChange = event => {
        this.setState({startDate: event.target.value})
    };

    createSelectItems(options) {
        let items = []

        for (let [key, value] of Object.entries(options)) {
            items.push(<option key={key} value={key}>{value}</option>)
        }

        return items
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Member
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" placeholder="Full Name..." required onChange={this.handleNameChange} value={this.state.name} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Company *</Form.Label>
                                    <Form.Select aria-label="Default select example" required onChange={this.handleCompanyChange} value={this.state.company}>
                                        <option defaultValue disabled value="">Select Company</option>
                                        {this.createSelectItems(this.props.teams)}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please select a company.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Location *</Form.Label>
                                    <Form.Select aria-label="Default select example" required onChange={this.handleLocationChange} value={this.state.location}>
                                        <option defaultValue disabled value="">Select Location</option>
                                        {this.createSelectItems(this.props.offices)}
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
                                    <Form.Control type="email" name="email" placeholder="Contact Email..." onChange={this.handleEmailChange} value={this.state.email} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" placeholder="Phone Number..." onChange={this.handlePhoneChange} value={this.state.phone} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date *</Form.Label>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={this.state.startDate}
                                required
                                onChange={this.handleStartDateChange}
                                value={this.state.startDate} />
                        </Form.Group>
                        <hr />
                        <div className="float-end">
                            <Button className="cancelBtn" onClick={this.props.onHide}>Close</Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}