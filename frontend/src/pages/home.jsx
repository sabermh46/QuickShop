import React, { useEffect, useState } from "react";  
import Header from "../component/Header/header";
import ShowProduct from "../component/product/showProduct";
import Loader from "../component/loader/loader";
import MyModal from "../component/modal/modal";


const HomePage = ()=> {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

    return(
        <div id="di">
            <Header />
            <button onClick={openModal}>Open Modal</button>
            <MyModal isOpen={modalIsOpen} openModal={openModal} closeModal={closeModal}>
                <h2>Modal Content</h2>
                <p>This is the content of the modal.</p>
            </MyModal>
            <ShowProduct />
            <div style={{height: 40 + 'px'}}></div>

        </div>
    )
}

export default HomePage