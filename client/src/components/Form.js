import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

const Form = () => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [skill1, setSkill1] = useState('')
    const [skill2, setSkill2] = useState('')
    const [skill3, setSkill3] = useState('')
    const [errors, setErrors] = useState({})
    const [socket] = useState(() => io(':8001'))

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(('http://localhost:8001/api/addPet'), {
            name,
            type,
            description,
            skill1,
            skill2,
            skill3
        }).then((res) => {
            console.log(res)
            socket.emit('added_new_pet', res.data)
            socket.disconnect()
            navigate('/')
        }).catch((err) => {
            setErrors(err.response.data.errors)
        })
    }


    return (
        <div className='col-6 mx-auto'>
            <div className='d-flex justify-content-around align-items-center'>
                <h1>Pet Shelter</h1>
                <Link to={'/'}>back to home</Link>
            </div>
            <h3 className='m-2'>Know a pet needing a home?</h3> <br />
            <form onSubmit={submitHandler} className='border border-5 p-3'>
                <label>Pet Name: </label>
                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} value={name} />
                {errors.name ? <span className='text-danger'>{errors.name.message}</span> : null}
                <br />

                <label>Pet Type: </label>
                <input type="text" className='form-control' onChange={(e) => setType(e.target.value)} value={type} />
                {errors.type ? <span className='text-danger'>{errors.type.message}</span> : null}
                <br />

                <label>Pet Description: </label>
                <input className='form-control' onChange={(e) => setDescription(e.target.value)} value={description} />
                {errors.description ? <span className='text-danger'>{errors.description.message}</span> : null}
                <br />
                <br />

                <p>Skills(optional): </p>
                <label>Skill 1: </label>
                <input type="text" className='form-control' onChange={(e) => setSkill1(e.target.value)} value={skill1} />
                <br />

                <label>Skill 2: </label>
                <input type="text" className='form-control' onChange={(e) => setSkill2(e.target.value)} value={skill2} />
                <br />

                <label>Skill 3:</label>
                <input type="text" className='form-control' onChange={(e) => setSkill3(e.target.value)} value={skill3} />
                <br />

                <button className='btn btn-secondary mt-3'>Add Pet!</button>
            </form>
        </div>
    )
}

export default Form