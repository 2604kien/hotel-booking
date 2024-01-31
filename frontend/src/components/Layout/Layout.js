import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footter from "./Footer";
export default function Layout(){
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footter/>
        </>
    )
}