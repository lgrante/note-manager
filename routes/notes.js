const express = require('express')
const router = express.Router()
const fs = require('fs')

const note = require('../service/Note')
const filepath = '../data/notes.json'

const queryToNote = (query) => ({
    title: query.title,
    description: query.description,
    date: new Date(query.date)
})

router.post('/add', (req, res) => {
    try {
        note.addNote(filepath, queryToNote(req.query))
    } catch(err) {
        res.status(404)
    }
    res.status(200)
})

router.post('/edit', (req, res) => {
    try { 
        note.editNote(filepath, req.params.title, queryToNote(req.query))
    } catch(err) {
        res.status(404)
    }
    res.status(200)
})

router.delete('/delete', (req, res) => {
    try {
        note.deleteNote(filepath, req.params.title)
    } catch(err) {
        res.status(404)
    }
    res.status(200)
})

module.exports = router