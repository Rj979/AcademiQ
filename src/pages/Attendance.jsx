import React, { useState } from 'react';

const seed = [
  { id: 1, date: '2025-01-15', paper: 'CS104', present: 42, total: 50 },
  { id: 2, date: '2025-01-16', paper: 'CS202', present: 38, total: 50 },
  { id: 3, date: '2025-01-17', paper: 'CS302', present: 45, total: 50 },
  { id: 4, date: '2025-01-18', paper: 'CS303', present: 40, total: 50 },
  { id: 5, date: '2025-01-19', paper: 'CS304', present: 35, total: 50 },
  { id: 6, date: '2025-01-20', paper: 'EC100', present: 48, total: 50 },
  { id: 7, date: '2025-01-21', paper: 'EC101', present: 44, total: 50 },
  { id: 8, date: '2025-01-22', paper: 'ME100', present: 39, total: 50 },
  { id: 9, date: '2025-01-23', paper: 'ME101', present: 41, total: 50 },
  { id: 10, date: '2025-01-24', paper: 'CS104', present: 43, total: 50 },
];

function Attendance() {
  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem('attendance');
    return saved ? JSON.parse(saved) : seed;
  });
  const [form, setForm] = useState({ date: '', paper: '', present: 0, total: 0 });

  const persist = (value) => localStorage.setItem('attendance', JSON.stringify(value));

  const addRow = () => {
    if (!form.date || !form.paper) return;
    const next = [...rows, { id: Date.now(), ...form }];
    setRows(next);
    persist(next);
    setForm({ date: '', paper: '', present: 0, total: 0 });
  };

  const editCell = (id, key, value) => {
    const next = rows.map(r => r.id === id ? { ...r, [key]: value } : r);
    setRows(next);
    persist(next);
  };

  const remove = (id) => {
    const next = rows.filter(r => r.id !== id);
    setRows(next);
    persist(next);
  };

  return (
    <div>
      <h2 style={{ fontWeight: 800, marginBottom: 12 }}>Attendance</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <input type="date" value={form.date} onChange={(e) => setForm(v => ({ ...v, date: e.target.value }))} />
        <input placeholder="Paper Code" value={form.paper} onChange={(e) => setForm(v => ({ ...v, paper: e.target.value }))} />
        <input type="number" placeholder="Present" value={form.present} onChange={(e) => setForm(v => ({ ...v, present: Number(e.target.value) }))} />
        <input type="number" placeholder="Total" value={form.total} onChange={(e) => setForm(v => ({ ...v, total: Number(e.target.value) }))} />
        <button onClick={addRow}>Add</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Date</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Paper</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Present</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Total</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td style={{ padding: 8 }}>{r.date}</td>
              <td style={{ padding: 8 }}>{r.paper}</td>
              <td style={{ padding: 8 }}>
                <input type="number" value={r.present} onChange={(e) => editCell(r.id, 'present', Number(e.target.value))} />
              </td>
              <td style={{ padding: 8 }}>
                <input type="number" value={r.total} onChange={(e) => editCell(r.id, 'total', Number(e.target.value))} />
              </td>
              <td style={{ padding: 8 }}>
                <button onClick={() => remove(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
