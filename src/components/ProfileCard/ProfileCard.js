import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';

const ProfileForm = () => {
    const [userDetails, setUserDetails] = useState({});
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
        navigate("/login");
    } else {
        fetchUserProfile();
    }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email"); // Get the email from session storage

        if (!authtoken) {
        navigate("/login");
        } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
            headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email, // Add the email to the headers
            },
        });
        if (response.ok) {
            const user = await response.json();
            setUserDetails(user);
            setUpdatedDetails(user);
        } else {
            // Handle error case
            throw new Error("Failed to fetch user profile");
        }
        }
        } catch (error) {
            console.error(error);
            // Handle error case
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };
    const handleInputChange = (e) => {
    setUpdatedDetails({
        ...updatedDetails,
        [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
        const authtoken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email"); // Get the email from session storage
        const name = sessionStorage.getItem("name"); // Get the email from session storage
        const phone = sessionStorage.getItem("phone"); // Get the email from session storage

        if (!authtoken || !email) {
            navigate("/login");
            return;
        }

        const payload = { ...updatedDetails };
        const response = await fetch(`${API_URL}/api/auth/user`, {
            method: "PUT",
            headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Content-Type": "application/json",
            "email": email,
            "name": name,
            "phone": phone,
            },
            body: JSON.stringify(payload),
        });
        
            const json = await response.json();

            if (response.ok) {
                // Update the user details in session storage
                sessionStorage.setItem("name", updatedDetails.name);
                sessionStorage.setItem("phone", updatedDetails.phone);

                setUserDetails(updatedDetails);
                setEditMode(false);
                // Display success message to the user
                alert(`Profile Updated Successfully!`);
                navigate("/");
            } else {
                // Handle error case
                var x = document.getElementById("error--text");
                if (json.errors) {
                    for (const error of json.errors) {
                        console.log(error.msg); 
                    }
                } else {
                    console.log(json.error);
                    json.error.forEach(err => {
                        let errMsg = "<p>" + err.msg + "</p>";              
                        x.insertAdjacentHTML("afterbegin", errMsg)     
                    });
                }
                alert(`Profile could not be updated`);
                console.log(Error);
                throw new Error("Failed to update profile");

            }
        } 
        catch (error) {
            console.error(error);
            // Handle error case
    }
    
};

    return (
        <div className="profile-container">
            {editMode ? (
                <form className="profile--edit" onSubmit={handleSubmit}>
                                <div className='error--text' id='error--text'>
            
            </div>
                    <label>
                    Name:
                    <input className="profile--items"
                        type="text"
                        name="name"
                        placeholder={userDetails.name}
                        onChange={handleInputChange}
                    />

                    Email:
                    <input className="profile--items"
                        type="text"
                        name="email"
                        placeholder={userDetails.email}
                        onChange={handleInputChange}
                    />
  
                    Phone:
                    <input className="profile--items"
                        type="phone"
                        name="phone"
                        placeholder={userDetails.phone}
                        onChange={handleInputChange}
                    />                       
                                     
                    </label>
                    <button className="profile--button" type="submit">Save</button>
                </form>
            ) : (
            <div className="profile--main">
                <h1>Welcome {userDetails.name}</h1>
                <h2>Role: {userDetails.role}</h2>
                <h2>Phone Number: {userDetails.phone}</h2>
                <h2>Email Address: {userDetails.email}</h2>
                <button className="profile--button" onClick={handleEdit}>Edit</button>
            </div>
            )}
        </div>
    );
};

export default ProfileForm;
