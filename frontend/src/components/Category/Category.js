import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { getOneCategory } from "../../reducers/categoryReducer";
import {useParams} from "react-router-dom"
import RoomCard from "../HomePage/RoomCard";
export default function Category(){
    const currCategory=useSelector(state=> state.category.currCategory);
    const dispatch=useDispatch();
    const element=currCategory && Array.isArray(currCategory.roomList)? currCategory.roomList.map(el=><RoomCard key={el.id} data={el}/>):(<></>)
    const {id}=useParams();
    React.useEffect(()=>{
        dispatch(getOneCategory(id))
    },[dispatch,id])
    return(
        <div className="home--page">
        <div className="grid--room">
            {element}
        </div>
    </div>
    )
}