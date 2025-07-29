import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AdminPanel = ({ users, logs, handleEditRole, handleDeleteUser }) => {
  const [logData, setLogData] = useState([]);
    const router = useRouter()
    const isLogin = ()=> {
        try{
            const data = localStorage.getItem('email')

            if(data){
                router.push('/login')
            }

        }catch(err){
            console.log(err)
        }
    }


  const [userAccount,setAccount] = useState([])

  const getLogin = async() => {
    try{
        const res = await axios.get('http://localhost:5000/api/getlogdetails', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(res.status == 200){
            setAccount(res.data)
        }

    }catch(err){
         if (err.response && err.response.status === 403) {
        alert('Access Denied: You do not have permission to view this content.');
      } else {
        setError('Something went wrong. Please try again.',err);
      }
      
    }
  }

  useEffect(() => {
    getLogin()
  }, []);

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md min-h-screen">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {userAccount.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.email}</td>
                <td className="p-2 capitalize">{u.role}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditRole(u._id, 'editor')}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* <section>
        <h2 className="text-2xl font-semibold mb-4">View System Logs</h2>
        <ul className="list-disc pl-6 space-y-2">
          {logData.map((log, i) => (
            <li key={i}>
              <div><strong>Email:</strong> {log.email}</div>
              <div><strong>Role:</strong> {log.role}</div>
              <div><strong>Activity:</strong> {log.activity}</div>
            </li>
          ))}
        </ul>
      </section> */}
    </div>
  );
};

export default AdminPanel;
