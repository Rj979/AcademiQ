import React, { useMemo, useState } from 'react';

const seedPapers = [
  { id: 71, code: 'CS104', name: 'Data Structures', category: 'DSA', credits: 4, department: 'CSE' },
  { id: 74, code: 'CS202', name: 'DBMS', category: 'DBMS', credits: 4, department: 'CSE' },
  { id: 79, code: 'CS302', name: 'Machine Learning', category: 'ML', credits: 4, department: 'CSE' },
];

function Papers() {
  const [papers, setPapers] = useState(() => {
    const saved = localStorage.getItem('papers');
    return saved ? JSON.parse(saved) : seedPapers;
  });
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('paperNotes');
    return saved ? JSON.parse(saved) : {};
  });

  const [newPaper, setNewPaper] = useState({ code: '', name: '', category: '', credits: 3, department: 'CSE' });

  const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const addPaper = () => {
    if (!newPaper.code || !newPaper.name) return;
    const p = { id: Date.now(), ...newPaper };
    const next = [...papers, p];
    setPapers(next);
    persist('papers', next);
    setNewPaper({ code: '', name: '', category: '', credits: 3, department: 'CSE' });
  };

  const addNote = (paperId, content) => {
    const next = { ...notes, [paperId]: [...(notes[paperId] || []), { id: Date.now(), content }] };
    setNotes(next);
    persist('paperNotes', next);
  };

  return (
    <div>
      <h2 style={{ fontWeight: 800, marginBottom: 12 }}>Papers</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Add Paper</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input placeholder="Code" value={newPaper.code} onChange={(e) => setNewPaper(v => ({ ...v, code: e.target.value }))} />
            <input placeholder="Name" value={newPaper.name} onChange={(e) => setNewPaper(v => ({ ...v, name: e.target.value }))} />
            <input placeholder="Category" value={newPaper.category} onChange={(e) => setNewPaper(v => ({ ...v, category: e.target.value }))} />
            <input placeholder="Credits" type="number" value={newPaper.credits} onChange={(e) => setNewPaper(v => ({ ...v, credits: Number(e.target.value) }))} />
            <input placeholder="Department" value={newPaper.department} onChange={(e) => setNewPaper(v => ({ ...v, department: e.target.value }))} />
            <button onClick={addPaper}>Add</button>
          </div>
        </div>

        {papers.map(p => (
          <div key={p.id} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{p.code} · {p.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{p.department} · {p.category} · {p.credits} credits</div>
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Notes</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {(notes[p.id] || []).map(n => (
                  <li key={n.id}>{n.content}</li>
                ))}
              </ul>
              <AddNote onAdd={(content) => addNote(p.id, content)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddNote({ onAdd }) {
  const [value, setValue] = useState('');
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
      <input placeholder="Add a note..." value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => { if (value.trim()) { onAdd(value.trim()); setValue(''); } }}>Add Note</button>
    </div>
  );
}

export default Papers;
