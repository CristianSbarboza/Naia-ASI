import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function MainTemplate({children}){
  return (
    <div>
        <NavBar/>
            {children}
        <Footer/>
    </div>
  )
}
