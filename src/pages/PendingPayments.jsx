import React, { useState, useEffect } from 'react';
import { Table, Button, Spin, message, Tag, Space, Modal } from 'antd';
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faUser, 
  faMoneyBillTransfer, 
  faUserCheck, 
  faCircleQuestion, 
  faRightFromBracket 
} from '@fortawesome/free-solid-svg-icons';
import api from '../api/payments';
import logo from '../assets/Logo.png';

const PendingPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const response = await api.getPendingPayments();
      setPayments(response.data);
    } catch (error) {
      message.error('Failed to fetch pending payments.');
      console.error('Fetch error:', error);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (paymentId) => {
    try {
      await api.approvePayment(paymentId);
      message.success('Payment approved successfully.');
      fetchPendingPayments();
      setSelectedRowKeys((keys) => keys.filter(key => key !== paymentId));
    } catch (error) {
      message.error('Failed to approve payment.');
      console.error('Approve error:', error);
    }
  };

  const handleReject = async (paymentId) => {
    try {
      await api.rejectPayment(paymentId);
      message.success('Payment rejected successfully.');
      fetchPendingPayments();
      setSelectedRowKeys((keys) => keys.filter(key => key !== paymentId));
    } catch (error) {
      message.error('Failed to reject payment.');
      console.error('Reject error:', error);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedRowKeys.length === 0) return;

    try {
      await api.bulkApprovePayments(selectedRowKeys);
      message.success('Selected payments approved successfully.');
      setSelectedRowKeys([]);
      fetchPendingPayments();
    } catch (error) {
      message.error('Failed to approve selected payments.');
      console.error('Bulk approve error:', error);
    }
  };

  const confirmBulkApprove = () => {
    Modal.confirm({
      title: 'Confirm Bulk Approval',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to approve ${selectedRowKeys.length} payment(s)?`,
      okText: 'Yes, Approve',
      cancelText: 'Cancel',
      onOk: handleBulkApprove,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Adjust key accordingly
    message.success('Logged out successfully.');
    navigate('/login');
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: 'ascend',
      width: 100,
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      width: 200,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) =>
        `₱${amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      width: 150,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      defaultSortOrder: 'descend',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = 'default';
        if (status === 'pending') color = 'orange';
        else if (status === 'approved') color = 'green';
        else if (status === 'rejected') color = 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      width: 130,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="middle" wrap>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.id)}
            disabled={record.status !== 'pending'}
            aria-label={`Approve payment ID ${record.id} from ${record.customerName}`}
          >
            Approve
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.id)}
            disabled={record.status !== 'pending'}
            aria-label={`Reject payment ID ${record.id} from ${record.customerName}`}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  // Row selection config for checkbox selection
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.status !== 'pending',
      'aria-disabled': record.status !== 'pending',
    }),
  };

  return (
    <div className="containerAdmin">
      {/* Header */}
      <header className="about-header" role="banner">
        <div className="about-header-1" />
        <div className="logo-container">
          <img src={logo} alt="HelpingHand Logo" className="logo" />
        </div>
        <h2 className="titleAdmin">HELP CENTER</h2>
      </header>

      {/* Image Section */}
      <section className="image-section-2" aria-label="Helping Hand image">
        <img
          src="https://i.imgur.com/GT5CDSQ.png"
          alt="Helping Hand"
          className="about-image-2"
        />
      </section>

      {/* Sidebar Navigation */}
      <aside className="sidebarAdmin" aria-label="Admin Navigation Sidebar">
        <div className="avatarAdmin" aria-hidden="true" />
        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Francim Elorde</p>
          <p className="adminNameAdminRole">Admin</p>
        </div>

        <nav
          className="menuAdmin"
          role="navigation"
          aria-label="Admin menu"
          tabIndex={0}
        >
          <Link
            to="/admin/dashboard"
            className={`menuItemAdmin ${
              location.pathname === '/admin/dashboard' ? 'active' : ''
            }`}
          >
            <FontAwesomeIcon icon={faHouse} className="iconAdmin" />
            <span className="menuTextAdmin">Dashboard</span>
          </Link>

          <Link
            to="/admin/user-management"
            className={`menuItemAdmin ${
              location.pathname === '/admin/user-management' ? 'active' : ''
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="iconAdmin" />
            <span className="menuTextAdmin">User Management</span>
          </Link>

          <Link
            to="/admin/payments"
            className={`menuItemAdmin ${
              location.pathname === '/admin/payments' ? 'active' : ''
            }`}
          >
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="iconAdmin" />
            <span className="menuTextAdmin">Pending Payments</span>
          </Link>

          <Link
            to="/admin/verify-seller"
            className={`menuItemAdmin ${
              location.pathname === '/admin/verify-seller' ? 'active' : ''
            }`}
          >
            <FontAwesomeIcon icon={faUserCheck} className="iconAdmin" />
            <span className="menuTextAdmin">Verify Seller</span>
          </Link>

          <Link
            to="/admin/help-center"
            className={`menuItemAdmin ${
              location.pathname === '/admin/help-center' ? 'active' : ''
            }`}
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="iconAdmin" />
            <span className="menuTextAdmin">Help Center</span>
          </Link>

          {/* Logout */}
          <div
            className="Logout-menuItemAdmin"
            onClick={handleLogout}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleLogout();
              }
            }}
            style={{ cursor: 'pointer' }}
            aria-label="Log Out"
          >
            <div className="menuItemAdmin">
              <FontAwesomeIcon icon={faRightFromBracket} className="iconAdmin" />
              <span className="menuTextAdmin">Log Out</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="adminMainContent" tabIndex={-1}>
        <section className="pending-payments-container" aria-live="polite" aria-relevant="all">
          <h2>Pending Payments</h2>

          {/* Bulk action buttons */}
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={confirmBulkApprove}
              disabled={selectedRowKeys.length === 0}
              icon={<CheckOutlined />}
              aria-disabled={selectedRowKeys.length === 0}
              aria-label="Approve selected payments"
            >
              Approve Selected
            </Button>
            <span style={{ marginLeft: 8 }}>
              {selectedRowKeys.length > 0
                ? `Selected ${selectedRowKeys.length} item(s)`
                : ''}
            </span>
          </div>

          {/* Loading state */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" tip="Loading pending payments..." />
            </div>
          ) : fetchError ? (
            // Error state
            <div
              style={{ textAlign: 'center', padding: '50px', color: 'red' }}
              role="alert"
            >
              <ExclamationCircleOutlined style={{ fontSize: '24px', color: 'red' }} />
              <p>Failed to load pending payments. Please try again later.</p>
              <Button
                onClick={fetchPendingPayments}
                type="primary"
                aria-label="Retry loading payments"
              >
                Retry
              </Button>
            </div>
          ) : payments.length === 0 ? (
            // Empty state
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <ExclamationCircleOutlined
                style={{ fontSize: '24px', color: '#faad14' }}
              />
              <p>No pending payments found.</p>
            </div>
          ) : (
            // Table with payments
            <Table
              rowKey="id"
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={payments}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
              aria-label="Pending payments table"
              bordered
              size="middle"
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default PendingPayments;
