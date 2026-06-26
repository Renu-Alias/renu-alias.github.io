import { useState } from 'react';
import API_BASE_URL from '../config';

const AUTHOR_EMAIL = 'renualiasmeleth@gmail.com';

async function sendViaFormSubmit({ name, email, message }) {
  const response = await fetch(`https://formsubmit.co/ajax/${AUTHOR_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Portfolio contact from ${name}`,
      _replyto: email,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error('Email relay rejected the transmission.');
  }
  return true;
}

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [successDetail, setSuccessDetail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMsg('All ports must be allocated (fill in all fields).');
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    setSuccessDetail('');

    const payload = { ...formData };

    try {
      const apiRes = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const apiData = await apiRes.json().catch(() => ({}));

      if (!apiRes.ok) {
        throw new Error(
          typeof apiData.detail === 'string'
            ? apiData.detail
            : 'Failed to save message on server.'
        );
      }

      let emailDelivered = apiData.email_sent === true;

      if (!emailDelivered) {
        await sendViaFormSubmit(payload);
        emailDelivered = true;
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setSuccessDetail(`Your message was delivered to ${AUTHOR_EMAIL}.`);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err.message ||
          `Could not deliver to ${AUTHOR_EMAIL}. Check your connection and try again.`
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">ssh://renu_alias@contact</h3>
          <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={onClose}>[X]</span>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>
                TRANSMISSION SUCCESSFUL
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                {successDetail}
              </p>
              <button
                type="button"
                className="btn-submit"
                style={{ marginTop: '20px' }}
                onClick={() => {
                  setStatus(null);
                  setSuccessDetail('');
                  onClose();
                }}
              >
                close_connection()
              </button>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">NAME (IDENTIFIER)</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. Guest_User"
                  disabled={status === 'sending'}
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label className="form-label">EMAIL (RETURN_ADDRESS)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. user@domain.com"
                  disabled={status === 'sending'}
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label className="form-label">MESSAGE (PAYLOAD)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  placeholder="Write message packet here..."
                  disabled={status === 'sending'}
                />
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>
                Deliver to: {AUTHOR_EMAIL}
              </p>

              {status === 'error' && (
                <div style={{ color: 'var(--accent-orange)', fontSize: '12px', marginTop: '4px' }}>
                  &gt; ERROR: {errorMsg}
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={onClose}
                  disabled={status === 'sending'}
                >
                  abort()
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'sending...' : 'send_transmission()'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
