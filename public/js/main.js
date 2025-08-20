// main.js
// Apply animations when elements enter the viewport
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.fade-in-left, .fade-in-right');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  elements.forEach(el => observer.observe(el));

  // Smooth scroll to forms based on ID
  window.scrollToForm = function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle the unified inquiry form
  const mainForm = document.getElementById('main-form');
  if (mainForm) {
    mainForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Determine endpoint based on selected type
      const typeField = mainForm.querySelector('[name="type"]');
      let endpoint;
      switch (typeField.value) {
        case 'test':
          endpoint = '/api/test';
          break;
        case 'collaboration':
          endpoint = '/api/collaboration';
          break;
        case 'preorder':
          endpoint = '/api/purchase';
          break;
        default:
          endpoint = '/api/test';
      }
      const formData = new FormData(mainForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      const statusEl = mainForm.querySelector('.form-status');
      statusEl.textContent = 'Отправка...';
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
          statusEl.textContent = 'Спасибо! Мы свяжемся с вами.';
          mainForm.reset();
        } else {
          statusEl.textContent = 'Ошибка при отправке. Попробуйте позже.';
        }
      } catch (err) {
        console.error(err);
        statusEl.textContent = 'Ошибка при отправке. Попробуйте позже.';
      }
    });
  }

  // Update footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});