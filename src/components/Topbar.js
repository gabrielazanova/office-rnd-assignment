import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/Topbar.css'
import React from 'react'
import {Button} from 'react-bootstrap'
import MemberTypes from '../constants/MemberTypesEnum'

export default class Topbar extends React.Component {

    handleChange(newMembersState) {
        this.props.onStateChange(newMembersState)
    }

    render() {
        return (
            <div className="container-fluid topBar">
                <div className="row">
                    <div className="col-8">
                        <Button 
                            variant="link" 
                            className="linkBtn" 
                            onClick={() => this.handleChange(MemberTypes.all)} 
                            autoFocus>
                                All {this.props.membersCount[0]}
                        </Button>
                        <Button 
                            variant="link" 
                            className="linkBtn" 
                            onClick={() => this.handleChange(MemberTypes.lead)}>
                                Lead {this.props.membersCount[1]}
                        </Button>
                        <Button 
                            variant="link" 
                            className="linkBtn" 
                            onClick={() => this.handleChange(MemberTypes.dropIn)}>
                                Drop-In {this.props.membersCount[2]}
                        </Button>
                        <Button 
                            variant="link" 
                            className="linkBtn" 
                            onClick={() => this.handleChange(MemberTypes.active)}>
                                Active {this.props.membersCount[3]}
                        </Button>
                        <Button 
                            variant="link" 
                            className="linkBtn" 
                            onClick={() => this.handleChange(MemberTypes.former)}>
                                Former {this.props.membersCount[4]}
                        </Button>
                    </div>
                    <div className="col-4 topBtns">
                        <Button className="styleTopBtns deleteBtn" size="sm">Delete</Button>
                        <Button className="styleTopBtns addBtn" size="sm">Add Member</Button>
                    </div>
                </div>
            </div>
        );
    }
}