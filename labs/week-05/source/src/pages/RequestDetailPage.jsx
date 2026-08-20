import { useEffect, useState } from "react";
import { Link, UNSAFE_ErrorResponseImpl, useParams } from "react-router-dom";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import useManualReload from "../hooks/useManualReload";
import { getRequestById } from "../services/requestService";

function RequestDetailPage() {
  const { requestId } = useParams();
  const [reloadKey, reload] = useManualReload();

  const [loadState, setLoadState] = useState("loading");
  const [request, setRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoadState("loading");
    setErrorMessage("");

    getRequestById(requestId)
      .then((result) => {
        setRequest(result);
        setLoadState("success");
      })
      .catch((error) => {
        setErrorMessage(
          error instanceof Error ? error.message : "โหลดรายละเอียดไม่สำเร็จ",
        );
        setLoadState("error");
      });
  }, [requestId, reloadKey]);

  return (
    <section data-testid="page-request-detail">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">ROUTED DYNAMIC DETAIL</p>
          <h1>รายละเอียดคำร้อง</h1>
          <p>
            อ่านรหัสจาก URL <code>{requestId}</code>
          </p>
        </div>
      </div>
      {loadState === "loading" && (
        <LoadingState message="กำลังโหลดรายละเอียด " />
      )}
      {loadState === "error" && <LoadingState message={errorMessage} />}
      {loadState === "success" && !request && (
        <section className="state-card">
          <h2>ไม่พบคำร้องรหัส {requestId}</h2>
          <p>คำร้องนี้อาจถูกลบไปแล้ว หรือพิมพ์รหัสไม่ถูกต้อง</p>
          <Link className="button primary inline" to="/">
            กลับไปดูรายการทั้งหมด
          </Link>
        </section>
      )}
      {loadState === 'success' && request && (
        <article className="panel detail-card">
          <h2>{request.requestType}</h2>
          <dl>
            <div><dt>รหัสคำร้อง</dt><dd>{request.id}</dd></div>
            <div><dt>ผู้แจ้ง</dt><dd>{request.requestName}</dd></div>
            <div><dt>สถานที่</dt><dd>{request.location}</dd></div>
            <div><dt>รายละเอียด</dt><dd>{request.details}</dd></div>
            <div><dt>ความเร่งด่วน</dt><dd>{request.priority === 'urgent' ? 'เร่งด่วน' : 'ปกติ'}</dd></div>
            <div><dt>สถานะ</dt><dd><span className={`badge ${request.status}`}>{request.status}</span></dd></div>

          </dl>
          <Link className="button primary inline" to='/'>กลับ Dashboard</Link>
        </article>
      )}
    </section>
  );
}

export default RequestDetailPage;
