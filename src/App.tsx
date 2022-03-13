
import './App.css';
import { useMount} from 'utils';
import { initUser, useAuth } from 'context/auth-context';
import AuthApp from 'Pages/auth-app';
import UnauthApp from 'Pages/unauth-app';
function App() {
  const {setUser,user}=useAuth();
  useMount(()=>{
    initUser().then(res=>{
      setUser(res);
    });
  })
  return (
    <div className="App">
      {user?<AuthApp/>:<UnauthApp/>}
      
    </div>
  );
}

export default App;
