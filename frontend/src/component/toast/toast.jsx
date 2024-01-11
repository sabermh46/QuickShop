import React from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/inject-style'


const CustomToast = ({ message, type }) => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };
  
    switch (type) {
      case 'info':
        toast.info(message, toastOptions);
        break;
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'warning':
        toast.warning(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  
    return null;
  };


  export default CustomToast