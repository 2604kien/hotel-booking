import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../css/User.css"
import { getUserById, updateUserById } from "../../reducers/userReducer";
export default function EditUser(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token);
    const userData=useSelector(state=> state.user.selectedUser);
    const [formData, setFormData]=React.useState(userData);
    const {id}=useParams();
    const handleChange=(e)=>{
        const {name, value}=e.target;
        if (name === "roles") {
            const rolesArray = value.split(",").map((role) => role.trim().toLowerCase());
            setFormData((prev) => ({
              ...prev,
              [name]: rolesArray,
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              [name]: value,
            }));
          }
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        console.log(userData);
        await dispatch(updateUserById({
          id: id,
          data: formData,
          token:token
        }))
        navigate('/user')
    }
    React.useEffect(()=>{
        dispatch(getUserById({id, token})).then(()=>{
            setFormData(userData);
        })
    },[dispatch, JSON.stringify(userData), JSON.stringify(token)])
    return(
        <div className="add--category">
        <h1>User Login:</h1>
        <form className="add--category--form" onSubmit={handleSubmit}>
                    <label htmlFor="fullName">Full Name:</label>
                    <input type="text" id="fullName" name="fullName" onChange={handleChange}  value={formData.fullName} required/>
                    
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={handleChange} value={formData.username} required/>

                    <label htmlFor="roles">Roles: (use "," to separate the role)</label>
                    <input type="text" id="roles" name="roles" onChange={handleChange} value={formData.roles}required/>

                    <label htmlFor="refreshToken">Refresh Token:</label>
                    <input type="text"  style={{outline:"none"}} id="refreshToken" name="refreshToken" value={formData.refreshToken} readOnly required/>

                    <button className="small--btn" type="submit">Submit</button>
            </form>
        </div>
    )
}