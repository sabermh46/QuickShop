import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./header.css"
import searchIcon from "../../assets/Search.svg"
import logo from "../../assets/logo.png"
import axios from "axios";
import { API } from "../../constants/api";
import profileIcon from '../../assets/profile.svg'
import { setAddressBook } from "../../redux/actions";

const ProfileIcon = () => {
    const user = useSelector((state)=>state.user)
    const cartCount = useSelector((state)=>state.cart.totalItemCount)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [thumb, setThumb] = useState(null)
    const[loading, setLoading] = useState(null)
    const[error, setError] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [info, setInfo] = useState(null)
    const [mem, setMem] = useState(null)


    const fetchUser = async () => {
        try {
          // Set loading to true while fetching
          setLoading(true);
  
          // Simulate API call to fetch products
          const response = await axios.get(`${API}/api/users/me?populate=*`, config)
          const data = await response.data;
          // Set products and loading to false
          console.log(data);
          dispatch(setAddressBook(data.address_book.id))

          if(data.firstname){
            setInfo(data.firstname + ' ' + data.lastname)
          } else {
            setInfo(data.username)
          }
          
          setThumb(data.profilepic.formats.thumbnail.url)
        } catch (error) {
          // Set error and loading to false in case of an error
          setError(error);
          setLoading(false);
        }
        setLoading(false);
      };

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.jwt}`
        }
    };

    const callClick = ()=>{

        setClicked(!clicked)
    }

    useEffect(()=>{
        fetchUser()
        
    }, [clicked])

    return(
        <div onClick={()=>{callClick()}} className="profileIcon">
            <div className="icon">
                {cartCount ? <div className="cartIndicator">{cartCount}</div> : null}
                <img src={thumb && thumb ? `${API}${thumb}` : profileIcon} alt="Profile_icon" />
            </div>
            <div className={clicked ? 'body flex column g10 active' : 'body flex column g10'}>
                <img className="iconbig" src={thumb && thumb ? `${API}${thumb}` : profileIcon} alt="Profile_icon" />
                <p className="fullname">{ info }</p>
                <button onClick={()=> {
                        navigate('/cart')
                }}>Your Cart({cartCount})</button>
                <button onClick={()=> {
                        navigate('/user')
                }}>View Profile</button>
                <button onClick={()=> {
                    dispatch({ type: 'LOGOUT'})
                    navigate('/')
                }}>Logout</button>
            </div>
            

        </div>
    )

}

const Header = ()=>{
    const user = useSelector((s)=> s.user);
    const navigate = useNavigate();
    const location = useLocation()

    return(
        <div className="navbar">
            <div onClick={()=>{navigate('/')}} className="brand">
                <img src={logo} alt="Quick Shop Logo" />
            </div>
            <div className="rightSide">

                <div className="searchBar">
                    <input type="text" placeholder="Search" />
                    <button>
                        <img src={searchIcon} alt="Search Icon" />
                    </button>
                </div>

                <div className="links">
                    <div className="link">
                        <p className="hover-effect" onClick={()=>{navigate('/category')}}>Categories</p>
                    </div>
                    <div className="link">
                        <p className="hover-effect" onClick={()=>{navigate('/')}}>Featured</p>
                    </div>
                    <div className="link">
                        <p className="hover-effect" onClick={()=>{navigate('/')}}>About Us</p>
                    </div>
                    <div className="link">
                        <p className="hover-effect" onClick={()=>{navigate('/')}}>Contact</p>
                    </div>
                </div>

                <div className="userbuttons">
                    {user.username == null ? 
                    <div>
                        {
                            location.pathname==='/login'?null:<button onClick={()=> {
                            navigate('/login', {replace: true})
                            }}>Login</button>
                        }
                        {
                            location.pathname==='/register'?null:<button onClick={()=> {
                            navigate('/register', {replace: true})
                            }}>Register</button>
                        }
                    </div>
                    :
                    <ProfileIcon />
                
                    }
                </div>
            </div>

            
        </div>
    )
}

export default Header