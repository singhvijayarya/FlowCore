// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// function Dashboard() {
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   const [tasks, setTasks] = useState([]);

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//   });

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//       return;
//     }

//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await api.get("/tasks/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setTasks(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleChange = (e) => {
//     setTask({
//       ...task,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const addTask = async (e) => {
//     e.preventDefault();

//     try {
//       await api.post(
//         "/tasks/",
//         task,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setTask({
//         title: "",
//         description: "",
//       });

//       fetchTasks();

//     } catch (err) {
//       console.log(err);
//       alert("Failed to create task");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-slate-100">

//       <div className="flex justify-between items-center bg-white shadow p-5">

//         <h1 className="text-3xl font-bold">
//           Dashboard
//         </h1>

//         <button
//           onClick={logout}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg"
//         >
//           Logout
//         </button>

//       </div>

//       <div className="max-w-4xl mx-auto p-8">

//         <form
//           onSubmit={addTask}
//           className="bg-white p-6 rounded-lg shadow mb-8"
//         >

//           <h2 className="text-xl font-bold mb-4">
//             Create New Task
//           </h2>

//           <input
//             type="text"
//             name="title"
//             placeholder="Task Title"
//             value={task.title}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3 mb-4"
//             required
//           />

//           <textarea
//             name="description"
//             placeholder="Task Description"
//             value={task.description}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3 mb-4"
//             rows="4"
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Add Task
//           </button>

//         </form>

//         <h2 className="text-2xl font-bold mb-4">
//           My Tasks
//         </h2>

//         {
//           tasks.length === 0 ? (
//             <div className="bg-white p-5 rounded-lg shadow">
//               <p>No Tasks Found</p>
//             </div>
//           ) : (
//             <div className="space-y-4">

//               {tasks.map((task) => (

//                 <div
//                   key={task.id}
//                   className="bg-white p-5 rounded-lg shadow"
//                 >

//                   <h3 className="text-xl font-bold">
//                     {task.title}
//                   </h3>

//                   <p className="my-2">
//                     {task.description}
//                   </p>

//                   <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm">
//                     {task.status}
//                   </span>

//                 </div>

//               ))}

//             </div>
//           )
//         }

//       </div>

//     </div>
//   );
// }

// export default Dashboard;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    if (user?.role === "admin") {
      fetchUsers();
      fetchAllTasks();
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const response = await api.get("/tasks/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const addTask = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/tasks/",
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTask({
        title: "",
        description: "",
      });

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);

    setTask({
      title: task.title,
      description: task.description,
    });
  };

  const updateTask = async (e) => {
    e.preventDefault();

    try {

      await api.put(
        `/tasks/${editingId}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingId(null);

      setTask({
        title: "",
        description: "",
      });

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {

    if (!window.confirm("Delete this task?")) return;

    try {

      await api.delete(
        `/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-white shadow p-5 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">

            {user.role === "admin"
              ? "Admin Dashboard"
              : "User Dashboard"}

          </h1>

          <p className="text-gray-500">

            Welcome {user.name}

          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="max-w-6xl mx-auto p-8">

      {/* </div> */}
              {user.role === "user" && (
          <>
            <form
              onSubmit={editingId ? updateTask : addTask}
              className="bg-white p-6 rounded-lg shadow mb-8"
            >
              <h2 className="text-xl font-bold mb-4">
                {editingId ? "Update Task" : "Create New Task"}
              </h2>

              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={task.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mb-4"
                required
              />

              <textarea
                name="description"
                placeholder="Task Description"
                value={task.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mb-4"
                rows="4"
              />

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  {editingId ? "Update Task" : "Add Task"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);

                      setTask({
                        title: "",
                        description: "",
                      });
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

            <h2 className="text-2xl font-bold mb-5">
              My Tasks
            </h2>
          </>
        )}

        {user.role === "admin" && (
          <>
            <div className="grid grid-cols-2 gap-5 mb-8">

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold">
                  Total Users
                </h2>

                <p className="text-4xl mt-3 font-bold text-blue-600">
                  {users.length}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold">
                  Total Tasks
                </h2>

                <p className="text-4xl mt-3 font-bold text-green-600">
                  {tasks.length}
                </p>
              </div>

            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">

              <h2 className="text-2xl font-bold mb-4">
                All Users
              </h2>

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-3">ID</th>

                    <th className="text-left py-3">Name</th>

                    <th className="text-left py-3">Email</th>

                    <th className="text-left py-3">Role</th>

                  </tr>

                </thead>

                <tbody>

                  {users.map((u) => (

                    <tr
                      key={u.id}
                      className="border-b"
                    >

                      <td className="py-3">
                        {u.id}
                      </td>

                      <td>{u.name}</td>

                      <td>{u.email}</td>

                      <td className="font-semibold">
                        {u.role}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            <h2 className="text-2xl font-bold mb-5">
              All Tasks
            </h2>

          </>
        )}
        <div className="space-y-4">

          {tasks.length === 0 ? (

            <div className="bg-white p-5 rounded-lg shadow">
              <p>No Tasks Found</p>
            </div>

          ) : (

            tasks.map((taskItem) => (

              <div
                key={taskItem.id}
                className="bg-white p-5 rounded-lg shadow"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-xl font-bold">
                      {taskItem.title}
                    </h3>

                    <p className="my-2">
                      {taskItem.description}
                    </p>

                    <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {taskItem.status}
                    </span>

                    {user.role === "admin" && (
                      <div className="mt-3 text-sm text-gray-600">
                        Owner ID : {taskItem.owner_id}
                      </div>
                    )}

                  </div>

                  {user.role === "user" && (

                    <div className="flex gap-3">

                      <button
                        onClick={() => startEdit(taskItem)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTask(taskItem.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );


}

export default Dashboard;