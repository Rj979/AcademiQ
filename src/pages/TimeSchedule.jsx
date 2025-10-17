import React, { useState } from 'react';

const seed = [
  { id: 1, day: 'Monday', slot: '09:00-10:00', paper: 'CS104' },
  { id: 2, day: 'Monday', slot: '10:00-11:00', paper: 'CS202' },
  { id: 3, day: 'Tuesday', slot: '09:00-10:00', paper: 'CS302' },
];

function TimeSchedule() {
  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem('timeSchedule');
    return saved ? JSON.parse(saved) : seed;
  });

  const [form, setForm] = useState({ day: '', slot: '', paper: '' });

  const persist = (value) => localStorage.setItem('timeSchedule', JSON.stringify(value));

  const addRow = () => {
    if (!form.day || !form.slot || !form.paper) return;
    const next = [...rows, { id: Date.now(), ...form }];
    setRows(next);
    persist(next);
    setForm({ day: '', slot: '', paper: '' });
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
      <h2 style={{ fontWeight: 800, marginBottom: 12 }}>Time Schedule</h2>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <input placeholder="Day" value={form.day} onChange={(e) => setForm(v => ({ ...v, day: e.target.value }))} />
        <input placeholder="Slot (e.g., 09:00-10:00)" value={form.slot} onChange={(e) => setForm(v => ({ ...v, slot: e.target.value }))} />
        <input placeholder="Paper Code" value={form.paper} onChange={(e) => setForm(v => ({ ...v, paper: e.target.value }))} />
        <button onClick={addRow}>Add</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Day</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Slot</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Paper</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td style={{ padding: 8 }}>{r.day}</td>
              <td style={{ padding: 8 }}>{r.slot}</td>
              <td style={{ padding: 8 }}>{r.paper}</td>
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

export default TimeSchedule;
