// Modern Interactive Script for Eslam Sameh Portfolio

// Print to PDF handling
document.getElementById('printBtn')?.addEventListener('click', () => {
  window.print();
});

// Copy to Clipboard utility
function copyToClipboard(text, message = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    console.error('Copy failed', err);
  }
  document.body.removeChild(textArea);
}

// Toast notification display
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2500);
}

// Intersection Observer for Active Nav link highlight
window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-indigo-400');
            link.classList.remove('text-slate-300');
          } else {
            link.classList.remove('text-indigo-400');
            link.classList.add('text-slate-300');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});
