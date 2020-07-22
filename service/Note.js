const fs = require('fs')

const writeNote = (newJSON, filepath) => {
    fs.writeFile(filepath, newJSON, err => {
        if (err)
            throw err
    })
}

const getNotes = filepath => JSON.parse(fs.readFileSync(filepath))

exports.getNotes = getNotes

exports.addNote = (filepath, newNote) => {
    let fileData = getNotes(filepath)

    console.log('File data', fileData)
    fileData.push(newNote)
    try {
        writeNote(JSON.stringify(fileData), filepath)
    } catch(err) {
        throw err
    }
}

exports.editNote = (filepath, title, newNote) => {
    let fileData = getNotes(filepath)

    fileData = fileData.filter(note => note.title !== title)
    fileData.push(newNote)
    try {
        writeNote(JSON.stringify(fileData), filepath)
    } catch(err) {
        throw err
    }
}

exports.deleteNote = (filepath, title) => {
    let fileData = getNotes(filepath)

    fileData = fileData.filter(note => note.title !== title)
    try {
        writeNote(JSON.stringify(fileData), filepath)
    } catch(err) {
        throw err
    }
}