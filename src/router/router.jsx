
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../rootlayout/RootLayout";
import Page from "../component/Page"
import PrivateRoute from "../component/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import LogInPage from "../pages/LogInPage";
import Error from "../pages/Error";
import ForgotPassword from "../pages/ForgotPassword";
import Details from "../pages/Details";
import Edit from "../pages/Edit";
import ManageEvents from "../pages/ManageEvents";
import JoinedEvents from "../pages/JoinedEvents";
import UpcominEvents from "../pages/UpcominEvents";
import CreatEvents from "../pages/CreatEvents";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [

      {
        path: "/",
        element: (
          <Page title="ServeCircle">
            <Home />
          </Page>
        ),
        loader: () => fetch("https://bacand-for-eleven.vercel.app/events"),
        hydrateFallbackElement: (
          <div className="flex items-center justify-center h-screen">
            <span
              className="loading loading-infinity"
              style={{
                width: '3rem',  // default size (48px)
                height: '3rem',
              }}
            ></span>
          </div>
        ),
      },


      {
        path: "/joinedevents",
        element: (
          <PrivateRoute>
            <Page title="Joined Events | ServeCircle">
              <JoinedEvents />
            </Page>
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/manageevents",
        element: (
          <PrivateRoute>
            <Page title="Manage Event | ServeCircle">
              <ManageEvents />
            </Page>
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/createvents",
        element: (
          <PrivateRoute>
            <Page title="Create Events | ServeCircle">
              <CreatEvents />
            </Page>
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRoute>
            <Page title="Edit | ServeCircle">
              <Edit />
            </Page>
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/upcominevents",
        element: (
          <Page title="Upcomin Events | ServeCircle">
            <UpcominEvents />
          </Page>
        ),
        loader: () => fetch("https://bacand-for-eleven.vercel.app/events"),
        hydrateFallbackElement: (
          <div className="flex items-center justify-center h-screen">
            <span
              className="loading loading-infinity"
              style={{
                width: '3rem',  // default size (48px)
                height: '3rem',
              }}
            ></span>
          </div>

        ),
      },
      {
        path: "/login",
        element: (
          <Page title="Login | ServeCircle">
            <Login />
          </Page>
        ),
        errorElement: <Error />,
      },
      {
        path: "/registration",
        element: (
          <Page title="Create Account | ServeCircle">
            <Registration />
          </Page>
        ),
        errorElement: <Error />,
      },
      {
        path: "/forgotpass",
        element: (
          <Page title="Forgot Password | ServeCircle">
            <ForgotPassword />
          </Page>
        ),
        errorElement: <Error />,
      },
      {
        path: "/loginfirst",
        element: (
          <Page title="Login Required | ServeCircle">
            <LogInPage />
          </Page>
        ),
        errorElement: <Error />,
      },

      {
        path: "/events/:id",
        element: (
          <PrivateRoute>
            <Page title="Details | ServeCircle">
              <Details />
            </Page>
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },

    ],
  },
]);
export default router;
