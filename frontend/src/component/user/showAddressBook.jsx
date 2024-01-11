import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../constants/api";
import ShowAddresses from "./showAdds";

const ShowAddressBook = ({id})=> {

    const user = useSelector((state)=> state.user )
    const [addBook, setAddBook] = useState(null);
   
    const[loading, setLoading] = useState(null)
    const[error, setError] = useState(null)

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.jwt}`
      }
    };

    

    useEffect(()=>{
        const fetchAddressBook = async () => {
            try {
              // Set loading to true while fetching
              setLoading(true);
      
              // Simulate API call to fetch products
              const response = await axios.get(`${API}/api/address-books/${id}?populate=*`, config)
              const data = response.data;
      
              setAddBook(Object.entries(data))
              setLoading(false);
      
            } catch (error) {
              // Set error and loading to false in case of an error
              setError(error);
              setLoading(false);
            }
          };
        fetchAddressBook()

    }, [])

    

    return (
           <div>
                {
                    addBook && <ShowAddresses data={addBook[0][1].attributes.addresses.data}/>
                }
           </div>
    )
}

export default ShowAddressBook