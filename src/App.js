import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import Post from './store/PostContext';

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth(firebase);
        await onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [firebase, setUser]);

  return (
    
    <div>
       <div>
        <Post>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
        <Route path="/signup" element={<Signup/>} />
        </Routes>
        <Routes>
        <Route path="/login" element={<Login/>} />
        </Routes>
        <Routes>
          <Route path='/create' element={<Create/>}/>
        </Routes>
        <Routes>
          <Route path='/view' element={<View/>}/>
        </Routes>
      </Router>
      </Post>
    </div>
    </div>
  );
}

export default App;
