// src/api/payments.js
import axios from 'axios';

const getPendingPayments = () => axios.get('/api/pending-payments');
const approvePayment = (id) => axios.post(`/api/approve-payment/${id}`);
const rejectPayment = (id) => axios.post(`/api/reject-payment/${id}`);
const bulkApprovePayments = (ids) => axios.post('/api/bulk-approve-payments', { ids });

export default {
  getPendingPayments,
  approvePayment,
  rejectPayment,
  bulkApprovePayments,
};
