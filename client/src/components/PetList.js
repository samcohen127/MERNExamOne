import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

const PetList = () => {
    const [list, setList] = useState([])
    const [socket] = useState(() => io(':8001'))

    useEffect(() => {
        console.log('Inside of useEffect for socket.io-client')
        socket.on("connect", () => {
            console.log('We are connected')
            console.log(socket.id)
        })
        socket.on('added_pet', (data) => {
            setList((currentPetList) => [data, ...currentPetList])
        })
        socket.on('pet_deleted', (deletedPetId) => {
            setList((currentPetList) => {
                return currentPetList.filter((onePet) => {
                    return onePet._id !== deletedPetId
                })
            })

        })
        return () => socket.disconnect()
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8001/api/allPets')
            .then((res) => {
                console.log(res)
                setList(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='flex-wrap mb-2'>
            <div className='d-flex justify-content-around align-items-center'>
                <h1>Pet Shelter</h1>
                <Link to={'/form'}>add a pet to the shelter</Link>
            </div>
            <h3>These pets are looking for a good home!</h3> <br /><br />
            <table className='table table-hover border border-3'>
                <thead>
                    <th scope='col'>Name</th>
                    <th scope='col'>Type</th>
                    <th scope='col'>Actions</th>
                </thead>
                <tbody>
                    {
                        list.map((pet, index) => (
                            <tr key={index}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td>
                                    <Link className='btn btn-secondary m-1' to={`/petPage/${pet._id}`}>Details</Link>
                                    <Link className='btn btn-secondary' to={`/edit/${pet._id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PetList