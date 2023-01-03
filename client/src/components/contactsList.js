import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import contactsFinder from '../apis/contactsFinder'
import RestaurantContext from '../context/contactsContext'

const ContactsList = (props) => {

    const navigate = useNavigate()
    const { contacts, setContacts } = useContext(RestaurantContext);

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const fetchData = async () => {
        try {
            const response = await contactsFinder.get('/')
            setContacts(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await contactsFinder.delete(`/${id}/delete`)
            const deletedata = await response.json();

            if (response.status === 422 || !deletedata) {
                console.log("error");
            } else {
                setContacts(deletedata.filter(x => x._id !== id))
                fetchData();
            }

        } catch (err) {
            console.log('Delete Error', err)
        }
    }



    const handleUpdate = async (e, id) => {
        e.stopPropagation()
        navigate(`/contacts/${id}/update`, id)
    }

    const handleContactSelect = (id) => {
        navigate(`/contacts/${id}/`)

    }



    return (
        <div className='list-group'>
            <table className='table table-hover'>
                <thead>
                    <tr className='bg-primary'>
                        <th scope='col' style={{ width: '100px' }}>Serial Num</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Phone Number</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.length > 0 && contacts.map((contact, index) => {
                        return (
                            <tr key={index} onClick={(id) => handleContactSelect(contact.id)}>
                                <td>{index + 1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.phoneNumber}</td>
                                <td>{contact.email}</td>
                                <td><button onClick={(e) => handleUpdate(e, contact._id)} className='btn btn-warning'>Update</button></td>
                                <td><button onClick={(e) => handleDelete(e, contact._id)} className='btn btn-danger'>Delete</button></td>
                            </tr>

                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ContactsList
