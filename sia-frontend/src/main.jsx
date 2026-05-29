import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './pages/Login.jsx';
import Dashboard from './pages/dashboard.jsx';
import Tasks from './pages/tasks.jsx';
import CreateTask from './pages/create-task.jsx';
import Attendance from './pages/attendance.jsx';
import Kanban from './pages/kanban.jsx';
import Employees from './pages/employees.jsx';
import Projects from './pages/projects.jsx';
import Notifications from './pages/notifications.jsx';
import SendNotification from './pages/send-notification.jsx';
import Files from './pages/files.jsx';


ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <BrowserRouter>

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/tasks"
        element={<Tasks />}
      />

      <Route path="/create-task" element={<CreateTask />} />

      <Route path="/attendance" element={<Attendance />} />

      <Route path="/kanban" element={<Kanban />} />

      <Route path="/employees" element={<Employees />} />

      <Route path="/projects" element={<Projects />} />

      <Route path="/notifications" element={<Notifications />} />

      <Route path="/send-notification" element={<SendNotification />} />

      <Route path="/files" element={<Files />} />
      

    </Routes>

  </BrowserRouter>
);