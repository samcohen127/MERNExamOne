import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

const PetDetails = () => {
    const { id } = useParams()
    const [pet, setPet] = useState([])
    const [socket] = useState(() => io(':8001'))

    useEffect(() => {
        axios.get(`http://localhost:8001/api/petPage/${id}`)
            .then((res) => {
                console.log(res.data)
                setPet(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const navigate = useNavigate()

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8001/api/delete/${id}`)
            .then((res) => {
                console.log(res)
                socket.emit('deleted_pet', id)
                socket.disconnect()
                navigate('/')
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='d-flex justify-content-around align-items-center'>
                <h1>Pet Shelter</h1>
                <Link to={'/'}>back to home</Link>
            </div>
            <h3 className='mt-3'>Details about {pet.name}</h3> <br /><br />
            <div className='border border-3'>
                <h2>{pet.name}</h2>
                <p>Type: {pet.type}</p>
                <p>Description: {pet.description}</p>
                <p>Skills: </p>
                {pet.skill1 !== '' ? <p>{pet.skill1}</p> : null}
                {pet.skill2 !== '' ? <p>{pet.skill2}</p> : null}
                {pet.skill3 !== '' ? <p>{pet.skill3}</p> : null}
            </div>
            <button className='btn btn-danger mt-3' onClick={(e) => deleteHandler(pet._id)}>Adopt {pet.name}!</button>

        </div>
    )
}

export default PetDetails