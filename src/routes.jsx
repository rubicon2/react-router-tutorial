import ErrorPage from './error-page';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import Contact, { loader as contactLoader } from './routes/contact';

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
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
