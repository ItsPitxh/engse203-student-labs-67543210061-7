function SummaryPanel({ summary }) {
  return (
    <section className="panel">
      <h2>สรุปสถานะงาน</h2>
      <div className="summary-cards">
        <div className="stat-card">
          <div className="stat-number">{summary.total}</div>
          <div>ทั้งหมด</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{summary.todo}</div>
          <div>ยังไม่เริ่ม (Todo)</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{summary.doing}</div>
          <div>กำลังทำ (Doing)</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{summary.done}</div>
          <div>เสร็จแล้ว (Done)</div>
        </div>
      </div>
    </section>
  );
}

export default SummaryPanel;