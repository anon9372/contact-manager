import React, { useState, createContext } from 'react'

export const ContactsContext = createContext()

export const ContactsContextProvider = (props) => {

    const [contacts, setContacts] = useState([])
    const [selectedContacts, setSelectedContacts] = useState(null)

    const addContact = (contact) => {
        setContacts([...contacts, contact])
    }

    const udpateContact = (contact) => {
        setContacts([...contacts, contact])
    }

    return (
        <ContactsContext.Provider value={{ contacts, setContacts, addContact, udpateContact, selectedContacts, setSelectedContacts }}>
            {props.children}
        </ContactsContext.Provider>
    )
}

export default ContactsContext
