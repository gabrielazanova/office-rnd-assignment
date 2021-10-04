import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../style/MembersTable.css';
import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { customFilter, FILTER_TYPES } from 'react-bootstrap-table2-filter';
import Select from 'react-select';
// import SearchIcon from '@material-ui/icons/Search';
// import Moment from 'react-moment';

export default class MembersTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRows: []
        }
    }

    onMemberNameFilter = null
    onLocationFilter = null
    onCompanyFilter = null

    onMemberNameChange = (event) => {
        this.onMemberNameFilter(event.target.value)
    }

    onLocationChange = (optionSelected) => {
        this.onLocationFilter(optionSelected.value);
    }

    onCompanyChange = (optionSelected) => {
        this.onCompanyFilter(optionSelected.value);
    }

    render() {

        var locationOptions = [
            { value: '', label: 'All' }
        ]

        var companyOptions = [
            { value: '', label: 'All' }
        ]
   
        for (let [key, value] of Object.entries(this.props.offices)) {
            locationOptions.push({value: key, label: value});
        }

        for (let [key, value] of Object.entries(this.props.teams)) {
            companyOptions.push({value: key, label: value});
        }

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: (row, isSelect) => {
                var newSelectedRows = this.state.selectedRows
                if (isSelect) {
                    newSelectedRows.push(row._id)
                }
                else {
                    var member = newSelectedRows.indexOf(row._id)
                    if (member !== -1) {
                        newSelectedRows.splice(member, 1)
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
        }

        const members = this.props.members
        const columns = [{
            dataField: 'name',
            text: 'MEMBER',
            filter: customFilter(),
            filterRenderer: (onFilter) => {
                this.onMemberNameFilter = onFilter
                return null
            },
        }, {
            dataField: 'team',
            text: 'TEAM',
            filter: customFilter({
                type: FILTER_TYPES.SELECT,
                options: companyOptions
            }),
            filterRenderer: (onFilter) => {
                this.onCompanyFilter = onFilter
                return null
            }
        }, {
            dataField: 'calculatedStatus',
            text: 'STATUS/LABEL'
        }, {
            dataField: 'createdAt',
            text: 'CREATED AT',
            sort: true
        }, {
            dataField: 'office',
            text: 'LOCATION',
            filter: customFilter({
                type: FILTER_TYPES.SELECT,
                options: locationOptions
            }),
            filterRenderer: (onFilter) => {
                this.onLocationFilter = onFilter
                return null
            }
        }]

        return (
            <div className="container-fluid membersTable">
                <Row>
                    <Col xs={6} md={2}>
                        <Form>
                            <Form.Group className="mb-3" >
                                <InputGroup>
                                    {/* <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <SearchIcon />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend> */}
                                    <Form.Control type="text" onChange={this.onMemberNameChange} placeholder="Search" />

                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={6} md={3}>
                        <Select
                            onChange={this.onLocationChange}
                            options={locationOptions}
                            placeholder='LOCATION: '
                            closeMenuOnSelect={true} />
                    </Col>
                    <Col xs={6} md={3}>
                        <Select
                            onChange={this.onCompanyChange}
                            options={companyOptions}
                            placeholder='COMPANY: '
                            closeMenuOnSelect={true} />
                    </Col>
                </Row>
                <Row>
                    {this.props.members.length > 0 ?
                        <BootstrapTable
                            bootstrap4
                            keyField='_id'
                            selectRow={selectRow}
                            data={members}
                            columns={columns}
                            bordered={false}
                            filter={filterFactory()} /> :
                        <div>No data</div>
                    }
                </Row>
            </div>
        )
    }
}