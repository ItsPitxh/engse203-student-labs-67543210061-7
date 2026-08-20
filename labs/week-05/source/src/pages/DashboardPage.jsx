import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import ErrorState from "../components/ErrorState.jsx";
import FilterBar from "../components/FilterBar";
import LoadingState from "../components/LoadingState.jsx";
import RequestList from "../components/RequestList";
import SummaryPanel from "../components/SummaryPanel";
import useManualReload from "../hooks/useManualReload.js";
import { deleteRequest, getRequests, resetRequests } from "../services/requestService.js";

import RequestForm from "../components/RequestForm";
// import initialRequests from "../../public/data/initialRequests.json";

function DashboardPage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const scenario = searchParam.get("scenario") ?? "";
  const [reloadKey, reload] = useManualReload();

  const [LoadState, setLoadState] = useState("idle");
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setLoadState("loading");
    setErrorMessage("");
    setNotice("");

    getRequests({ scenario })
      .then((data) => {
        setRequests(data);
        setLoadState("Success!");
      })
      .catch((error) => {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "เกิดข้อผิดพลาดไม่ทราบสาเหตุ",
        );
        setErrorState("error");
      }, [scenario, reloadKey]);
  });

  const summary = useMemo(
    () => ({
      total: requests.length,
      pending: requests.filter((request) => request.status === "pending")
        .length,
      inProgress: requests.filter((request) => request.status === "in-progress")
        .length,
      completed: requests.filter((request) => request.status === "completed")
        .length,
    }),
    [requests],
  );
  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((request) => request.status === statusFilter);

  async function handleAdd(input) {
    setRequests((current) => [
      ...current,
      { ...input, id: `REQ-W4-${Date.now()}`, status: "pending" },
    ]);
    setNotice(
      "เพิ่มคำร้องในหน่วยความจำแล้ว — กด refresh แล้วจะหาย นี่คือโจทย์ของคาบ 5B",
    );
  }

  async function handleDelete(requestId) {
    // setRequests((current) =>
    //   current.filter((request) => request.id !== requestId),
    // );
    
    const next = await deleteRequest(requestId);
    setRequests(next);
    setNotice(`ลบคำร้อง ${requestId} จาก memory แล้ว`);
  }

  async function handleReset() {
    if(!window.confirm ('คืนค่าข้อมูลตัวอย่างเริ่มต้นและลบคำร้องที่เพ่ิมไว้ทั้งหมด?')) return;
    const seedRequests = await resetRequests();
    setRequests(seedRequests);
    setStatusFilter('all');
    setNotice('คืนค่าเรียบร้อยแล้ว');

  }

  return (
    <main className="container page-content">
      <section>
        <div className="page-heading">
          <div>
            <p className="eyebrow dark">CP00 · WEEK04 REGRESSION</p>
            <h1>Campus Service Request</h1>
            <p>ตรวจ add, filter, delete และ validation ก่อน refactor</p>
          </div>
        </div>
        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}
        <SummaryPanel summary={summary} />
        <div className="">
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar
                value={statusFilter}
                onFilterChange={setStatusFilter}
              />
            </div>
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDelete}
            />
          </section>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
