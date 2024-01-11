import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { API } from "../constants/api";
import axios from "axios";
import Header from "../component/Header/header";
import './pages.css'
import profileIcon from '../assets/profile.svg'
import ShowAddressBook from "../component/user/showAddressBook";
import MyModal from "../component/modal/modal";
import EditUsersGeneralInfo from "../component/user/editUsersGInfo";
import AddAddressForm from "../component/user/addAddressForm";
import { setAddressBook } from "../redux/actions";

const User = ()=>{
    const user = useSelector((state)=> state.user )
    const dispatch = useDispatch()

    const [theUser, setTheUser] = useState(null);
   
    const[loading, setLoading] = useState(null)
    const[error, setError] = useState(null)


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
    };

    const openModal2 = () => {
      setModalIsOpen2(true);
    };

    const closeModal2 = () => {
      setModalIsOpen2(false);
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.jwt}`
      }
    };

    const fetchUser = async () => {
      try {
        // Set loading to true while fetching
        setLoading(true);

        // Simulate API call to fetch products
        const response = await axios.get(`${API}/api/users/me?populate=*`, config)
        const data = await response.data;
        console.log(data);
        setTheUser(data);

        setLoading(false);
      } catch (error) {
        // Set error and loading to false in case of an error
        setError(error);
        setLoading(false);
      }
    };

    const createAddressBook = async () => {
      try {
        // Create the address book with the pre-populated address_book ID
        const response = await axios.post(`${API}/api/address-books`, { data: { "user_id": [user.id] } }, config);
  
        const data = await response.data;
        console.log('Address book created successfully. ID:', data);
        dispatch(setAddressBook(data.id));
  
      } catch (error) {
        console.error('Error creating address book:', error);
      }
    };
  
    useEffect(() => {
      // Call the fetchProducts function
      fetchUser();
      if (user.addressBook === undefined) {
        createAddressBook();
      }
    }, [])


     return (
        <div>
          <Header />
          <div className="container">

            <MyModal isOpen={modalIsOpen} openModal={openModal} closeModal={closeModal}>
              {user && user.id ? <EditUsersGeneralInfo id={user.id}/> : null}
            </MyModal>

            <MyModal isOpen={modalIsOpen2} openModal={openModal2} closeModal={closeModal2}>
              {user && <AddAddressForm addressBookId={user.addressBook}/>}
            </MyModal>



            <div className="flex g20 x-center">
              <h2>General Information</h2>
              <button onClick={openModal} className="txt-btn">Edit</button>
            </div>
            {theUser && theUser ? 
            <div className="flex g10 x-center">
              <div className="pImage">
                <img src={theUser.profilepic ? API+theUser.profilepic.url : profileIcon} alt="" />
              </div>
              <div className="pInfo">
                <h1 className="flname">{theUser.firstname ? theUser.firstname: "Please Insert Your Name"} {theUser.lastname ? theUser.lastname : null}</h1>
                <p className="username">@{theUser.username}</p>
                <p className="email">{theUser.email}</p>
                <div className="flex g20">
                <p className="gender">Gender: {theUser.gender? theUser.gender: "Please Insert"}</p>
                <p className="birthday">Birthday: {theUser.birthday ? theUser.birthday : "Please Insert"}</p>
                </div>
              </div>
            </div> 
              : null}

              <div style={{height: '40px'}}></div>

            <div className="flex g20 x-center">
              <h2>Address Book</h2>
              <button onClick={openModal2} className="txt-btn">Add New</button>
            </div>

            {
              theUser && theUser.address_book ? <ShowAddressBook id={user.addressBook}/> : "No Addresses"
            }

            


          </div>
            
        </div>
     );
}

export default User