import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/Topbar.css'
import {Button} from 'react-bootstrap'

function Topbar() {
    return (
        <div className="container-fluid topBar">
            <div className="row">
                <div className="col-8">
                    <Button variant="link" className="linkBtn">All</Button>
                    <Button variant="link" className="linkBtn">Lead</Button>
                    <Button variant="link" className="linkBtn">Drop-In</Button>
                    <Button variant="link" className="linkBtn">Active</Button>
                    <Button variant="link" className="linkBtn">Former</Button>
                </div>
                <div className="col-4 topBtns">
                    <Button className="deleteBtn" size="sm">Delete</Button>
                    <Button className="addBtn" size="sm">Add Member</Button>
                </div>
            </div>
        </div>
    );
}

export default Topbar