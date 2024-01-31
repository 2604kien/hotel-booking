import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCategory } from "../../reducers/categoryReducer";
import {useNavigate} from "react-router-dom";
export default function CategoryCard(props){
    const token=useSelector(state=>state.auth.token);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleDelete=async ()=>{
        await dispatch(deleteCategory({id:props.data.id, token:token}));
        window.location.reload();
    }
    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
            <td>{props.data.description}</td>
            <td><div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"5px"}}>
            <button onClick={()=>navigate(`/category/edit/${props.data.id}`)} className="small--btn">Edit</button>
                <button onClick={handleDelete} className="small--btn">Delete</button>
            </div></td>
        </tr>
    )
}