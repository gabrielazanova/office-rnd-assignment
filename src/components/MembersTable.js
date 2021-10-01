import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/MembersTable.css'
import React from 'react'
import Table from 'react-bootstrap/Table'

export default class MembersTable extends React.Component {

    render() {
        const renderMember = (members, index) => {
            return (
                <tr key={index}>
                    <td>{members.name}</td>
                    <td>{members.team}</td>
                    <td>{members.calculatedStatus}</td>
                    <td>{members.createdAt}</td>
                    <td>{members.office}</td>
                </tr>
            )
        }

        return (
            <div className="container-fluid membersTable">
                <div className="row">
                    {this.props.members.length > 0 ?
                    <Table>
                        <thead>
                            <tr>
                                <th>MEMBER</th>
                                <th>TEAM</th>
                                <th>STATUS/LABEL</th>
                                <th>CREATED AT</th>
                                <th>LOCATION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.members.map(renderMember)}
                        </tbody>
                    </Table> :
                    <div>No data</div> }
                </div>
            </div>
        );
    }
}