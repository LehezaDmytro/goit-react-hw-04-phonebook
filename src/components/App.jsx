import { useState, useEffect } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts && contacts.length) {
      setContacts([...contacts]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onHandleSubmit = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const findContact = contacts.find(contact => contact.name === name);
    if (findContact) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts([newContact, ...contacts]);
    }
  };

  const onFilterChange = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteItem = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onHandleSubmit={onHandleSubmit} />
      <h2>Contacts</h2>
      <Filter onFilterChange={onFilterChange} filter={filter} />
      <ContactList
        filteredContacts={filteredContacts()}
        deleteItem={deleteItem}
      />
    </div>
  );
};
