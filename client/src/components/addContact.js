import React, { useContext, useState } from 'react'
import contactsFinder from '../apis/contactsFinder'
import ContactsContext from '../context/contactsContext'

const AddContact = () => {
    const { addContact } = useContext(ContactsContext)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await contactsFinder.post('/add', {
                name,
                email,
                phoneNumber
            })
            addContact(response.data)
            setName('')
            setPhoneNumber('')
            setEmail('')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='mb-4'>
            <form action=''>
                <div className='form-row d-flex gap-5'>
                    <div className='col'>
                        <input value={name} type='text' className='form-control' placeholder='name' onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='col'>
                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type='number' className='form-control' placeholder='phone number' />
                    </div>


                    <div className='col'>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='form-control' placeholder='email' />
                    </div>
                    <button onClick={(e) => handleSubmit(e)} className='btn btn-primary'>Add</button>

                </div>

            </form>

        </div>
    )
}

export default AddContact
