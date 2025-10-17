import React, { useState } from 'react';

const seed = [
  { id: 1, paper: 'CS104', student: 'CB.EN.U4CSE22001', mark: 18 },
  { id: 2, paper: 'CS202', student: 'CB.EN.U4CSE22002', mark: 16 },
];

function InternalMark() {
  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem('internalMarks');
    return saved ? JSON.parse(saved) : seed;
  });

  const [form, setForm] = useState({ paper: '', student: '', mark: 0 });

  const persist = (value) => localStorage.setItem('internalMarks', JSON.stringify(value));

  const addRow = () => {
    if (!form.paper || !form.student) return;
    const next = [...rows, { id: Date.now(), ...form }];
    setRows(next);
    persist(next);
    setForm({ paper: '', student: '', mark: 0 });
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
      <h2 style={{ fontWeight: 800, marginBottom: 12 }}>Internal Marks</h2>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <input placeholder="Paper Code" value={form.paper} onChange={(e) => setForm(v => ({ ...v, paper: e.target.value }))} />
        <input placeholder="Student Roll No" value={form.student} onChange={(e) => setForm(v => ({ ...v, student: e.target.value }))} />
        <input type="number" placeholder="Mark" value={form.mark} onChange={(e) => setForm(v => ({ ...v, mark: Number(e.target.value) }))} />
        <button onClick={addRow}>Add</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Paper</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Student</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Mark</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td style={{ padding: 8 }}>{r.paper}</td>
              <td style={{ padding: 8 }}>{r.student}</td>
              <td style={{ padding: 8 }}>
                <input type="number" value={r.mark} onChange={(e) => editCell(r.id, 'mark', Number(e.target.value))} />
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

export default InternalMark;
