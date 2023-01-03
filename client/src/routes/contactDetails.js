import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import contactsFinder from '../apis/contactsFinder';
import ContactsContext from '../context/contactsContext'

const ContactDetails = () => {
    const params = useParams()
    const id = params.id
    const { selectedContacts, setSelectedContacts } = useContext(ContactsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await contactsFinder.get(`/${id}`)
                setSelectedContacts(response.data.data.restaurant)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    })
    return (
        <div>
            {selectedContacts && console.log('Selected Contacts')}
        </div>
    )
}

export default ContactDetails
