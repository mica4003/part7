import React from "react"
import { Link } from "react-router-dom"
import Notification from "./Notification"
import { useNotificationValue } from "../NotificationContext"
const NavBar = ()=>{
  const notification = useNotificationValue()
  return(
    <nav style={{backgroundColor: "lightgray" }}>
      <span><Link>Blogs</Link></span>
      <span style={{ marginLeft: 10}}><Link>Users</Link></span>
      <Notification notification={notification} />
      <span style={{ marginLeft: 10 }}>
        {user.name} logged in
        <button onClick={handleLogout} style={{ marginLeft: 3 }}>logout</button>
      </span>
    </nav>
  )
}

export default NavBar