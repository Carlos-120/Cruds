import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'


const defaultValues = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  birthday: ""
}



const FormUsers = ({ createUser, userUpdate, updateUser, isShowForm, handleChangeShowModal }) => {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm()


  const submitForm = (data) => {
    console.log("enviando datos ")
    if (userUpdate) {
      updateUser(userUpdate.id, data)
    } else {
      createUser(data)
    }
    reset(defaultValues)
  }

  const regularExpresiones = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/



  const titleForm = userUpdate ? "Edit User" : "New User"
  const textButton = userUpdate ? "Edit User" : "Add new user"
  useEffect(() => {
    if (userUpdate) {
      reset(userUpdate)
    } else {
      reset(defaultValues)
    }
  }, [userUpdate])

  return (
    <div className={`container-form ${isShowForm ? "disable-form" : ""}`}>
      <form className='form' onSubmit={handleSubmit(submitForm)}>
        <i onClick={handleChangeShowModal} className='form__x bx bx-x'></i>
        <h2 className='form__title'>{titleForm}</h2>
        <div className='form__div'>
          <label className='form__label' htmlFor="">Email</label>
          <input className='form__input' placeholder='Enter your email' type="email" {...register("email", {
            required: "Email is required",
            minLength: {
              message: "Email is too short",
              value: 3
            },
            maxLength: {
              message: "Email is too long",
              value: 100
            },
            pattern: {
              message: "Write a valid email",
              value: regularExpresiones
            }
          })}
          />
          {
            errors.email && <p className='err_alert'>{errors.email.message}</p>
          }
        </div>
        <div className='form__div'>
          <label className='form__label' htmlFor="">Password</label>
          <input className='form__input' placeholder='Enter your password' type="password" {...register("password")} />
        </div>
        <div className='form__div'>
          <label className='form__label' htmlFor="">First Name</label>
          <input className='form__input' placeholder='Enter your First Name' type="text"  {...register("first_name")} />
        </div>
        <div className='form__div'>
          <label className='form__label' htmlFor="">Last Name</label>
          <input className='form__input' placeholder='Enter your Last Name' type="text"  {...register("last_name")} />
        </div>
        <div className='form__div'>
          <label className='form__label' htmlFor="">Birthaday</label>
          <input className='form__input' type="date"  {...register("birthday")} />
        </div>
        <button className='form__btn'>{textButton}</button>
      </form>
    </div>
  )
}

export default FormUsers