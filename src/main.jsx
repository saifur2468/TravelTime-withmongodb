import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./Component/Pages/Home";
import Error from "./Component/Pages/Error";
import ALLTouristSpot from "./Component/Pages/ALLTouristSpot"
import AddTouristSpot from "./Component/Pages/AddTouristSpot"
import MyList from "./Component/Pages/MyLIst"
import Login from "./Component/Authsection/Login"
import MainLayout from "./Component/Pages/Router";
import AuthProvider from "./Component/Authsection/AuthProvider";
import Register from "./Component/Authsection/Register";
import PrivateRoute from "./Component/Routes/PrivateRoute";
import SpotDetails from "./Component/Pages/SpotDetails";
import CountrySpots from "./Component/Pages/CountrySpots"
import AdminDashboard from "./Component/Pages/AdminDashboard";
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home></Home>,
  //   errorElement:<Error></Error>
  // },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error></Error>
      },
      {
        path: "allTouristSpot",
        element:(
          <PrivateRoute>
            <ALLTouristSpot></ALLTouristSpot>
          </PrivateRoute>
        ) 
      },
      {
        path: "AddTouristsSpot",
        element:(
          <PrivateRoute>
            <AddTouristSpot></AddTouristSpot>
          </PrivateRoute>
        )
      },
      {
        path: "mylist",
        element:(
          <PrivateRoute>
            <MyList></MyList>
          </PrivateRoute>
        ) 
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "Register",
        element:<Register></Register>
      },
      {
  path:"allTouristSpot/:id",
  element: (
    <PrivateRoute>
      <SpotDetails />
    </PrivateRoute>
  )
},
{

  path: "country/:countryName/spots",
  element: <CountrySpots />

},
{
  path:"/AdminDashboard",
  element:(
    <PrivateRoute>
      <AdminDashboard></AdminDashboard>
    </PrivateRoute>
  )
}

    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
