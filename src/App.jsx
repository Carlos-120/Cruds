import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUser from './componentes/FormUser'
import UserCard from './componentes/UserCard.jsx'


const BASE_URL = "https://users-crud.academlo.tech/"
function App() {
  const [users, setUsers] = useState()
  const [userUpdate, setUserUpdate] = useState()
  const [isShowForm, setIsShowForm] = useState(false)

  const getAllUsers = () => {
    const URL = `${BASE_URL}users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }


  const createUser = (data) => {
    const URL = `${BASE_URL}users/`
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        handleChangeShowModal()
      })
      .catch(err => console.log(err))
  }

  const deleteUser = (id) => {
    const URL = `${BASE_URL}users/${id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateUser = (id, data) => {
    const URL = `${BASE_URL}users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        setUserUpdate(res.data)
        getAllUsers()
        setUserUpdate()
        handleChangeShowModal()
      })
      .catch(err => console.log(err))
  }
  const handleChangeShowModal = () => {
    setIsShowForm(!isShowForm)
  }

  const handleClickNewUser = () => {
    handleChangeShowModal()
    setUserUpdate()
  }

  useEffect(() => {
    getAllUsers()
  }, [])


  return (
    <div className="App">
      <div className='header-container'>
        <h1 className='header__title'>Crud Users</h1>
        <button onClick={handleClickNewUser} className='header__btn'><i className='bx bx-plus'></i>Create new users</button>
      </div>

      <FormUser
        createUser={createUser}
        userUpdate={userUpdate}
        updateUser={updateUser}
        isShowForm={isShowForm}
        handleChangeShowModal={handleChangeShowModal}
      />

      <div className='users-container'>
        {
          users?.map((user => (
            <UserCard
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              setUserUpdate={setUserUpdate}
              handleChangeShowModal={handleChangeShowModal}
            />
          )))
        }
      </div>


    </div>
  )
}

export default App
