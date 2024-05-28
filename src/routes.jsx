import ErrorPage from './error-page';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import Index from './routes/index';
import Contact, { loader as contactLoader } from './routes/contact';
import EditContact, {
  loader as editLoader,
  action as editAction,
} from './routes/edit';
import { action as destroyAction } from './routes/destroy';

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
        element: <Index />,
      },
      {
        path: '/contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: '/contacts/:contactId/edit',
        element: <EditContact />,
        loader: editLoader,
        action: editAction,
      },
      {
        path: '/contacts/:contactId/destroy',
        action: destroyAction,
        errorElement: <div>Something went wrong!</div>,
      },
    ],
  },
];

export default routes;
