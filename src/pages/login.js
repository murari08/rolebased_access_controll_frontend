import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SignupModal from '../components/SignupModal';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email:'',
    password:'',
    role:''
  })
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const setLog = async (email,role) => {
    try{
        const data = {
            email:email || '',
            role: role || '',
            activity: 'login'
        }
        const res = await axios.post('http://localhost:5000/api/addlogs',data)
    }catch(err){
        console.log(err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
   const res = await axios.post('http://localhost:5000/api/login', loginData);
    console.log(res)

    if (res.status == 200){
        localStorage.setItem('email',res.data.email)
        localStorage.setItem('token',res.data.token)
        setLog(loginData.email,loginData.role)
        router.push('/dashboard')
    } 
    else {setError('Invalid credentials');}
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Username</label>
          <input
            type="email"
            className="w-full border border-gray-300 px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={loginData.email}
            onChange={(e) => setLoginData((prev)=>({
                ...prev,
                email: e.target.value
            }))}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={loginData.password}
            onChange={(e) => setLoginData((prev)=>({
                ...prev,
                password: e.target.value
            }))}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={()=>setShowSignup(true)}
          className="w-full mt-4 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Don&apos;t have an account? Sign Up
        </button>
      </form>

      {/* Signup Modal */}
      <SignupModal isOpen={showSignup} onClose={() => setShowSignup(false)} />
    </div>
  );
}
