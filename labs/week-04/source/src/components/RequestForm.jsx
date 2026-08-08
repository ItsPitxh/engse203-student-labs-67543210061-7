import { useState } from 'react';

const initialRequestData = {
  requesterName: '',
  requestType: '',
  location: '',
  details: '',
  priority: 'normal',
};

function validateRequest(requestData) {
  const errors = {};

  if (requestData.requesterName.trim().length < 3) {
    errors.requesterName = 'กรุณาระบุชื่อผู้แจ้งอย่างน้อย 3 ตัวอักษร';
  }

  if (!requestData.requestType) {
    errors.requestType = 'กรุณาเลือกประเภทคำร้อง';
  }

  if (requestData.location.trim().length < 3) {
    errors.location = 'กรุณาระบุสถานที่';
  }

  if (requestData.details.trim().length < 5) {
    errors.details = 'กรุณาระบุรายละเอียด';
  }

  return errors;
}

function RequestForm({ onAddRequest }) {
  const [requestData, setRequestData] = useState(initialRequestData);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setRequestData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: '',
    }));

    setFeedback('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateRequest(requestData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback('ยังเพิ่มคำร้องไม่ได้ กรุณาตรวจสอบข้อมูลที่ระบุ');
      return;
    }

    onAddRequest({
      ...requestData,
      requesterName: requestData.requesterName.trim(),
      location: requestData.location.trim(),
      details: requestData.details.trim(),
    });

    setRequestData(initialRequestData);
    setFeedback('เพิ่มคำร้องใหม่เรียบร้อยแล้ว');
  }

  return (
    <section className="panel" aria-labelledby="request-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="request-form-title">สร้างคำร้องใหม่</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
          <input
            id="requesterName"
            name="requesterName"
            value={requestData.requesterName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.requesterName)}
            aria-describedby="requesterName-error"
          />
          <small className="error" id="requesterName-error">
            {errors.requesterName}
          </small>
        </div>

        <div className="field">
          <label htmlFor="requestType">ประเภทคำร้อง</label>
          <select
            id="requestType"
            name="requestType"
            value={requestData.requestType}
            onChange={handleChange}
            aria-invalid={Boolean(errors.requestType)}
            aria-describedby="requestType-error"
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
            <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
          </select>
          <small className="error" id="requestType-error">
            {errors.requestType}
          </small>
        </div>

        <div className="field">
          <label htmlFor="location">สถานที่</label>
          <input
            id="location"
            name="location"
            value={requestData.location}
            onChange={handleChange}
            aria-invalid={Boolean(errors.location)}
            aria-describedby="location-error"
          />
          <small className="error" id="location-error">
            {errors.location}
          </small>
        </div>

        <div className="field">
          <label htmlFor="details">รายละเอียด</label>
          <textarea
            id="details"
            name="details"
            rows="4"
            value={requestData.details}
            onChange={handleChange}
            aria-invalid={Boolean(errors.details)}
            aria-describedby="details-error"
          />
          <small className="error" id="details-error">
            {errors.details}
          </small>
        </div>

        <fieldset className="field">
          <legend>ความเร่งด่วน</legend>

          <label>
            <input
              type="radio"
              name="priority"
              value="normal"
              checked={requestData.priority === 'normal'}
              onChange={handleChange}
            />
            ปกติ
          </label>

          <label>
            <input
              type="radio"
              name="priority"
              value="urgent"
              checked={requestData.priority === 'urgent'}
              onChange={handleChange}
            />
            เร่งด่วน
          </label>
        </fieldset>

        <button type="submit">เพิ่มคำร้อง</button>

        <p className="status" role="status">
          {feedback}
        </p>
      </form>
    </section>
  );
}

export default RequestForm;