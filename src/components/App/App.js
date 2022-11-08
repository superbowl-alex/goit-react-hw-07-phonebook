import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { getError, getIsLoading } from 'redux/selectors';
import GlobalStyles from 'GlobalStyles';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import { Container, WrapForms, FormTitle } from './App.styled';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <GlobalStyles />
      <WrapForms>
        <FormTitle>Phonebook</FormTitle>
        <ContactForm />
        <Filter />
      </WrapForms>
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList />
    </Container>
  );
}
