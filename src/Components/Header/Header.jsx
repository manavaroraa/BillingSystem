import React from "react";
function logout() {
    console.warn("chal rha")
    localStorage.removeItem("email");
    window.location.href = "/Login"
  }
const Header =()=>{
    return(
        <div>
            <button  onClick={logout}>Log Out</button>
        </div>
    )
}
export default Header;