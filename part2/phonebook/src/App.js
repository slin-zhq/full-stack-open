import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName && newNumber) { 
      // prevents adding empty contact (name and number)
      const duplicatePerson = persons.find((person) => person.name === newName)

      if (duplicatePerson) {
        if (window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`)
          ) {
            personService
              .update(duplicatePerson.id, { ...duplicatePerson, number: newNumber })
              .then(returnedPerson => {
                setPersons(persons.map(p => p.id !== duplicatePerson.id ? p : returnedPerson))
                setNewName('')
                setNewNumber('')
                setFilterName('')
              })
          }
      } else {
        const newPersonObject = {
          name: newName,
          number: newNumber
        }

        personService
          .create(newPersonObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setFilterName('')
          })
      }
    } else if (newNumber) {
      alert('Please type in a name.')
    } else if (newName) {
      alert('Please type in a number.')
    } else {
      alert('Please type in a name and a number.')
    }
  }

  const personsToShow = filterName 
    ? persons.filter(({ name }) => name.toLowerCase().includes(filterName))
    : persons

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)){
      personService
      .del(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange}/>
      <h3>New contact</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App