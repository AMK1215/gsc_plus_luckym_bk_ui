import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useAfetch } from '../../hooks/useAfetch';

const columns = [
  { key: 'user_name', label: 'Username' },
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
//   { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status', format: v => v === 1 ? 'Active' : 'Inactive' },
  { key: 'payment_type', label: 'Payment Type', format: v => v?.name || '-' },
  { key: 'referral_code', label: 'Referral Code' },
  { key: 'commission', label: 'Commission', format: v => `${v}%` },
  { key: 'created_at', label: 'Created At', format: v => new Date(v).toLocaleDateString() },
];

function downloadCSV(rows) {
  const header = columns.map(col => col.label).join(',');
  const csv = [header, ...rows.map(row => columns.map(col => {
    const value = row[col.key];
    return col.format ? col.format(value) : value;
  }).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'agents.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const CreateAgentModal = ({ show, onClose, onSuccess }) => {
  const { request, loading, error } = useAfetch();
  const [form, setForm] = useState({
    user_name: '',
    name: '',
    phone: '',
    password: 'gscplus',
    payment_type_id: '',
    account_name: '',
    account_number: '',
    referral_code: '',
    line_id: '',
    commission: '',
  });
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [genLoading, setGenLoading] = useState({ username: false, referral: false });
  const modalRef = useRef();

  // Fetch payment types on open
  useEffect(() => {
    if (show) {
      (async () => {
        try {
          const res = await request('/dashboard/agent/payment-types', { method: 'GET' });
          if (res.status === 'success') setPaymentTypes(res.data);
        } catch {}
      })();
    }
  }, [show]);

  // Close modal on outside click
  useEffect(() => {
    function handleClick(e) {
      if (show && modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [show, onClose]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleGenerateUsername = async () => {
    setGenLoading(l => ({ ...l, username: true }));
    try {
      const res = await request('/dashboard/agent/generate-username', { method: 'GET' });
      if (res.status === 'success') setForm(f => ({ ...f, user_name: res.data.random_string }));
    } catch {}
    setGenLoading(l => ({ ...l, username: false }));
  };

  const handleGenerateReferral = async () => {
    setGenLoading(l => ({ ...l, referral: true }));
    try {
      const res = await request('/dashboard/agent/generate-referral-code', { method: 'GET' });
      if (res.status === 'success') setForm(f => ({ ...f, referral_code: res.data.referral_code }));
    } catch {}
    setGenLoading(l => ({ ...l, referral: false }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    setSuccess(false);
    // Basic validation
    if (!form.user_name || !form.name || !form.phone || !form.payment_type_id || !form.account_name || !form.account_number || !form.referral_code || !form.commission) {
      setFormError('Please fill in all required fields.');
      return;
    }
    try {
      const res = await request('/dashboard/agent/agent-create', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.status === 'success') {
        setSuccess(true);
        onSuccess();
        onClose();
      } else {
        setFormError(res.message || 'Failed to create agent.');
      }
    } catch (err) {
      setFormError(err.message || 'Failed to create agent.');
    }
  };

  if (!show) return null;
  return (
    <div className="modal show fade d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog">
        <div className="modal-content" ref={modalRef}>
          <div className="modal-header">
            <h5 className="modal-title">Create Agent</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="modal-body">
              {formError && <div className="alert alert-danger">{formError}</div>}
              {success && <div className="alert alert-success">Agent created successfully!</div>}
              <div className="mb-3 d-flex align-items-center gap-2">
                <div style={{ flex: 1 }}>
                  <label className="form-label">Username *</label>
                  <input name="user_name" className="form-control" value={form.user_name} onChange={handleChange} required />
                </div>
                <button type="button" className="btn btn-outline-secondary btn-sm mt-4" onClick={handleGenerateUsername} disabled={genLoading.username}>
                  {genLoading.username ? 'Generating...' : 'Generate'}
                </button>
              </div>
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone *</label>
                <input name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password *</label>
                <input name="password" className="form-control" value={form.password} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Payment Type *</label>
                <select name="payment_type_id" className="form-select" value={form.payment_type_id} onChange={handleChange} required>
                  <option value="">Select Payment Type</option>
                  {paymentTypes.map(pt => (
                    <option key={pt.id} value={pt.id}>{pt.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Account Name *</label>
                <input name="account_name" className="form-control" value={form.account_name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Account Number *</label>
                <input name="account_number" className="form-control" value={form.account_number} onChange={handleChange} required />
              </div>
              <div className="mb-3 d-flex align-items-center gap-2">
                <div style={{ flex: 1 }}>
                  <label className="form-label">Referral Code *</label>
                  <input name="referral_code" className="form-control" value={form.referral_code} onChange={handleChange} required />
                </div>
                <button type="button" className="btn btn-outline-secondary btn-sm mt-4" onClick={handleGenerateReferral} disabled={genLoading.referral}>
                  {genLoading.referral ? 'Generating...' : 'Generate'}
                </button>
              </div>
              <div className="mb-3">
                <label className="form-label">Line ID</label>
                <input name="line_id" className="form-control" value={form.line_id} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Commission (%) *</label>
                <input name="commission" className="form-control" value={form.commission} onChange={handleChange} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const statusOptions = [
  { value: '', label: 'All' },
  { value: '1', label: 'Active' },
  { value: '0', label: 'Inactive' },
];

const GetAllAgent = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('user_name');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [perPage, setPerPage] = useState(10);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const { request, loading, error } = useAfetch();

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line
  }, [page, sortBy, sortDirection, perPage]);

  const fetchAgents = async () => {
    try {
      const params = {
        page,
        per_page: perPage,
        sort_by: sortBy,
        sort_direction: sortDirection,
      };
      if (filterSearch) params.search = filterSearch;
      if (filterStatus !== '') params.status = filterStatus;
      if (filterStartDate && filterEndDate) {
        params.start_date = filterStartDate;
        params.end_date = filterEndDate;
      }
      const response = await request('/dashboard/agent/get-agent-list', {
        method: 'GET',
        params,
      });
      if (response.status === 'success') {
        setData(response.data.agents);
        setTotalPages(response.data.pagination.last_page);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  // Filter data
  const filtered = useMemo(() => {
    return data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  // Row selection
  const toggleSelectAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((_, idx) => idx));
  };
  
  const toggleSelectRow = (idx) => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };

  // Sorting handler
  const handleSort = (colKey) => {
    if (sortBy === colKey) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(colKey);
      setSortDirection('asc');
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilterSearch('');
    setFilterStatus('');
    setFilterStartDate('');
    setFilterEndDate('');
    setSortBy('created_at');
    setSortDirection('desc');
    setPage(1);
    setPerPage(10);
    setTimeout(fetchAgents, 0); // fetch after reset
  };

  // Filter button handler
  const handleFilter = () => {
    setPage(1);
    fetchAgents();
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header d-flex flex-wrap align-items-center gap-2">
            <h3 className="card-title mb-0">Agents List</h3>
            <div className="ms-auto d-flex gap-2 align-items-center flex-wrap">
              <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)}>
                <i className="bi bi-plus-lg me-1"></i> Create Agent
              </button>
              <input
                className="form-control w-auto"
                style={{ minWidth: 160 }}
                placeholder="Search..."
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
              />
              <select
                className="form-select form-select-sm w-auto"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <input
                type="date"
                className="form-control form-control-sm w-auto"
                value={filterStartDate}
                onChange={e => setFilterStartDate(e.target.value)}
                max={filterEndDate || undefined}
              />
              <span>-</span>
              <input
                type="date"
                className="form-control form-control-sm w-auto"
                value={filterEndDate}
                onChange={e => setFilterEndDate(e.target.value)}
                min={filterStartDate || undefined}
              />
              <button className="btn btn-info btn-sm" style={{color: 'white'}} onClick={handleFilter}>
                <i className="bi bi-funnel me-1"></i> Filter
              </button>
              <button className="btn btn-outline-secondary btn-sm" onClick={resetFilters}>Reset</button>
              <button className="btn btn-outline-success btn-sm" onClick={() => downloadCSV(filtered)}>
                Export CSV
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light sticky-top">
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selected.length === filtered.length && filtered.length > 0}
                        onChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </th>
                    {columns.map(col => (
                      <th
                        key={col.key}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        {sortBy === col.key && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={columns.length + 2} className="text-center">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={columns.length + 2} className="text-center text-danger">
                        {error}
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length + 2} className="text-center text-muted">No data found</td>
                    </tr>
                  ) : (
                    filtered.map((row, idx) => (
                      <tr key={row.id} className={selected.includes(idx) ? 'table-active' : ''}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selected.includes(idx)}
                            onChange={() => toggleSelectRow(idx)}
                            aria-label="Select row"
                          />
                        </td>
                        {columns.map(col => (
                          <td key={col.key}>
                            {col.format ? col.format(row[col.key]) : row[col.key] || '-'}
                          </td>
                        ))}
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">View</button>
                          <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <span>
              Page {page} of {totalPages}
            </span>
            <div>
              <button 
                className="btn btn-sm btn-secondary me-1" 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)}
              >
                Prev
              </button>
              <button 
                className="btn btn-sm btn-secondary" 
                disabled={page === totalPages} 
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <CreateAgentModal show={showCreate} onClose={() => setShowCreate(false)} onSuccess={fetchAgents} />
    </div>
  );
};

export default GetAllAgent; 