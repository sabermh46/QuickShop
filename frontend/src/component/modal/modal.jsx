import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import './modal.css'

Modal.setAppElement(document.getElementById('root'))

const MyModal = ({ isOpen, openModal, closeModal, children }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      height: '400px',
      borderRadius: '16px',
      background: '#e3dcff'
    },
    overlay: {
      background: "rgba(0,0,0,.8)",
      zIndex: '9999999',
      
    }
  };

  

  useEffect(() => {
    
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      ariaHideApp={true}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      preventScroll={true}
    >
      {children}
      <button className="modalClose" onClick={closeModal}></button>
    </Modal>
  );
};

export default MyModal;
