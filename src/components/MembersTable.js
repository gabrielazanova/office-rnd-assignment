import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import '../style/MembersTable.css'

export default class MembersTable extends React.Component {
    render() {
        return (
            <div className="container-fluid membersTable">
                <div className="row">
                    <div className="col-6">
                        Hey 1
                    </div>
                    <div className="col-6">
                        Hey 2
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        Hey 3
                    </div>
                    <div className="col-6">
                        Hey 4
                    </div>
                </div>
            </div>
        );
    }
}