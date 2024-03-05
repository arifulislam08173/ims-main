import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Dashboard  from "../Pages/Home/Dashboard";
import UserProfile from "../Pages/Home/userProfile";

import LoginSignUp from "../Pages/Login/LoginSignUp"
import SignUp from "../Pages/SignUp/SignUp"



const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginSignUp /> ,
    },
    {
        path: '/signup', 
        element: <SignUp /> , 
      },
      
    {
        path: '/',
        element: 
            <Layout />,
        children: [
            
            {
                path: 'home',
                element: <Dashboard  />
            
            },
            {
                path: 'profile', // Adjusted path for UserProfile
                element: <UserProfile /> // Use UserProfile component here
            },
           
                   
        ]
    }
])

export default router;