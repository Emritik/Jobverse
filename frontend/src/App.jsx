import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from "axios";

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

// import your redux actions
import { setUser, clearUser } from './redux/authSlice'
import { USER_API_END_POINT } from './utils/constant'


const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },
  // admin
  { path:"/admin/companies", element: <ProtectedRoute><Companies/></ProtectedRoute> },
  { path:"/admin/companies/create", element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> },
  { path:"/admin/companies/:id", element:<ProtectedRoute><CompanySetup/></ProtectedRoute> },
  { path:"/admin/jobs", element:<ProtectedRoute><AdminJobs/></ProtectedRoute> },
  { path:"/admin/jobs/create", element:<ProtectedRoute><PostJob/></ProtectedRoute> },
  { path:"/admin/jobs/:id/applicants", element:<ProtectedRoute><Applicants/></ProtectedRoute> },
])

function App() {
  const dispatch = useDispatch()
  axios.defaults.withCredentials = true;

  // ✅ Check user login status when app starts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`)
        if (res.data.success) {
          dispatch(setUser(res.data.user))
        } else {
          dispatch(clearUser())
        }
      } catch (error) {
        dispatch(clearUser())
      }
    }

    checkAuth()
  }, [dispatch])

  return (
    <div>
      {/* You can also place Navbar here globally */}
       <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
