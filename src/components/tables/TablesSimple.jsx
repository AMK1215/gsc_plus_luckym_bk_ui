import React, { useState, useMemo } from 'react';

const initialData = [
  { name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61, start: '2011/04/25', salary: 320800 },
  { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63, start: '2011/07/25', salary: 170750 },
  { name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', age: 66, start: '2009/01/12', salary: 86000 },
  { name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', age: 22, start: '2012/03/29', salary: 433060 },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },
  { key: 'office', label: 'Office' },
  { key: 'age', label: 'Age' },
  { key: 'start', label: 'Start date' },
  { key: 'salary', label: 'Salary', format: v => `$${v.toLocaleString()}` },
];

function downloadCSV(rows) {
  const header = columns.map(col => col.label).join(',');
  const csv = [header, ...rows.map(row => columns.map(col => row[col.key]).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'table.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const TablesSimple = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState({}); // {rowIdx, colKey}
  const [editValue, setEditValue] = useState('');
  const [selected, setSelected] = useState([]); // array of row indices
  const pageSize = 2;

  // Filter and sort data
  const filtered = useMemo(() => {
    let d = data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    d = d.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });
    return d;
  }, [search, sortKey, sortAsc, data]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Row selection
  const toggleSelectAll = () => {
    if (selected.length === paged.length) setSelected([]);
    else setSelected(paged.map((_, idx) => (page - 1) * pageSize + idx));
  };
  const toggleSelectRow = (idx) => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };

  // Inline editing
  const startEdit = (rowIdx, colKey) => {
    setEditing({ rowIdx, colKey });
    setEditValue(data[rowIdx][colKey]);
  };
  const saveEdit = (rowIdx, colKey) => {
    setData(d => d.map((row, i) => i === rowIdx ? { ...row, [colKey]: colKey === 'salary' || colKey === 'age' ? Number(editValue) : editValue } : row));
    setEditing({});
    setEditValue('');
  };
  const cancelEdit = () => {
    setEditing({});
    setEditValue('');
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header d-flex flex-wrap align-items-center">
            <h3 className="card-title mb-0">Modern Table</h3>
            <div className="ms-auto d-flex gap-2 align-items-center">
              <input
                className="form-control w-auto"
                style={{ minWidth: 200 }}
                placeholder="Search…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
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
                        checked={selected.length === paged.length && paged.length > 0}
                        onChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </th>
                    {columns.map(col => (
                      <th
                        key={col.key}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (sortKey === col.key) setSortAsc(a => !a);
                          else { setSortKey(col.key); setSortAsc(true); }
                        }}
                      >
                        {col.label}
                        {sortKey === col.key && (sortAsc ? ' ▲' : ' ▼')}
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.length === 0 && (
                    <tr>
                      <td colSpan={columns.length + 2} className="text-center text-muted">No data found</td>
                    </tr>
                  )}
                  {paged.map((row, idx) => {
                    const globalIdx = (page - 1) * pageSize + idx;
                    return (
                      <tr key={globalIdx} className={selected.includes(globalIdx) ? 'table-active' : ''}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selected.includes(globalIdx)}
                            onChange={() => toggleSelectRow(globalIdx)}
                            aria-label="Select row"
                          />
                        </td>
                        {columns.map(col => (
                          <td key={col.key} onDoubleClick={() => startEdit(globalIdx, col.key)} style={{ cursor: 'pointer' }}>
                            {editing.rowIdx === globalIdx && editing.colKey === col.key ? (
                              <>
                                <input
                                  type={col.key === 'age' || col.key === 'salary' ? 'number' : 'text'}
                                  className="form-control form-control-sm d-inline w-auto"
                                  value={editValue}
                                  onChange={e => setEditValue(e.target.value)}
                                  onBlur={() => saveEdit(globalIdx, col.key)}
                                  onKeyDown={e => {
                                    if (e.key === 'Enter') saveEdit(globalIdx, col.key);
                                    if (e.key === 'Escape') cancelEdit();
                                  }}
                                  autoFocus
                                />
                                <button className="btn btn-sm btn-success ms-1" onClick={() => saveEdit(globalIdx, col.key)} title="Save"><i className="bi bi-check"></i></button>
                                <button className="btn btn-sm btn-secondary ms-1" onClick={cancelEdit} title="Cancel"><i className="bi bi-x"></i></button>
                              </>
                            ) : (
                              col.format ? col.format(row[col.key]) : row[col.key]
                            )}
                          </td>
                        ))}
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">View</button>
                          <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <span>
              Page {page} of {totalPages}
            </span>
            <div>
              <button className="btn btn-sm btn-secondary me-1" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
              <button className="btn btn-sm btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesSimple; 