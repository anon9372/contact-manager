import React from 'react'
import AddContact from '../components/addContact'
import Header from '../components/header'
import ContactsList from '../components/contactsList'
const Home = () => {
    return (
        <div>
            <Header />
            <AddContact />
            <ContactsList />
        </div>
    )
}

export default Home
