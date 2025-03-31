import Landingpage from '../pages/Landingpage';
import Terms from '../pages/Terms';

import Reg from '../pages/users/Reg';
import Login from '../pages/users/Login';
import Home from '../pages/users/Home';
import Pass from '../pages/users/Pass';
import History from '../pages/users/History';
import Profile from '../pages/users/Profile';
import PassHome from '../pages/users/PassHome';
import PassSucced from '../pages/users/PassSucced';

import ConductorReg from '../pages/conductors/Reg';
import ConductorLogin from '../pages/conductors/Login';
import ConductorHome from '../pages/conductors/Home';
import ConHistory from '../pages/conductors/ConHistory';
import ConProfile from '../pages/conductors/ConProfile';
import PassVerify from '../pages/conductors/PassVerify';
import ConductorTerms from '../pages/ConductorTerms';

import AdminLogin from '../pages/admin/Login';
import AdminReg from '../pages/admin/Reg';
import AdminHome from '../pages/admin/Home';
import AdminTerms from '../pages/AdminTerms';
import AdminPassVerify from '../pages/admin/PassVerify';
import AdminProfile from '../pages/admin/AdminProfile';




export const pathsandelements = [
  
  // User
    {
      path:'/',
      element:<Landingpage/>
    },
    {
      path:'/reg',
      element:<Reg/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/home',
      element:<Home/>
    },
    {
      path:'/passhome',
      element:<PassHome/>
    },
    {
      path:'/pass',
      element:<Pass/>
    },
    {
      path:'/history',
      element:<History/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/terms',
      element:<Terms/>
    },
    {
      path:'/passsucced',
      element:<PassSucced/>
    },

    // Conductor
    {
      path:'/conductor/reg',
      element: <ConductorReg />
    },
    {
      path:'/conductor/login',
      element: <ConductorLogin />
    },
    {
      path:'/conductor/home',
      element: <ConductorHome />
    },
    {
      path:'/conductor/history',
      element: <ConHistory/>
    },
    {
      path:'/conductor/profile',
      element: <ConProfile />
    },
    {
      path:'/conductor/passverify',
      element: <PassVerify />
    },
    {
      path:'/conductor/terms',
      element: <ConductorTerms />
    },
    // Admin
    {
        path:'/admin/reg',
        element: <AdminReg />
      },
      {
        path:'/admin/login',
        element: <AdminLogin />
      },
      {
        path:'/admin/home',
        element: <AdminHome />
      },
      {
        path:'/admin/terms',
        element: <AdminTerms />
      },
      {
        path:'/admin/passverify',
        element: <AdminPassVerify />
      },
      {
        path:'/admin/profile',
        element: <AdminProfile/>
      },
  ]