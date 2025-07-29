import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);

      const [usersRes, logsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/logs')
      ]);

      if (usersRes.ok) setUsers(await usersRes.json());
      if (logsRes.ok) setLogs(await logsRes.json());
    };

    fetchData();
  }, []);

  const handleEditRole = (id, newRole) => {
    // Logic to update user role via API
  };

  const handleDeleteUser = (id) => {
    // Logic to delete user via API
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">ADMIN DASHBOARD</h1>
        {user.role === 'admin' && (
          <>
            <div className="mb-2">Manage Users</div>
            <div className="mb-2">System Logs</div>
          </>
        )}
        {user.role === 'editor' && <div className="mb-2">Content Management</div>}
        {user.role === 'viewer' && <div className="mb-2">View Content</div>}
        <button className="mt-10 bg-gray-600 px-4 py-2 rounded">Logout</button>
      </aside>
      <main className="flex-1 p-6">
        {user.role === 'admin' && (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Username</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="text-center border-t">
                      <td className="p-2">{u.username}</td>
                      <td className="p-2">{u.role}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleEditRole(u._id, 'editor')}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">View System Logs</h2>
              <ul className="list-disc pl-6">
                {logs.map((log, i) => (
                  <li key={i} className="mb-1">
                    {log.time} - {log.message}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {user.role === 'editor' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Content Management</h2>
            <p>Editor-specific content management UI goes here.</p>
          </div>
        )}

        {user.role === 'viewer' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">View Content</h2>
            <p>Viewer-specific content view goes here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
