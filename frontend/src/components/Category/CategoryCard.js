import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCategory } from "../../reducers/categoryReducer";
export default function CategoryCard(props){
    const token=useSelector(state=>state.auth.token);
    const dispatch=useDispatch();
    const handleDelete=async ()=>{
        await dispatch(deleteCategory({id:props.data.id, token:token}));
        window.location.reload();
    }
    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
            <td>{props.data.description}</td>
            <td><div>
                <button onClick={handleDelete} className="small--btn">Delete</button>
            </div></td>
        </tr>
    )
}