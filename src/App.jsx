import React, { useContext } from 'react'
import { Navigate , BrowserRouter as Router , Routes  , Route } from 'react-router-dom'
import { Authprovider , AuthContext } from './context/AuthContext'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Overview from './Pages/Overview'
import ProtectedRoute from './components/ProtectedRoute'

function PublicRoute({children}){
  const {isAuthenticated} = useContext(AuthContext)
  return isAuthenticated ? <Navigate to ="/overview" replace /> :children;
}

function App() {
  return (
    <Authprovider>
     <Router>
     <div className="font-sans antialiased text-gray-900">
          <Routes>
            {/* Default route redirects to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Public Login Route */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            {/* Public Register Route */}
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            {/* Protected Overview Route */}
            <Route path="/overview" element={
              <ProtectedRoute>
                <Overview />
              </ProtectedRoute>
            } />

            {/* Legacy Dashboard path fallback */}
            <Route path="/dashboard" element={<Navigate to="/overview" replace />} />
          </Routes>
        </div>
     </Router>
    </Authprovider>
  )
}

export default App;