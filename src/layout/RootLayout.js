import {  Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";



export default function RootLayout() {
    return (
      <>
        <div >
        <Header/>
        
        </div>
  
        <div className="main">
          
          <Outlet />
        </div>
  
        <footer>
          <Footer/>
        </footer>
      </>
    );
  }