import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from "./components/NavBar";
import FullPost from "./pages/FullPost";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import Settings from "./pages/Settings";
import Login from "./pages/login";
import Register from "./pages/register";


function App() {
  return (
    <Router>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/new-post" element={<NewPost/>}/>
    <Route path="/settings" element={<Settings/>}/>
    <Route path="/post/:postId" element={<FullPost/>}/>
    </Routes>
    </Router>
  );
}

export default App;
