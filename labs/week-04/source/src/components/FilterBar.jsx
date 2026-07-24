function FilterBar({ statusFilter, onFilterChange }) {
  return (
    <div className="panel" style={{ padding: '0.75rem 1.25rem', marginBottom: '1rem' }}>
      <label htmlFor="status-filter" style={{ marginRight: '0.5rem', fontWeight: 600 }}>
        กรองตามสถานะ:
      </label>
      <select
        id="status-filter"
        className="form-control"
        style={{ width: 'auto', display: 'inline-block' }}
        value={statusFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">ทั้งหมด</option>
        <option value="todo">ยังไม่เริ่ม (Todo)</option>
        <option value="doing">กำลังทำ (Doing)</option>
        <option value="done">เสร็จแล้ว (Done)</option>
      </select>
    </div>
  );
}

export default FilterBar;