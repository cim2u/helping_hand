import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css";
import "../style/About.css";
import logo from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faCircleQuestion,
  faRightFromBracket,
  faMoneyBillTransfer,
  faCheck,
  faXmark,
  faClock,
  faUserCheck 
} from "@fortawesome/free-solid-svg-icons";

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for pending payments
  const [pendingPayments, setPendingPayments] = useState([
    {
      id: 1,
      user: "Juan Dela Cruz",
      amount: 1500,
      reference: "GCASH123456789",
      date: "2023-05-15",
      status: "pending"
    },
    {
      id: 2,
      user: "Maria Santos",
      amount: 2500,
      reference: "GCASH987654321",
      date: "2023-05-16",
      status: "pending"
    },
    {
      id: 3,
      user: "Pedro Bautista",
      amount: 1800,
      reference: "GCASH567891234",
      date: "2023-05-17",
      status: "pending"
    }
  ]);

  // State for registered users
  const [registeredUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Buyer"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Seller"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Buyer"
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "Seller"
    }
  ]);

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("isAdmin");
      navigate("/admin-login");
    }
  };

  const handlePaymentAction = (id, action) => {
    setPendingPayments(pendingPayments.map(payment => {
      if (payment.id === id) {
        return { ...payment, status: action };
      }
      return payment;
    }));
    
    // In a real app, you would also make an API call here to update the payment status
    console.log(`Payment ${id} ${action}`);
  };

  // Filter pending payments
  const activePendingPayments = pendingPayments.filter(payment => payment.status === "pending");

  // Monthly Earnings - Animated Line Chart
  const monthlyEarningsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Earnings (₱)',
      data: [12000, 19000, 15000, 22000, 18000, 25000, 21000, 28000, 24000, 30000, 27000, 35000],
      borderColor: '#4bc0c0',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#4bc0c0',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  // Yearly Earnings - Animated Bar Chart
  const yearlyEarningsData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'Yearly Earnings (₱)',
      data: [150000, 180000, 210000, 240000, 300000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
    }]
  };

  // National Sales - Animated Pie Chart
  const nationalSalesData = {
    labels: ['Luzon', 'Visayas', 'Mindanao'],
    datasets: [{
      label: 'Sales Distribution',
      data: [55, 25, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 2,
      hoverOffset: 15
    }]
  };

  // Enhanced animation options for all charts
  const chartAnimationOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      animateScale: true,
      animateRotate: true
    },
    transitions: {
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    }
  };

  // Line Chart with custom animations
  const lineChartOptions = {
    ...chartAnimationOptions,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#666',
          callback: function(value) {
            return '₱' + value.toLocaleString();
          },
        },
      },
    },
    maintainAspectRatio: false,
    animation: {
      ...chartAnimationOptions.animation,
      delay: (context) => {
        if (context.type === 'data' && context.mode === 'default') {
          return context.dataIndex * 100;
        }
        return 0;
      },
    }
  };

  // Bar Chart with custom animations
  const barChartOptions = {
    ...chartAnimationOptions,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#666',
          callback: function(value) {
            return '₱' + value.toLocaleString();
          },
        },
      },
    },
    maintainAspectRatio: false,
    animation: {
      ...chartAnimationOptions.animation,
      delay: (context) => {
        if (context.type === 'data' && context.mode === 'default') {
          return context.dataIndex * 200;
        }
        return 0;
      },
    }
  };

  // Pie Chart with custom animations
  const pieChartOptions = {
    ...chartAnimationOptions,
    plugins: {
      ...chartAnimationOptions.plugins,
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    maintainAspectRatio: false,
    animation: {
      ...chartAnimationOptions.animation,
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeOutBounce'
    }
  };

  return (
    <div className="containerAdmin">
      {/* Header */}
      <header className="about-header">
        <div className="about-header-1"></div>
        <div className="logo-container">
          <img src={logo} alt="Helping Hand Logo" className="logo" />
        </div>
        <h2 className="titleAdmin">DASHBOARD</h2>
      </header>

      <div className="image-section-2">
        <img
          src="https://i.imgur.com/GT5CDSQ.png"
          alt="Helping Hand"
          className="about-image-2"
        />
      </div>

      {/* Sidebar */}
      <aside className="sidebarAdmin" aria-label="Admin sidebar navigation">
        <div className="avatarAdmin" aria-hidden="true"></div>

        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Francim Elorde</p>
          <p className="adminNameAdminRole">Admin</p>
        </div>

        {/* Navigation Menu */}
        <nav className="menuAdmin" role="navigation" aria-label="Admin menu">
          <Link
            to="/admin/dashboard"
            className={`menuItemAdmin ${
              location.pathname === "/admin/dashboard" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faHouse} className="iconAdmin" />
            <span className="menuTextAdmin">Dashboard</span>
          </Link>

          <Link
            to="/admin/user-management"
            className={`menuItemAdmin ${
              location.pathname === "/admin/user-management" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="iconAdmin" />
            <span className="menuTextAdmin">User Management</span>
          </Link>

          <Link
            to="/admin/verify-seller"
            className={`menuItemAdmin ${
              location.pathname === "/admin/verify-seller" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUserCheck} className="iconAdmin" />
            <span className="menuTextAdmin">Verify Seller</span>
          </Link>

          <Link
            to="/admin/help-center"
            className={`menuItemAdmin ${
              location.pathname === "/admin/help-center" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="iconAdmin" />
            <span className="menuTextAdmin">Help Center</span>
          </Link>

         <div
                     className="Logout-menuItemAdmin"
                     style={{ cursor: "pointer" }}
                     onClick={handleLogout}
                     role="button"
                     tabIndex={0}
                     onKeyPress={(e) => {
                       if (e.key === "Enter" || e.key === " ") handleLogout();
                     }}
                     aria-label="Log out"
                   >
                     <FontAwesomeIcon icon={faRightFromBracket} className="iconAdmin" />
                     <span className="menuTextAdmin">Log Out</span>
                   </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="mainContentAdmin" tabIndex={-1}>
        {/* Pending Payments Section */}
        <section className="cardAdmin pending-payments" aria-labelledby="pending-payments-title">
          <div className="payments-container">
            {activePendingPayments.length > 0 ? (
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Amount</th>
                    <th>GCash Reference</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activePendingPayments.map(payment => (
                    <tr key={payment.id}>
                      <td>{payment.user}</td>
                      <td>₱{payment.amount.toLocaleString()}</td>
                      <td>{payment.reference}</td>
                      <td>{payment.date}</td>
                      <td className="actions">
                        <button 
                          onClick={() => handlePaymentAction(payment.id, "approved")}
                          className="approve-btn"
                          aria-label={`Approve payment from ${payment.user}`}
                        >
                          <FontAwesomeIcon icon={faCheck} /> Approve
                        </button>
                        <button 
                          onClick={() => handlePaymentAction(payment.id, "rejected")}
                          className="reject-btn"
                          aria-label={`Reject payment from ${payment.user}`}
                        >
                          <FontAwesomeIcon icon={faXmark} /> Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-payments">No pending payments at this time.</p>
            )}
          </div>
        </section>

        {/* Monthly Earnings - Animated Line Chart */}
        <section className="cardAdmin" aria-labelledby="monthly-earnings-title">
          <h3 id="monthly-earnings-title" className="cardTitleAdmin">
            Monthly Earnings
          </h3>
          <div className="chart-container-3d">
            <Line 
              data={monthlyEarningsData} 
              options={lineChartOptions}
              redraw
            />
          </div>
        </section>

       {/* Registered Users Count Section */}
<section className="cardAdmin" aria-labelledby="registered-users-title">
  <h3 id="registered-users-title" className="cardTitleAdmin">
    Registered Users
  </h3>
  <div className="users-count-container">
    <div className="users-count">
      {registeredUsers.length}
    </div>
    <p className="users-count-label">Total Registered Users</p>
  </div>
</section>
      </main>
    </div>
  );
};

export default AdminDashboard;