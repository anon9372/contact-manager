import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import contactsFinder from '../apis/contactsFinder'
import ContactsContext from '../context/contactsContext'

const UpdateContact = () => {

    const params = useParams()
    const id = params.id
    console.log('hello IDDD', id)
    const navigate = useNavigate()
    const { updateContact } = useContext(ContactsContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [contact, setContact] = useState({ name, phoneNumber, email })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await contactsFinder.get(`/${id}`)
                setContact(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    const handleSubmit = async (id) => {
        const response = await contactsFinder.put(`/${id}/update`, {
            name,
            phoneNumber,
            email
        })
        updateContact(response.data)
        setName('')
        setEmail('')
        setPhoneNumber('')
    }

    const handleBack = () => {
        navigate('/')
    }

    return (
        <div>
            <h1 className='font-weight-light display-5 mt-5 text-center'>Update Contact</h1>
            <form action=''>
                <div className='form-row g-5'>
                    <div className='col'>
                        <label>
                            Name:
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                    </div>

                    <div className='col'>
                        <label>
                            Email:
                            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div className='col'>
                        <label>
                            Number:
                            <input type='number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </label>
                    </div>
                </div>
            </form >
            <div className='d-flex gap-2'>
                <button onClick={() => handleSubmit(id)} className='btn btn-primary'>Update</button>
                <button onClick={() => handleBack()} className='btn btn-warning'>Back</button>
            </div>
        </div>
    )
}

export default UpdateContact
