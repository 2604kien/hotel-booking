import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error404 from "../Error404";
import { getAllUser } from "../../reducers/userReducer";
import UserCard from "./UserCard";
import { admin } from "../../config/role";
export default function User(){
    const token=useSelector(state=>state.auth.token);
    const roles=useSelector(state=>state.auth.roles);
    const allUser=useSelector(state=> state.user.entities);
    const dispatch=useDispatch();
    const element=allUser&&allUser.length>0?allUser.map(el=><UserCard key={el.id} data={el}/>):<></>
    const data= roles.includes(admin)?(<div className="add--category">
                <h1>All user</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>MobilePhone</th>
                                <th>Roles</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {element}
                        </tbody>
                    </table>
            </div>):<Error404/>
    React.useEffect(()=>{
        dispatch(getAllUser(token))
    },[JSON.stringify(token)])
    return (
        <div>
            {data}
        </div>
    )
}