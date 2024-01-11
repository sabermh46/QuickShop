import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../constants/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAddressBook } from '../../redux/actions';

const AddAddressForm = () => {
    const user = useSelector((state)=> state.user )
    const dispatch = useDispatch();

    const config = {
        headers: {
          'Authorization': `Bearer ${user.jwt}`
        }
      };


  const [address, setAddress] = useState({
    province: '',
    city: '',
    area: '',
    address: '',
    fullname: '',
    mobile: '',
    landmark: '',
    zip: '',
    address_book: [user.addressBook],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create the address with the pre-populated address_book ID
      const response = await axios.post(`${API}/api/addresses`, {data: address}, config);

      console.log('Address created successfully. ID:', response.data.id);
      window.location.reload();
    } catch (error) {
      console.error('Error creating address:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="input">
            <label htmlFor="province">Province: </label>
            <input type="text" name="province" value={address.province} onChange={handleChange} />
        </div>
        <div className="input">
            <label htmlFor="city">City: </label>
            <input type="text" name="city" value={address.city} onChange={handleChange} />
        </div>
        <div className="input">
            <label htmlFor="area">Area: </label>
            <input type="text" name="area" value={address.area} onChange={handleChange} />
        </div>
        <div className="input">
            <label htmlFor="address">Address: </label>
            <input type="text" name="address" value={address.address} onChange={handleChange} />
        </div>
        <div className="input">
            <label htmlFor="fullname">Full Name: </label>
            <input type="text" name="fullname" value={address.fullname} onChange={handleChange} />
        </div>
        <div className="input">
            <label htmlFor="mobile">Mobile: </label>
            <input type="number" name="mobile" value={address.mobile} onChange={handleChange} />
        </div>
        <div className="input">
            <label htmlFor="landmark">Landmark: </label>
            <input type="text" name="landmark" value={address.landmark} onChange={handleChange} />
        </div>
        <div className="input">
            <label htmlFor="zip">Zip Code: </label>
            <input type="text" name="zip" value={address.zip} onChange={handleChange} />
        </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddAddressForm;
