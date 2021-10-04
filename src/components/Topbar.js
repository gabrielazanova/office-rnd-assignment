import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Topbar.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import MemberTypes from '../constants/MemberTypesEnum';
import AddMember from './AddMember';
import { deleteMember } from '../api/api';

export default class Topbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddMember: false,
            errors: []
        }
    }

    handleChange(newMembersState) {
        this.props.onStateChange(newMembersState)
    }

    changeShowAddMember(newState) {
        this.setState({ showAddMember: newState })
    }

    deleteUsers = async () => {
        if (!(this.props.toBeDeleted.length === 0)) {
            for (const id of this.props.toBeDeleted) {
                const users = await deleteMember(id)
    
                if (users.error) {
                    // TODO add error alert
                    // window.location.reload()
                    this.state.errors.push(users.error)
                }
                else (
                    // TODO add success alert
                    this.state.errors.push("")
                )
            }
            this.props.onMembersToBeDeleted()
            window.location.reload()
        }
        else {
            alert("No members selected")
        }
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
                        <Button className="styleTopBtns deleteBtn" size="sm" onClick={this.deleteUsers}>Delete</Button>
                        <Button className="styleTopBtns addBtn" size="sm" onClick={() => this.changeShowAddMember(true)}>Add Member</Button>
                    </div>

                    <AddMember
                        show={this.state.showAddMember}
                        onHide={() => this.changeShowAddMember(false)}
                        offices={this.props.offices}
                        teams={this.props.teams} />

                </div>
            </div>
        );
    }
}