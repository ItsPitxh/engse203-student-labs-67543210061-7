import { Link } from "react-router-dom";

function RequestCard({ request, onDeleteRequest, onAcknowledge }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3>
          <Link to={`/requests/${request.id}`}>{request.requestType}</Link>
        </h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        {/* TODO B4: แทน <span> สถานะดิบด้านล่างด้วย <StatusBadge status={request.status} /> ที่คุณสร้าง */}
        <p>
          <span className={`badge ${request.status}`}>{request.status}</span> ·{" "}
          {request.priority}
        </p>
      </div>
      <div className="request-card-actions">
        {/* TODO B3: เพิ่มปุ่ม "รับเรื่อง" ที่แสดงเฉพาะการ์ดสถานะ pending (เรียก onAcknowledge) */}
        {request.status === 'pending' && (
          <button
            type="button"
            className="button primary"
            data-testid={`acknowledge-${request.id}`}
            onClick={() => onAcknowledge(request.id)}
          >
            รับเรื่อง
          </button>
        )}
        <button
          className="button danger"
          type="button"
          onClick={() => onDeleteRequest(request.id)}
          aria-label={`ลบคำร้อง ${request.id}`}
        >
          ลบ
        </button>
      </div>
    </article>
  );
}

export default RequestCard;
