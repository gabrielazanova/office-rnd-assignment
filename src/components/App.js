import '../style/App.css';
import React from 'react';
import { Card } from 'react-bootstrap'
import Topbar from '../components/Topbar.js';
import MembersTable from '../components/MembersTable.js';
import MemberTypes from '../constants/MemberTypesEnum.js';
import { getMembers, getOffices, getTeams } from '../api/api';


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
      teams: {},
      offices: {},
      toBeDeleted: []
    }
    this.onMembersStateChange = this.onMembersStateChange.bind(this)
    this.onMembersToBeDeletedChange = this.onMembersToBeDeletedChange.bind(this)
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
      this.toGetOffices()
      this.toGetTeams()

      this.setState({ members: members.data })
      this.setState({ membersShow: members.data })
      this.setState({ leadMembers: this.state.members.filter(this.getLeadMembers) })
      this.setState({ dropInMembers: this.state.members.filter(this.getDropInMembers) })
      this.setState({ activeMembers: this.state.members.filter(this.getActiveMembers) })
      this.setState({ formerMembers: this.state.members.filter(this.getFormerMembers) })

      this.setState({
        membersCount:
          [this.state.members.length,
          this.state.leadMembers.length,
          this.state.dropInMembers.length,
          this.state.activeMembers.length,
          this.state.formerMembers.length
          ]
      })
    }
  }

  async toGetTeams() {
    var teamsDict = {}
    const teams = await getTeams()
    if (teams.error) { }
    else {
      for (const team of teams.data) {
        //check if the team is in the dictionary; if not, add it
        if (!teamsDict.hasOwnProperty(`${team._id}`)) {
          teamsDict[`${team._id}`] = team.name
        }
      }

      this.setState({ teams: teamsDict })
    }
  }

  async toGetOffices() {
    var officesDict = {}
    const offices = await getOffices()
    if (offices.error) { }
    else {
      for (const office of offices.data) {
        //check if the office is in the dictionary; if not, add it
        if (!officesDict.hasOwnProperty(`${office._id}`)) {
          officesDict[`${office._id}`] = office.name
        }
      }

      this.setState({ offices: officesDict })
    }
  }

  onMembersToBeDeletedChange(newToBeDeleted) {
    this.setState({toBeDeleted: newToBeDeleted})
  }

  onMembersStateChange(newState) {
    if (newState === MemberTypes.all) {
      this.setState({ membersState: newState, membersShow: this.state.members })
    }
    else if (newState === MemberTypes.lead) {
      this.setState({ membersState: newState, membersShow: this.state.leadMembers })
    }
    else if (newState === MemberTypes.dropIn) {
      this.setState({ membersState: newState, membersShow: this.state.dropInMembers })
    }
    else if (newState === MemberTypes.active) {
      this.setState({ membersState: newState, membersShow: this.state.activeMembers })
    }
    else if (newState === MemberTypes.former) {
      this.setState({ membersState: newState, membersShow: this.state.formerMembers })
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
            membersCount={this.state.membersCount}
            toBeDeleted={this.state.toBeDeleted} 
            onMembersToBeDeleted={this.onMembersToBeDeletedChange} 
            offices={this.state.offices}
            teams={this.state.teams}/>
          <Card id="mainpart">
            <MembersTable 
              members={this.state.membersShow} 
              membersState={this.state.membersState} 
              offices={this.state.offices}
              teams={this.state.teams}
              onMembersToBeDeleted={this.onMembersToBeDeletedChange} />
          </Card>
        </div>
      </div>
    );
  }
}