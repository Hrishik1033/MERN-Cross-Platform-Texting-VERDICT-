/*import { Link } from 'react-router-dom';

const Home = () => (
  <section className="card-grid">
    <div className="card">
      <h2>Login</h2>
      <p>Access your account and jump into chat.</p>
      <Link className="button" to="/login">Go to Login</Link>
    </div>
    <div className="card">
      <h2>Signup</h2>
      <p>Create a new account to start chatting.</p>
      <Link className="button" to="/signup">Create Account</Link>
    </div>
    <div className="card">
      <h2>View Users</h2>
      <p>See everyone who’s registered.</p>
      <Link className="button" to="/users">View Users</Link>
    </div>
  </section>
);

export default Home;*/
import DashboardCards from '../components/DashboardCards';
import ProductivityChart from '../components/ProductivityChart';
import TaskCompletionChart from '../components/TaskCompletionChart';
import RecentActivity from '../components/RecentActivity';
import Activity from '../components/Activity';

const Home = () => (
  <>
    <div className="stats">
      <DashboardCards />
    </div>
    <div className="charts-row">
      <ProductivityChart />
      <TaskCompletionChart />
    </div>
    <div className="activity-row">
      <RecentActivity />
    </div>
    <div className="activity-row">
      <Activity />
    </div>
  </>
);

export default Home;

