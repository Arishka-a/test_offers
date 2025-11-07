// TableActions.jsx
export default function TableActions({ onAdd, onEdit, onDelete, canEdit, canDelete, deleteLabel }) {
  return (
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
      <button onClick={onAdd} style={{ padding: '10px 16px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Добавить
      </button>
      <button
        onClick={onEdit}
        disabled={!canEdit}
        style={{ padding: '10px 16px', background: canEdit ? '#43a047' : '#ccc', color: 'white', border: 'none', borderRadius: '4px', cursor: canEdit ? 'pointer' : 'not-allowed' }}
      >
        Редактировать
      </button>
      <button
        onClick={onDelete}
        style={{ padding: '10px 16px', background: (canDelete || deleteLabel?.includes('(')) ? '#e53935' : '#ccc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        {deleteLabel || 'Удалить'}
      </button>
    </div>
  );
}