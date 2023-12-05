
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeContainer from './components/homeContainer'
import Content from './pages/Content'
import LogIn from './pages/logIn'
import Navbar from './components/navbar'
import SignUp from './pages/signUp'


function App() {


  return (
    <>
      

      <Routes>

        <Route path='/' element={<HomeContainer/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>

        <Route path='/file' element={<Content/>}></Route>

      </Routes>
      
    </>
  )
}

export default App
