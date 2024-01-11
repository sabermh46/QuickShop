import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { API } from "../../constants/api";
import axios from "axios";

const EditUsersGeneralInfo = ({id})=>{

    const usersSecret = useSelector((state)=>state.user)
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        profilepic: null,
        birthday: "",
        mobile: "",
      });
    
      useEffect(() => {
        // Fetch user data from the /api/user/me endpoint
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`${API}/api/users/me`, {
              headers: {
                Authorization: `Bearer ${usersSecret.jwt}`,
              },
            });
    
            // Set user data in the state
            setUser(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, []);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
    
      const handleFileChange = (e) => {
        const { name, files } = e.target;
        setUser({ ...user, [name]: files[0] });
      };

      const updateUser = async () => {
        try {
          let formData = new FormData();
          formData.append("firstname", user.firstname);
          formData.append("lastname", user.lastname);
          formData.append("gender", user.gender);
          formData.append("profilepic", user.profilepic);
          formData.append("birthday", user.birthday);
          formData.append("mobile", user.mobile);
    
          const response = await axios.put(`${API}/api/users/${id}`, {body: formData}, {
                headers: {
                  Authorization: `Bearer ${usersSecret.jwt}`
                },
              });
    
          // Update user data in the state
          console.log(response);
          setUser(response.data);
          console.log("User data updated successfully");
        } catch (error) {
          console.error("Error updating user data:", error);
        }
      };



    return(
        <div>
            <h2>Edit Your Profile</h2>
            <form>
                <label>
                Firstname:
                <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                Lastname:
                <input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                Gender:
                <input type="text" name="gender" value={user.gender} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                Profile Picture:
                <input type="file" name="profilepic" onChange={handleFileChange} />
                </label>
                <br />
                <label>
                Birthday:
                <input type="date" name="birthday" value={user.birthday} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                Mobile:
                <input type="text" name="mobile" value={user.mobile} onChange={handleInputChange} />
                </label>
                <br />
                <button type="button" onClick={updateUser}>
                Save
                </button>
            </form>

        </div>
    )
}

export default EditUsersGeneralInfo