import React from 'react';
import ContactItem from '../ContactItem';
import Notification from '../Notification';
import { useSelector } from 'react-redux';
import {
  getContacts,
  getFilter,
  getError,
  getIsLoading,
} from 'redux/selectors';
import { List, WrapList, ListTitle, Item } from './ContactList.styled';
import Loader from 'components/Loader';

const ContactList = () => {
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const normalizedFilter = filter.value.toLowerCase();

  const getVisibleContacts = contacts.filter(({ name }) =>
    name?.toLowerCase()?.includes(normalizedFilter)
  );
  const pending = isLoading && !error;

  return (
    <WrapList>
      <ListTitle>Contacts</ListTitle>
      {pending ? (
        <Loader />
      ) : contacts.length > 0 ? (
        <List>
          {getVisibleContacts.map(({ id, name, phone }) => (
            <Item key={id}>
              <ContactItem id={id} name={name} phone={phone} />
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
