import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import {getAuth,signOut} from 'firebase/auth'

function Header() {
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='India'/>
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        <span style={{cursor:'pointer'}} onClick={() => {
        if (!user) {
          navigate('/login');
       }
       }}>
        {user ? `Welcome ${user.displayName}` : 'Login'}
        </span>

          <hr />
        </div>
        {user && <span style={{cursor:'pointer'}} onClick={()=>{
          const auth=getAuth(firebase)
          signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
          console.log(error);
        });
        }}>Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{
              {user ? navigate('/create') :  navigate('/login')}
            }}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
