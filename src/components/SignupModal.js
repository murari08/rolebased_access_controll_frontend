import axios from 'axios';
import React, { useState } from 'react';

const SignupModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('viewer');

  const [signup, setSignup] = useState({
    email:'',
    role:'',
    password:''
  })

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/signup',signup)

    if(res.status == 200){
        onClose();
    }


    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={signup.email}
              onChange={(e) => setSignup((prev)=>({
                ...prev,
                email: e.target.value
              }))}
              required
              placeholder="Choose a Email"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={signup.password}
              onChange={(e) => setSignup((prev)=>({
                ...prev,
                password: e.target.value
              }))}
              required
              placeholder="Choose a strong password"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Role</label>
            <select
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={signup.role}
              onChange={(e) => setSignup((prev)=>({
                ...prev,
                role: e.target.value
              }))}
            >
              <option className='text-gray-700' value="editor">Admin</option>
              <option className='text-gray-700' value="viewer">Viewer</option>
              <option className='text-gray-700' value="editor">Editor</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
