const router = require('express').Router()
const contacts = require('../models/contact')


// GET ALL CONTACTS
router.get("/", async (req, res) => {
    try {
        const userdata = await contacts.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// GET CONTACT BY ID

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userdata = await contacts.findById({ _id: id });
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// ADD CONTACT
router.post("/add", async (req, res) => {
    const { name, email, phoneNumber } = req.body

    if (!name || !email || !phoneNumber) {
        res.status(404).send("Please fill the data")
    }

    try {
        const preContact = await contacts.findOne({ email: email })
        if (preContact) {
            res.status(404).send("Contact already exists!")
        }
        else {
            const addContact = new contacts({
                name, email, phoneNumber
            })
            await addContact.save()
            res.status(201).json(addContact)
            console.log(addContact)
        }
    }
    catch (err) {
        res.status(404).send(err)
    }
});

// UPDATE CONTACT
router.put("/:id/update", async (req, res) => {
    try {
        const { id } = req.params;

        const updateduser = await contacts.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
});


//DELETE CONTACT
router.delete("/:id/delete", async (req, res) => {
    try {
        const id = req.params.id;
        const deletuser = await contacts.findByIdAndDelete({ _id: id })
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router
