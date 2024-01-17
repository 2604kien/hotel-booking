import React from "react";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import Error404 from "../Error404";
import { admin } from "../../config/role";

export default function ViewAllCategory(){
    const roles=useSelector(state=>state.auth.roles);
    const navigate=useNavigate();
    const categoryData=useSelector(state=> state.category.entities);
    const element=categoryData&& categoryData.length>0?categoryData.map(el=> <CategoryCard key={el.id} data={el}/>):<></>
    const data= roles.includes(admin)?(<div className="add--category">
                    
                    <div style={{
                        width:"60vw",
                        display:"flex",
                        justifyContent:"flex-end",
                        marginTop:"50px",
                    }}>
                        <button onClick={()=>navigate('/category/add')} className="small--btn">Add New Category</button>
                    </div>
                    <h1>All Category</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Category Id</th>
                                    <th>Category Name</th>
                                    <th>Category Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {element}
                            </tbody>
                        </table>
                </div>):<Error404/>
    return data
}
