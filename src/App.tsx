
import './App.css';
import { useMount} from 'utils';
import Login from 'Pages/unauth-app/login';
import { useState } from 'react';
import RegisterScreen from 'Pages/unauth-app/register';
import { initUser, useAuth } from 'context/auth-context';
function App() {
  const [part,setPart]=useState(true)
  const {setUser}=useAuth();
  useMount(()=>{
    initUser().then(res=>{
      setUser(res);
    });
  })
  const changePart=()=>{
    setPart(!part)
  }
  return (
    <div className="App">
      {part? <Login changeScreen={changePart}/>:<RegisterScreen changeScreen={changePart}/>}
    
     
      {/* <List/> */}
    </div>
  );
}

export default App;
