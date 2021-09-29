import '../style/App.css';
import Topbar from '../components/Topbar.js';
import MembersTable from '../components/MembersTable.js';
import {Card} from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <Topbar />
      <Card id="mainpart">
        <MembersTable />
      </Card>
    </div>
  );
}

export default App;
