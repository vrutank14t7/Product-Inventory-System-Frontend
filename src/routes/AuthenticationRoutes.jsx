import React from 'react';
import { lazy } from 'react';

import Loadable from '../component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('../component/pages/Auth/Login')));
const AuthRegister = Loadable(lazy(() => import('../component/pages/Auth/Signup')));
const AuthForgotPassword = Loadable(lazy(() => import('../component/pages/Auth/ForgotPassword')));
const BasicAuth = Loadable(lazy(() => import('../component/pages/Auth/BasicAuth')));


// ==============================|| AUTHENTICATION ROUTES ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/authentication/login',
      element: <BasicAuth title="Login" page={<AuthLogin />} />
    },
    {
      path: '/authentication/register',
      element: <BasicAuth title="Register" page={<AuthRegister />} />
    },
    {
      path: '/authentication/forgot_password',
      element: <BasicAuth title="Set Password" page={<AuthForgotPassword />} />
    },
  ]
};

export default AuthenticationRoutes;
