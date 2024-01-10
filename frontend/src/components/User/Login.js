import React from "react";
import "../../css/Register.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../reducers/authReducer";
import { resetMessage } from "../../reducers/userReducer";
export default function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const serverMessage=useSelector(state=>state.user.serverMessage);
    const [formData, setFormData]=React.useState({
        username:"",
        password:""
    })
    const handleChange=(e)=>{
        const {name, value}=e.target;
        setFormData(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        await dispatch(login(formData));
        navigate('/');
    }
    React.useEffect(()=>{
        dispatch(resetMessage());
    },[dispatch])
    return (
        <div className="add--category">
            <h1>User Login:</h1>
            <form className="add--category--form" onSubmit={handleSubmit}>
                {serverMessage && serverMessage.length>0 && <h3 style={{color:"black"}}>{serverMessage}</h3>}
                <label htmlFor="user--name">Username:</label>
                <input value={formData.username}  onChange={handleChange}  name='username' type="text" placeholder="Please enter your username..." id="user--name" required/>
                <label htmlFor="password">Password:</label>
                <input value={formData.password} onChange={handleChange} name="password" type="password" placeholder="Please enter your password..." id="password" required/>
                
                <div style={{
                    width:"100%",
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}