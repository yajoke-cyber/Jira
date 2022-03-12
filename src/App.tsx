
import logo from './logo.svg';
import './App.css';
import {cleanObj} from 'utils';
// const API_URL = process.env.REACT_APP_API_URL

let obj ={
  name:'',
  id:0,
  content:'1234'
}
console.log(cleanObj(obj));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
