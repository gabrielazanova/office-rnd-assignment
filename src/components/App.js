import '../style/App.css';
import React from 'react';
// import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import Topbar from '../components/Topbar.js';
import MembersTable from '../components/MembersTable.js';
import MemberTypes from '../constants/MemberTypesEnum.js'
// import AppController from './AppController';
import { getMembers } from '../api/api';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      leadMembers: [],
      dropInMembers: [],
      activeMembers: [],
      formerMembers: [],
      membersShow: [],
      membersState: MemberTypes.all,
      membersCount: [],
      error: null,
    }
    this.onMembersStateChange = this.onMembersStateChange.bind(this)
  }

  componentDidMount() {
    this.toGetMembers()
  }

  async toGetMembers() {
    const members = await getMembers()
    if (members.error) {
      this.setState({ error: members.error })
    }
    else {
      this.setState({ members: members.data })
      this.setState({ membersShow: members.data })
      this.setState({ leadMembers: this.state.members.filter(this.getLeadMembers)})
      this.setState({ dropInMembers: this.state.members.filter(this.getDropInMembers)})
      this.setState({ activeMembers: this.state.members.filter(this.getActiveMembers)})
      this.setState({ formerMembers: this.state.members.filter(this.getFormerMembers)})
      this.setState({ membersCount: 
        [ this.state.members.length, 
          this.state.leadMembers.length, 
          this.state.dropInMembers.length,
          this.state.activeMembers.length,
          this.state.formerMembers.length
        ] 
      })
    }
  }

  onMembersStateChange(newState) {
    if (newState === MemberTypes.all) {
      this.setState({ membersState: newState, membersShow: this.state.members})
    }
    else if (newState === MemberTypes.lead) {
      this.setState({ membersState: newState, membersShow: this.state.leadMembers})
    }
    else if (newState === MemberTypes.dropIn) {
      this.setState({ membersState: newState, membersShow: this.state.dropInMembers})
    }
    else if (newState === MemberTypes.active) {
      this.setState({ membersState: newState, membersShow: this.state.activeMembers})
    }
    else if (newState === MemberTypes.former) {
      this.setState({ membersState: newState, membersShow: this.state.formerMembers})
    }
  }

  getLeadMembers(member) {
    return member.calculatedStatus === MemberTypes.lead
  }

  getDropInMembers(member) {
    return member.calculatedStatus === MemberTypes.dropIn
  }

  getActiveMembers(member) {
    return member.calculatedStatus === MemberTypes.active
  }

  getFormerMembers(member) {
    return member.calculatedStatus === MemberTypes.former
  }


  render() {
    return (
      <div>
        <div className="App">
          <Topbar 
            membersState={this.state.membersState} 
            onStateChange={this.onMembersStateChange} 
            membersCount={this.state.membersCount}/>
          <Card id="mainpart">
            <MembersTable 
              members={this.state.membersShow} 
              membersState={this.state.membersState} />
          </Card>
        </div>
      </div>
    );
  }
}