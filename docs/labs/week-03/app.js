const form = document.querySelector('#profile-form');
const status = document.querySelector('#form-status');
const goalCount = document.querySelector('#goal-count');

const preview = {
  displayName: document.querySelector('#preview-name'),
  learningRole: document.querySelector('#preview-role'),
  learningGoal: document.querySelector('#preview-goal'),
};

function readForm() {
  // TODO 5: คืนค่า Object จาก FormData
  return Object.fromEntries(new FormData(form).entries());
}

function renderPreview(data) {
  // TODO 6: อัปเดต preview ทั้ง 3 ค่าโดยใช้ textContent
  preview.displayName.textContent = data.displayName.trim() || 'ยังไม่ระบุชื่อ';
  preview.learningRole.textContent = data.learningRole || 'ยังไม่เลือกบทบาท';
  preview.learningGoal.textContent = data.learningGoal.trim() || 'ยังไม่มีเป้าหมายการเรียนรู้';
  
  // อัปเดตตัวนับตัวอักษรของเป้าหมายการเรียนรู้
  if (goalCount) {
    goalCount.textContent = `${data.learningGoal.length} ตัวอักษร`;
  }
}

function validate(data) {
  // TODO 7: ตรวจชื่อ >= 2, role ต้องเลือก, goal >= 10
  const errors = {};

  if (data.displayName.trim().length < 2) {
    errors.displayName = 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
  }

  if (!data.learningRole) {
    errors.learningRole = 'กรุณาเลือกบทบาทที่สนใจ';
  }

  if (data.learningGoal.trim().length < 10) {
    errors.learningGoal = 'กรุณาเขียนเป้าหมายอย่างน้อย 10 ตัวอักษร';
  }

  return errors;
}

function renderErrors(errors) {
  // TODO 8: แสดง error ใกล้ field และกำหนด aria-invalid
  for (const name of ['displayName', 'learningRole', 'learningGoal']) {
    const field = form.elements[name];
    const output = document.querySelector(`#${name}-error`);
    const message = errors[name] ?? '';

    if (output) output.textContent = message;
    if (field) field.setAttribute('aria-invalid', String(Boolean(message)));
  }
}

function renderStatus(state, message) {
  status.dataset.state = state;
  status.textContent = message;
}

// TODO 9: Read → Render (แก้ไขการดัก Event ซ้อนกันให้ถูกต้องเรียบร้อย)
form.addEventListener('input', () => {
  const data = readForm();
  renderPreview(data);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO 10: Read → Validate → Render errors/status
  const data = readForm();
  const errors = validate(data);
  renderErrors(errors);

  if (Object.keys(errors).length > 0) {
    renderStatus('invalid', 'ยังบันทึกไม่ได้ กรุณาตรวจสอบข้อมูล');
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  renderStatus('success', `พร้อมแล้ว ${data.displayName}! ข้อมูลผ่านการตรวจสอบ`);
});

form.addEventListener('reset', () => {
  queueMicrotask(() => {
    // TODO 11: reset preview, errors และ status
    renderErrors({});
    renderPreview(readForm());
    renderStatus('idle', 'พร้อมเริ่มกรอกข้อมูลใหม่');
  });
});

// เรียกทำงานครั้งแรกเมื่อโหลดหน้าเว็บเพื่อ Set สถานะเริ่มต้น
renderPreview(readForm());
renderStatus('idle', 'เริ่มพิมพ์เพื่อทดลอง Event และ Live Preview');