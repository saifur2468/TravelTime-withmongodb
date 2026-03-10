import React, { useEffect, useState } from "react";
import { auth } from "../Authsection/Authcontex";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaCheck } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {

  const [requests, setRequests] = useState([])
  const [admin, setAdmin] = useState(null)

  const navigate = useNavigate()

  const ADMIN_EMAIL = "mdislamshakib218@gmail.com"

  useEffect(() => {

    const unsub = auth.onAuthStateChanged(user => {

      if (!user) {
        alert("Login first")
        navigate("/login")
        return
      }

      if (user.email !== ADMIN_EMAIL) {
        alert("You are not Admin")
        navigate("/")
        return
      }

      setAdmin(user)
      fetchRequests()

    })

    return () => unsub()

  }, [navigate])


  const fetchRequests = async () => {

    const res = await fetch("http://localhost:5000/visit-request/all")

    const data = await res.json()

    setRequests(data)

  }


  // Accept Request

  const handleAccept = async (id) => {

    await fetch(`http://localhost:5000/visit-request/${id}/accept`, {
      method: "PATCH"
    })

    setRequests(prev =>
      prev.map(r =>
        r._id === id ? { ...r, status: "Accepted" } : r
      )
    )

  }


  // Delete Request

  const handleDelete = async (id) => {

    await fetch(`http://localhost:5000/visit-request/${id}`, {
      method: "DELETE"
    })

    setRequests(prev =>
      prev.filter(r => r._id !== id)
    )

  }


  if (!admin) {
    return <p className="text-center mt-10">Loading...</p>
  }


  // Chart Data

  const chartData = [

    {
      name: "Requests",
      value: requests.length
    },

    {
      name: "Accepted",
      value: requests.filter(r => r.status === "Accepted").length
    },

    {
      name: "Pending",
      value: requests.filter(r => r.status === "Pending").length
    }

  ]


  return (

    <div className="flex min-h-screen bg-gray-100">


      {/* Sidebar */}

      <div className="w-64 bg-blue-900 text-white p-6">

        <div className="text-center mb-10">

          <img
            src={admin.photoURL || "https://i.pravatar.cc/100"}
            className="w-20 h-20 rounded-full mx-auto"
          />

          <h2 className="mt-3 font-bold text-lg">
            {admin.displayName || "Admin"}
          </h2>

          <p className="text-sm">
            {admin.email}
          </p>

        </div>


        <ul className="space-y-4">

          <Link to="/">
            <li className="cursor-pointer hover:text-gray-300">
              Home
            </li>
          </Link>

          <li className="cursor-pointer hover:text-gray-300">
            Tourist Spots
          </li>

          <li className="cursor-pointer hover:text-gray-300">
            Users
          </li>

          <li className="cursor-pointer hover:text-gray-300">
            Messages
          </li>

          <li className="cursor-pointer hover:text-gray-300">
            Settings
          </li>

        </ul>

      </div>


      {/* Main Content */}

      <div className="flex-1 p-8">


        {/* Top Cards */}

        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white shadow p-5 rounded">

            <h3 className="text-gray-500">
              Total Requests
            </h3>

            <p className="text-2xl font-bold">
              {requests.length}
            </p>

          </div>


          <div className="bg-white shadow p-5 rounded">

            <h3 className="text-gray-500">
              Accepted
            </h3>

            <p className="text-2xl font-bold">
              {requests.filter(r => r.status === "Accepted").length}
            </p>

          </div>


          <div className="bg-white shadow p-5 rounded">

            <h3 className="text-gray-500">
              Pending
            </h3>

            <p className="text-2xl font-bold">
              {requests.filter(r => r.status === "Pending").length}
            </p>

          </div>


          <div className="bg-white shadow p-5 rounded">

            <h3 className="text-gray-500">
              Users
            </h3>

            <p className="text-2xl font-bold">
              1
            </p>

          </div>

        </div>



        {/* Chart Section */}

        <div className="bg-white p-6 rounded shadow mb-10">

          <h2 className="text-xl font-bold mb-4">
            Tourism Analytics
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#2563eb" />

            </BarChart>

          </ResponsiveContainer>

        </div>



        {/* Requests Table */}

        <div className="bg-white shadow rounded">

          <h2 className="text-xl font-bold p-5 border-b">
            Visit Requests
          </h2>


          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3 text-left">
                  Spot
                </th>

                <th className="p-3 text-left">
                  User
                </th>

                <th className="p-3 text-left">
                  Email
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-center">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {requests.map(req => (

                <tr key={req._id} className="border-b hover:bg-gray-50">

                  <td className="p-3">
                    {req.spotName}
                  </td>

                  <td className="p-3">
                    {req.userName}
                  </td>

                  <td className="p-3">
                    {req.userEmail}
                  </td>

                  <td className="p-3">

                    <span className={`px-3 py-1 text-white rounded text-sm
${req.status === "Accepted" ? "bg-green-500" : "bg-yellow-500"}
`}>

                      {req.status}

                    </span>

                  </td>


                  <td className="p-3 flex justify-center gap-3">


                    {req.status === "Pending" && (

                      <button
                        onClick={() => handleAccept(req._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >

                        <FaCheck />

                      </button>

                    )}


                    <button
                      onClick={() => handleDelete(req._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >

                      <FaTrash />

                    </button>


                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


      </div>

    </div>

  )

}

export default AdminDashboard