import React from 'react'

const UserCard = ({ user, deleteUser, setUserUpdate, handleChangeShowModal }) => {

    const handleChangeClickUpdate = () => {
        setUserUpdate(user)
        handleChangeShowModal()
    }
    return (
        <article className='user'>

            <h2 className='user__title'>{`${user.first_name} ${user.last_name}`}</h2>
            <ul className='user__list'>
                <li className='user__item'><span>Email</span>📧{user.email}</li>
                <li className='user__item'><span>Birthaday</span>🎂{user.birthday}</li>
            </ul>
            <div className='user__container-btn'>
                <button className='user__btn'>
                    <i onClick={() => deleteUser(user.id)} className='bx bx-trash'></i>
                </button>
                <button className='user__btn2'>
                    <i onClick={handleChangeClickUpdate} className='bx bx-pencil'></i>
                </button>
            </div>



        </article>

    )
}
export default UserCard