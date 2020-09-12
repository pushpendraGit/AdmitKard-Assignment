import React from 'react';

import '../assets/css/Navbar.css'


//this is the Navbar Component
class Navbar extends React.Component{
    render(){
        const{changePage , page}=this.props;
        return(
            <div className="navbar">
                <ul className="navbar-ul">
                    <li className={page===1 ? "active-pg":""} onClick={()=>{changePage(1)}}  >HOME</li>
                    <li className={page===2 ? "active-pg":""} onClick={()=>{changePage(2)}}>ADD QUESTIONS</li>
                </ul>
            </div> 
        )
    }
}

export default Navbar;