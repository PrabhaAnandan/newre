import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { pathsandelements } from './config/routes';
import { Provider } from 'react-redux';
import { newreUserDataStore } from './redux/newreUserDataStore';

function App() {

  const navs = createBrowserRouter(pathsandelements);

  return (
    <Provider store ={newreUserDataStore}>
    <div className='App'>
    <RouterProvider router={navs}/>
    </div>
    </Provider>
  );
}

export default App;
