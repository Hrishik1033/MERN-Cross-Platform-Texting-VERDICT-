/*import { useEffect, useState } from 'react';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('Loading users…');

  useEffect(() => {
    fetch('http://localhost:3000/see')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.result || []);
        setStatus(data.message || '');
      })
      .catch(() => setStatus('Could not load users'));
  }, []);

  return (
    <section className="list-page">
      <h2>Registered Users</h2>
      {status && <p className="status">{status}</p>}
      <ul className="user-list">
        {users.map((u) => (
          <li key={u._id || u.email}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ViewUsers;*/
import { useEffect, useState } from 'react';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('Loading users…');

  useEffect(() => {
    fetch('http://localhost:3000/see')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.result || []);
        setStatus(data.message || '');
      })
      .catch(() => setStatus('Could not load users'));
  }, []);

  return (
    <section className="activity">
      <h2>Registered Users</h2>
      {status && <p className="status">{status}</p>}
      <ul className="user-list">
        {users.map((u) => (
          <li key={u._id || u.email}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ViewUsers;

