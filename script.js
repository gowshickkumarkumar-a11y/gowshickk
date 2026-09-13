// Set this to your deployed backend's URL, e.g. "https://your-backend.vercel.app"
const API_BASE_URL = 'http://localhost:3000';

const form = document.getElementById('submission-form');
const statusEl = document.getElementById('status');
const submitBtn = document.getElementById('submit-btn');
const fileInput = document.getElementById('file');
const fileDropText = document.getElementById('file-drop-text');

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    fileDropText.textContent = fileInput.files[0].name;
  } else {
    fileDropText.textContent = 'Choose a file or drop it here — PDF or Word, up to 10 MB';
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = '';
  statusEl.className = 'status';

  const file = fileInput.files[0];
  if (file && file.size > 10 * 1024 * 1024) {
    statusEl.textContent = 'That file is over 10 MB. Please choose a smaller file.';
    statusEl.className = 'status error';
    return;
  }

  const formData = new FormData(form);

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch(`${API_BASE_URL}/api/submit`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong. Please try again.');
    }

    statusEl.textContent = 'Thanks — your abstract has been submitted successfully.';
    statusEl.className = 'status success';
    form.reset();
    fileDropText.textContent = 'Choose a file or drop it here — PDF or Word, up to 10 MB';
  } catch (err) {
    statusEl.textContent = err.message || 'Something went wrong. Please try again.';
    statusEl.className = 'status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit abstract';
  }
});
