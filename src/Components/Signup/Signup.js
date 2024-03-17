import React, { useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseContext } from '../../store/FirebaseContext';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { Firebase } = useContext(FirebaseContext);
  const [usernameerror, setUsernameerror] = useState('');
  const [emailerror, setEmailerror] = useState('');
  const [phoneerror, setPhoneerror] = useState('');
  const [passworderror, setPassworderror] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 6) {
      setUsernameerror('Username must be at least 6 characters long.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailerror('Please enter a valid email address.');
      return;
    }

    if (phone.length !== 10) {
      setPhoneerror('Phone number must be 10 digits long.');
      return;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPassworderror('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

    try {
      const auth = getAuth(Firebase);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const db = getFirestore(Firebase);
      await addDoc(collection(db, 'users'), {
        id: userCredential.user.uid,
        username: username,
        phone: phone
      });
      await updateProfile(auth.currentUser, { displayName: username });
      console.log("User signed up successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
      <div className="imageContainer">
        <img className="logoImage" src={Logo} alt="Logo" />
      </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            placeholder="Enter your username"
          />
          {usernameerror && <p style={{ color: 'red' , fontSize:'12px'}}>{usernameerror}</p>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter your email"
          />
          {emailerror && <p style={{ color: 'red' , fontSize:'12px'}}>{emailerror}</p>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            placeholder="Enter your phone number"
          />
          {phoneerror && <p style={{ color: 'red' , fontSize:'12px'}}>{phoneerror}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter your password"
          />
          {passworderror && <p style={{ color: 'red' , fontSize:'12px'}}>{passworderror}</p>}
          <br />
          <br />
          <button>Signup</button>
          
        </form>
        <a href='/login' style={{ textDecoration: 'none', color: 'black' }}>Login</a>
      </div>
    </div>
  );
}
