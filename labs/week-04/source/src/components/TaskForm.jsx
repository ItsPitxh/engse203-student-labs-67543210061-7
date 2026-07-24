import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'normal',
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.title.trim().length < 3) {
      newErrors.title = 'ชื่องานต้องมีอย่างน้อย 3 ตัวอักษร';
    }
    if (!formData.category) {
      newErrors.category = 'กรุณาเลือกหมวดหมู่';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage('');
      return;
    }

    onAddTask({
      id: `TASK-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      priority: formData.priority,
      status: 'todo',
    });

    setFormData({ title: '', category: '', priority: 'normal' });
    setErrors({});
    setStatusMessage('เพิ่มรายการสำเร็จ');
  };

  return (
    <section className="panel">
      <h2>เพิ่ม Task ใหม่</h2>
      {statusMessage && (
        <p role="status" style={{ color: '#16a34a', fontSize: '0.9rem', fontWeight: 600 }}>
          {statusMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="task-title">ชื่องาน *</label>
          <input
            id="task-title"
            name="title"
            type="text"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="task-category">หมวดหมู่ *</label>
          <select
            id="task-category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            <option value="reading">Reading</option>
            <option value="coding">Coding</option>
            <option value="review">Review</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="task-priority">ความสำคัญ</label>
          <select
            id="task-priority"
            name="priority"
            className="form-control"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          เพิ่ม Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;