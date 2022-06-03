import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

import { FaEdit } from "react-icons/fa";
import NewUserPage from './NewUserPage';

export default function Users() {

    const [userDatas, setUserDatas] = useState([])
    const [deleteStatus, setDeleteStatus] = useState(true)
    const [addStatus, setAddStatus] = useState(true)
    const [updateStatus, setUpdateStatus] = useState(true)


    useEffect(()=>{
        Axios.get(`http://localhost:3001/`)
        .then(res=>{
            setUserDatas(res.data)
        })
    },[userDatas])

    const deleteBtn = (id) => {
        console.log('clicked delete')
        Axios.delete(`http://localhost:3001/deleteuser/${id}`)
        setDeleteStatus(true)
        setTimeout(() => {
            setDeleteStatus(false)
        }, 2500);
    }

    const updateBtn = () => {
        console.log('clicked update')
    }

    const renderUsersDatas = userDatas.map((users,i)=>{
        return (
            <tr key={i}>
                <td>{users._id}</td>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.age}</td>
                <td>{users.phone}</td>
                <td>{users.gender}</td>                            
                <td>{users.status}</td>
                <td style={{textAlign:"center"}}>
                    <li className='delete-btn' onClick={()=>{deleteBtn(users._id)}}><RiDeleteBin5Line /></li>
                    <li className='update-btn' onClick={()=>{updateBtn(users._id)}}><FaEdit /></li>
                </td>
            </tr>
        )
    })

    return (
        <div className="users-container">
            <div className="new-user-container">
                <Link to='/newuser'>
                    <button className="new-user-btn bg-dark text-light" onClick={<NewUserPage/>}>New User</button>
                </Link>
                {addStatus ? <p style={{color:"green",fontSize:"1.1rem", fontWeight:"700"}}>USER ADDED</p>: ""}
                {deleteStatus ? <p style={{color:"red",fontSize:"1.1rem", fontWeight:"700"}}>USER DELETED</p>: ""}
                {updateStatus ? <p style={{color:"blue",fontSize:"1.1rem", fontWeight:"700"}}>USER UPDATED</p>: ""}

            </div>
            <div className="users-info-container">
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr className='bg-dark text-light'>
                            <th>ID</th>
                            <th>NAME <AiOutlineUser/></th>
                            <th>EMAIL</th>
                            <th>AGE</th>
                            <th>PHONE</th>
                            <th>GENDER</th>
                            <th>STATUS</th>
                            <th>DELETE</th>
                        </tr>
                        {renderUsersDatas}
                    </tbody>
                </table>
            </div>
        </div>
    )
}