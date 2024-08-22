import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './index.css'; 

let url = "http://localhost:3000/users"


function App() {



  useEffect(()=>{
    const modalclose = document.getElementById("modal-ac");
    const modal = document.querySelector(".modal");
    const modalexit = document.getElementById("modali-exit");
    
  
    if (modalclose && modal && modalexit) {
      modalclose.addEventListener('click',()=>{
        modal.style.display = "flex"
  
      });
  
      modalexit.addEventListener('click',()=>{
        modal.style.display = "none"
  
      });
      modalexit.addEventListener('click',()=>{
        modal.style.display = 'node'
      })
    }
  
},[])
    
 




  const [data,setData] = useState([])
  const [newUser,setNewUser] = useState({name:"",age:""})
  const [updateid,setupdateid] = useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]); 

  useEffect(()=>{

    axios.get(url).then(res=>{
      
      setData(res.data);
      setFilteredData(res.data);
    })
  },[])

  console.log(data);
  
  const addUser = ()=>{
    let user = {...newUser,id:uuidv4()}
    if(user.name !="" && user.age !=""){
      
      axios.post(url,user).then(res=>{
        setData([...data,user])
        setNewUser({name:"",age:""})
        setFilteredData(newData);
      })  
    }else{
      alert("Bos ola bilmez")
    }
    
  }

  const deletes = (id)=>{
    axios.delete(`${url}/${id}`).then(res=>{
      let updatedata = data.filter(user=>user.id!==id)
      setData(updatedata)
      setFilteredData(updatedData);
    })
    
    
  }

  const editUser = (id)=>{
    let findData = data.find(user=>user.id==id)
    console.log(findData);
    setNewUser(findData)
    setupdateid(id)
    
    
  }

  const UpdateUser = ()=>{

    
    axios.put(`${url}/${updateid}`,newUser).then(res=>{
      let upduser = {...newUser,id:uuidv4()}
      let updateusers = data.map(user=>user.id == updateid ? upduser:user)
      setData(updateusers)
      setFilteredData(updatedUsers);
      setupdateid("")
      setNewUser({name:"",age:""})
    }
    )
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value; // Arama terimini güncelle
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.age.includes(searchTerm)
      ));
    }
  };

  return (
    <>
    <button id='modal-ac'>Add</button>
    
    <input
        type="search"
        placeholder="Search by name or age"
        value={searchTerm}
        onChange={handleSearch}
      />

    <div className='modal'>
    <form action="post">
    <h3 id='modali-exit'>X</h3>
    <input type="text" placeholder='name' value={newUser.name} onChange={(e)=>setNewUser({name:e.target.value,age:newUser.age})} id='names'/>
    <input type="text" placeholder='age' value={newUser.age}  onChange={(e)=>setNewUser({name:newUser.name,age:e.target.value})} id='age'/>
    <button onClick={addUser} >Elave et</button>
    <button onClick={()=>UpdateUser(newUser.id)}>Update</button>
    </form>
    </div>
    
    <div className='forms'>
        <table className='tables' >
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => deletes(user.id)} className='delete1'>Delete</button>
                  <button onClick={() => editUser(user.id)}className='edit'  >Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
