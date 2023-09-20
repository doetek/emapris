import {  Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function RootLayout() {
    return (
      <>
        <div >
        <Header/>
        
        </div>
  
        <div className="main">
        <ToastContainer position="bottom-center" limit={1} />
          
          <Outlet />
        </div>
  
        <footer>
          <Footer/>
        </footer>
      </>
    );
  }