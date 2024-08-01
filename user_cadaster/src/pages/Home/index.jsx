import { Fragment, useEffect, useState, useRef } from 'react'
import Trash from '../../assets/trash.png'
import api from '../../services/api'
import './style.css'

function Home() {
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }
  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }
  async function deleteUsers(id) {
    await api.delete(`/usuarios/:${id}`)
    getUsers()
  }
  useEffect(() => {
     getUsers()    
  }, [])
  
  return (
    <Fragment>
      <div className="container">
         <form action="">
            <h1>Cadastro de usuários</h1>
            <input type="text" name="nome" id="" placeholder="Nome" ref={inputName}/>
            <input type="number" name="idade" id="" placeholder="Idade" ref={inputAge}/>
            <input type="email" name="email" id="" placeholder="Email" ref={inputEmail}/>
            <button type="button" onClick={createUsers}>Cadastrar</button>
         </form>
         {users.map(user => (
           <div key={user.id} className='card'>
             <div>
                <p>Nome: <span>{user.name}</span></p>
                <p>Idade: <span>{user.age}</span></p>
                <p>Email: <span>{user.email}</span></p>
              </div>
              <button onClick={() => deleteUsers(user.id)}>
                <img src={Trash} alt="" />
              </button>
            </div>
          ))}
       </div>
   </Fragment>
  )
}

export default Home
