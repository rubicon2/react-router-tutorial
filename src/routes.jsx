import ErrorPage from './error-page';
import Root, { loader as rootLoader } from './routes/root';
import Contact, { loader as contactLoader } from './routes/contact';

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <h2>Wow, I am index child</h2>,
      },
      {
        path: '/contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
];

export default routes;