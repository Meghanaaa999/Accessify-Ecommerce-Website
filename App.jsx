import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AdminNavbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {isAdminRoute && <AdminNavbar/>}
      <Routes>
        {/* User Panel Routes - Add these when you copy user components */}
        <Route path='/' element={<div style={{padding: '50px', textAlign: 'center'}}>
          <h1>Welcome to Accessify E-Commerce</h1>
          <p>User Panel - Coming Soon</p>
          <p><a href="/admin/listproduct">Go to Admin Panel</a></p>
        </div>}/>
        
        {/* Admin Panel Routes */}
        <Route path='/admin/*' element={<Admin/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </div>
  )
}

export default App















// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
