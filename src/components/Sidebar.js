// File: components/Sidebar.js
import React from 'react';
import { useRouter } from 'next/router';

const Sidebar = ({ selectedPanel, setSelectedPanel }) => {
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('email')
        router.push('/login')
    }

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 h-screen">
      <h1 className="text-xl font-bold mb-6">DASHBOARD</h1>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Admin Section</h2>
        <nav className="space-y-2">
          <button onClick={() => setSelectedPanel('manageUsers')} className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
            🧑‍💼 Manage Users
          </button>
          <button onClick={() => setSelectedPanel('logs')} className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
            📜 View Logs
          </button>
        </nav>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Editor Section</h2>
        <nav className="space-y-2">
          <button onClick={() => setSelectedPanel('content')} className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
            📝 Content Management
          </button>
        </nav>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Viewer Section</h2>
        <nav className="space-y-2">
          <button onClick={() => setSelectedPanel('viewContent')} className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
            👀 View Content
          </button>
        </nav>
      </div>

      <button className="mt-auto bg-gray-600 px-4 py-2 rounded w-full" onClick={handleLogout}>Logout</button>
    </aside>
  );
};

export default Sidebar;
