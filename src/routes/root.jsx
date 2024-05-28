import {
  NavLink,
  Outlet,
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
  redirect,
} from 'react-router-dom';
import { getContacts, createContact } from '../contacts';
import { useEffect } from 'react';

export async function loader({ request }) {
  // This runs every time the url changes
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    // Loader gets current search param q from the url.
    // So if user presses back button and the url's q changes, this will be reflected in the search input.
    // Has to be in useEffect in order to access dom api.
    document.getElementById('q').value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <NavLink
                  to={`/contacts/${contact.id}`}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  {contact.first || contact.last ? (
                    contact?.first + ' ' + contact?.last
                  ) : (
                    <i>No Name</i>
                  )}
                  {contact.favorite && <span>★</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
}
