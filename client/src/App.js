import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ContactsContextProvider } from "./context/contactsContext";
import Home from "./routes/home";
import ContactDetails from "./routes/contactDetails";
import UpdateContact from "./routes/updateContact";

function App() {
  return (
    <ContactsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/contacts/:id' element={<ContactDetails />} />
            <Route exact path='/contacts/:id/update' element={<UpdateContact />} />
          </Routes>
        </Router>
      </div >
    </ContactsContextProvider>
  );
}

export default App;
