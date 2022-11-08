import React from 'react';
import ContactItem from '../ContactItem';
import Notification from '../Notification';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { List, WrapList, ListTitle, Item } from './ContactList.styled';

const ContactList = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  console.log(contacts);
  const normalizedFilter = filter.value.toLowerCase();

  const getVisibleContacts = contacts.filter(({ name }) =>
    name?.toLowerCase()?.includes(normalizedFilter)
  );

  return (
    <WrapList>
      <ListTitle>Contacts</ListTitle>
      {contacts.length > 0 ? (
        <List>
          {getVisibleContacts.map(({ id, name, phone }) => (
            <Item key={id}>
              <ContactItem id={id} name={name} number={phone} />
            </Item>
          ))}
        </List>
      ) : (
        <Notification message="There is no contact in Phonebook" />
      )}
    </WrapList>
  );
};

export default ContactList;
