import React from "react";
import "../../css/Register.css"
import { useDispatch, useSelector } from "react-redux";
import { createUser, resetMessage } from "../../reducers/userReducer";
export default function Register(){
    const dispatch=useDispatch();
    const serverMessage=useSelector(state=>state.user.serverMessage);
    const [formData, setFormData]=React.useState({
        fullName:"",
        username:"",
        password:"",
        email:"",
        mobilePhone:""
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
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createUser(formData));
    }
    React.useEffect(()=>{
        dispatch(resetMessage());
    },[])
    return (
        <div className="add--category">
            <h1>Register New User</h1>
            <form className="add--category--form" onSubmit={handleSubmit}>
                {serverMessage && serverMessage.length>0 && <h3 style={{color:"black"}}>{serverMessage}</h3>}
                <label htmlFor="full--name">Full Name:</label>
                <input value={formData.fullName} onChange={handleChange} name='fullName' type="text" placeholder="Please enter your name..." id="full--name" required/>
                <label htmlFor="user--name">Username:</label>
                <input value={formData.username}  onChange={handleChange}  name='username' type="text" placeholder="Please enter your username..." id="user--name" required/>
                <label htmlFor="password">Password:</label>
                <input value={formData.password} onChange={handleChange} name="password" type="password" placeholder="Please enter your password..." id="password" required/>
                <label htmlFor="email">Email:</label>
                <input value={formData.email} onChange={handleChange} name='email' type="email" placeholder="Please enter your email..." id="email" required/>
                <label htmlFor="mobilePhone">Mobile Phone:</label>
                <input value={formData.mobilePhone} onChange={handleChange} name='mobilePhone' type="text" placeholder="Please enter your mobile number..." id="mobilePhone" required/>
                
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