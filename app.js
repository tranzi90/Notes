const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')

const title = {
    describe: 'Title of note',
    demand: true,
    alias: 't',
}

const body = {
    describe: 'Body of note',
    demand: true,
    alias: 'b',
}

const argv = yargs
    .command('add', 'Add a new note', {
        title,
        body,
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title,
    })
    .command('remove', 'Remove a note', {
        title,
    })
    .help().argv

var command = argv._[0]

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body)
    if (note) {
        console.log(`Note added!`)
        notes.logNote(note)
    } else console.log(`Note ${argv.title} already exists!`)
} else if (command === 'list') {
    var allNotes = notes.getAll()
    console.log(`Total ${allNotes.length} notes:`)
    allNotes.forEach((note) => notes.logNote(note))
} else if (command === 'read') {
    var noteTaken = notes.getNote(argv.title)
    if (noteTaken) notes.logNote(noteTaken)
    else console.log(`Note ${argv.title} not found!`)
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title)
    var message = noteRemoved ? 'Заметка удалена' : 'не удалено'
    console.log(message)
} else {
    console.log('Wrong command')
}