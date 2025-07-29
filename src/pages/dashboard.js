import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import AdminPanel from "../components/AdminPanel";
import EditorPanel from "../components/EditorPanel";
import ViewerPanel from "../components/ViewerPanel";
import SystemLog from '../components/systemLog'

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState("manageUsers");
  const router = useRouter();

  const fetchData = async () => {
    const data = localStorage.getItem("email");

    if (!data) {
      router.push("/login");
    }

    const [usersRes, logsRes] = await Promise.all([
      fetch("/api/admin/users"),
      fetch("/api/admin/logs"),
    ]);

    if (usersRes.ok) setUsers(await usersRes.json());
    if (logsRes.ok) setLogs(await logsRes.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditRole = (id, newRole) => {
    // Logic to update user role via API
  };

  const handleDeleteUser = (id) => {
    // Logic to delete user via API
  };

  //   if (!user) return <div>Loading...</div>;

  const renderPanel = () => {
    switch (selectedPanel) {
      case "manageUsers":
        return (
          <AdminPanel
            users={users}
            logs={[]}
            handleEditRole={handleEditRole}
            handleDeleteUser={handleDeleteUser}
          />
        );
      case "logs":
        return (
            <SystemLog />
        //   <AdminPanel
        //     users={[]}
        //     logs={logs}
        //     handleEditRole={() => {}}
        //     handleDeleteUser={() => {}}
        //   />
        
        );
      case "content":
        return <EditorPanel />;
      case "viewContent":
        return <ViewerPanel />;
      default:
        return <div>Select a panel</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        selectedPanel={selectedPanel}
        setSelectedPanel={setSelectedPanel}
      />
      <main className="flex-1 p-6 overflow-auto">{renderPanel()}</main>
    </div>  
  );
};

export default Dashboard;
