import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../style/MembersTable.css';
import React from 'react';
// import Table from 'react-bootstrap/Table';
import BootstrapTable from 'react-bootstrap-table-next';
// import Moment from 'react-moment';

export default class MembersTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRows: []
        }
    }

    render() {

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: (row, isSelect) => {
                var newSelectedRows = this.state.selectedRows
                if (isSelect) {
                    newSelectedRows.push(row._id)
                }
                else {
                    var member = newSelectedRows.indexOf(row._id);
                    if (member !== -1) {
                        newSelectedRows.splice(member, 1);
                    }
                }
                this.setState({ selectedRows: newSelectedRows })
                this.props.onMembersToBeDeleted(this.state.selectedRows)
            },
            onSelectAll: (isSelect, rows) => {
                if (isSelect) {
                    var newSelectedRows = this.state.selectedRows
                    for (var row of rows) {
                        newSelectedRows.push(row._id)
                    }
                    this.setState({ selectedRows: newSelectedRows })
                }
                else {
                    this.state.selectedRows.length = 0
                }
                this.props.onMembersToBeDeleted(this.state.selectedRows)
            }
        };

        const members = this.props.members;
        const columns = [{
            dataField: 'name',
            text: 'MEMBER'
        }, {
            dataField: 'team',
            text: 'TEAM'
        }, {
            dataField: 'calculatedStatus',
            text: 'STATUS/LABEL'
        }, {
            dataField: 'createdAt',
            text: 'CREATED AT',
            sort: true
        }, {
            dataField: 'office',
            text: 'LOCATION'
        }];

        return (
            <div className="container-fluid membersTable">
                <div className="row">
                    {this.props.members.length > 0 ?
                        <BootstrapTable
                            keyField='_id'
                            selectRow={selectRow}
                            data={members}
                            columns={columns}
                            bordered={false} /> :
                        <div>No data</div>
                    }
                </div>
            </div>
        );
    }
}