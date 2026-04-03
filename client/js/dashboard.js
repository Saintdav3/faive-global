import { api, apiEndpoints } from './api.js';
import { requireAdminSession, logoutAdmin } from './auth.js';
import { renderDashboardLayout } from '../components/dashboard-layout.js';
import { createModalShell } from '../components/modal.js';

const configMap = {
  portfolio: {
    endpoint: apiEndpoints.portfolio,
    title: 'Portfolio Manager',
    fields: [
      { name: 'heroMediaUrl', label: 'Cover (Photo/Video URL)', type: 'text' },
      { name: 'brandName', label: 'Brand Name', type: 'text' },
      { name: 'title', label: 'Campaign Title', type: 'text' },
      { name: 'slug', label: 'Slug', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'services', label: 'Service IDs (comma separated)', type: 'text' },
      { name: 'excerpt', label: 'Short Description', type: 'textarea' },
      { name: 'campaignGoal', label: 'Objective', type: 'textarea' },
      { name: 'concept', label: 'Concept', type: 'textarea' },
      { name: 'strategy', label: 'Execution', type: 'textarea' },
      { name: 'resultsSummary', label: 'Results', type: 'textarea' },
      { name: 'deliverables', label: 'Deliverables (comma separated)', type: 'text' },
      { name: 'metrics', label: 'Metrics JSON', type: 'textarea' },
      { name: 'mediaGallery', label: 'Media Gallery JSON', type: 'textarea' },
      { name: 'featured', label: 'Featured', type: 'checkbox' }
    ],
    columns: ['brandName', 'title', 'category', 'featured']
  },
  services: {
    endpoint: apiEndpoints.services,
    title: 'Services Manager',
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'slug', label: 'Slug', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'startingAt', label: 'Starting At', type: 'text' },
      { name: 'shortDescription', label: 'Short Description', type: 'textarea' },
      { name: 'description', label: 'Full Description', type: 'textarea' },
      { name: 'deliverables', label: 'Deliverables (comma separated)', type: 'text' },
      { name: 'featured', label: 'Featured', type: 'checkbox' }
    ],
    columns: ['name', 'category', 'startingAt', 'featured']
  },
  quotes: {
    endpoint: apiEndpoints.quotes,
    title: 'Quote Requests',
    fields: [{ name: 'status', label: 'Status', type: 'text' }],
    columns: ['fullName', 'email', 'company', 'projectType', 'budgetRange', 'status']
  },
  contacts: {
    endpoint: apiEndpoints.contacts,
    title: 'Contact Messages',
    fields: [{ name: 'status', label: 'Status', type: 'text' }],
    columns: ['fullName', 'email', 'company', 'subject', 'status']
  }
};

const analyticsMarkup = (collections) => `
  <div class="analytics-grid">
    <article class="analytics-card"><span>Portfolio</span><strong>${collections.portfolio.length}</strong></article>
    <article class="analytics-card"><span>Services</span><strong>${collections.services.length}</strong></article>
    <article class="analytics-card"><span>Quotes</span><strong>${collections.quotes.length}</strong></article>
    <article class="analytics-card"><span>Contacts</span><strong>${collections.contacts.length}</strong></article>
  </div>
`;

const formatHeading = (field) =>
  field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (character) => character.toUpperCase());

const formatCell = (item, field) => {
  const value = item[field];

  if (typeof value === 'boolean') {
    return `<span class="admin-badge ${value ? 'is-positive' : 'is-muted'}">${
      value ? 'Featured' : 'Standard'
    }</span>`;
  }

  if (field === 'status') {
    const label = String(value || 'unknown').replace(/_/g, ' ');
    return `<span class="admin-badge is-status">${label}</span>`;
  }

  if (Array.isArray(value)) {
    const label = value.map((entry) => entry.name || entry).join(', ') || '-';
    return `<span class="admin-cell-text">${label}</span>`;
  }

  if (value && typeof value === 'object') {
    return `<span class="admin-cell-text">${value.name || value.label || '-'}</span>`;
  }

  if (field === 'email') {
    return `<span class="admin-cell-text admin-email">${value || '-'}</span>`;
  }

  return `<span class="admin-cell-text">${value || '-'}</span>`;
};

const serializeFieldValue = (field, value) => {
  if (value == null) return '';

  if (field.name === 'services') {
    return Array.isArray(value)
      ? value.map((entry) => entry._id || entry.name || entry).join(', ')
      : value;
  }

  if (field.name === 'metrics' || field.name === 'mediaGallery') {
    return Array.isArray(value) ? JSON.stringify(value, null, 2) : value;
  }

  if (field.name === 'deliverables') {
    return Array.isArray(value) ? value.join(', ') : value;
  }

  if (typeof value === 'object') {
    return value.name || value.title || '';
  }

  return value;
};

const buildInputMarkup = (field, value) => {
  if (field.type === 'textarea') {
    const rows = field.name === 'metrics' || field.name === 'mediaGallery' ? 6 : 4;
    return `<textarea class="form-control admin-form-control admin-form-textarea" name="${field.name}" rows="${rows}" placeholder="Enter ${field.label.toLowerCase()}">${serializeFieldValue(field, value)}</textarea>`;
  }

  if (field.type === 'checkbox') {
    return `
      <label class="admin-toggle-row">
        <span>
          <strong>${field.label}</strong>
          <small>Enable this setting for this entry.</small>
        </span>
        <input class="form-check-input" type="checkbox" role="switch" name="${field.name}" ${
          value ? 'checked' : ''
        } />
      </label>
    `;
  }

  return `<input class="form-control admin-form-control" type="${field.type}" name="${field.name}" value="${serializeFieldValue(field, value)}" placeholder="Enter ${field.label.toLowerCase()}" />`;
};

const getFieldHint = (field) => {
  const hints = {
    slug: 'Use a short unique slug, for example beauty-campaign-2026.',
    services: 'Paste one or more Service IDs separated by commas.',
    brandName: 'Add the client or brand attached to this campaign.',
    heroMediaUrl: 'Use a secure image or video URL, preferably from Cloudinary.',
    metrics: 'Use JSON format like [{"label":"Views","value":"1.2M"}].',
    mediaGallery: 'Use JSON format like [{"url":"https://...","resourceType":"image"}].',
    deliverables: 'Separate deliverables with commas.',
    websiteUrl: 'Use the full website URL including https://.',
    status: 'Use values like new, in_review, qualified, closed or resolved.'
  };

  return hints[field.name] || '';
};

const normalizePayload = (section, formData) => {
  const payload = Object.fromEntries(formData.entries());
  const config = configMap[section];

  config.fields
    .filter((field) => field.type === 'checkbox')
    .forEach((field) => {
      payload[field.name] = formData.get(field.name) === 'on';
    });

  if ((section === 'services' || section === 'portfolio') && payload.deliverables) {
    payload.deliverables = payload.deliverables
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return payload;
};

const openEntityModal = (section, item = null, onSubmit) => {
  const modalRoot = document.getElementById('dashboard-modal-root');
  const config = configMap[section];

  const body = `
    <form id="entity-form" class="admin-entry-form">
      <div class="admin-entry-intro">
        <p class="dashboard-kicker mb-2">${item ? 'Update entry' : 'Create new entry'}</p>
        <p class="admin-entry-copy">Use the fields below to manage content cleanly and consistently across the platform.</p>
      </div>
      <div class="row g-3">
        ${config.fields
          .map(
            (field) => `
              <div class="${field.type === 'textarea' ? 'col-12' : field.type === 'checkbox' ? 'col-12' : 'col-md-6'}">
                <div class="admin-form-field ${field.type === 'checkbox' ? 'is-toggle' : ''}">
                ${
                  field.type !== 'checkbox'
                    ? `<label class="admin-form-label">${field.label}</label>`
                    : ''
                }
                ${buildInputMarkup(field, item?.[field.name])}
                ${
                  getFieldHint(field)
                    ? `<p class="admin-form-hint">${getFieldHint(field)}</p>`
                    : ''
                }
                </div>
              </div>
            `
          )
          .join('')}
        <div class="col-12">
          <div class="admin-form-actions">
            <button class="btn btn-gold" type="submit">Save Entry</button>
            <button class="btn btn-outline-dark modal-close-trigger" type="button">Cancel</button>
          </div>
        </div>
        <div class="col-12"><p id="entity-form-feedback" class="form-feedback admin-form-feedback"></p></div>
      </div>
    </form>
  `;

  modalRoot.innerHTML = createModalShell(item ? `Edit ${config.title}` : `New ${config.title}`, body);

  const closeModal = () => {
    modalRoot.innerHTML = '';
  };

  modalRoot.querySelectorAll('.modal-close-trigger').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modalRoot.querySelector('#entity-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const feedback = modalRoot.querySelector('#entity-form-feedback');
    feedback.textContent = 'Saving changes...';

    try {
      const payload = normalizePayload(section, new FormData(event.currentTarget));
      await onSubmit(payload);
      closeModal();
    } catch (error) {
      feedback.textContent = error.message;
    }
  });
};

const tableMarkup = (section, data) => {
  const { title, columns } = configMap[section];

  return `
    <div class="dashboard-section-head">
      <div>
        <p class="dashboard-kicker">${title}</p>
        <h2>${title}</h2>
      </div>
      <button class="btn btn-gold ${section === 'quotes' || section === 'contacts' ? 'd-none' : ''}" data-create-entity="${section}">
        New Entry
      </button>
    </div>
    <div class="dashboard-table-card">
      <div class="dashboard-table-meta">
        <span>${data.length} record${data.length === 1 ? '' : 's'}</span>
        <span>${title}</span>
      </div>
      <div class="table-responsive dashboard-table-wrap">
        <table class="table admin-table align-middle mb-0">
          <thead>
            <tr>${columns.map((field) => `<th>${formatHeading(field)}</th>`).join('')}<th class="text-end">Actions</th></tr>
          </thead>
          <tbody>
            ${
              data.length
                ? data
                    .map(
                      (item) => `
                        <tr>
                          ${columns
                            .map((field) => `<td>${formatCell(item, field)}</td>`)
                            .join('')}
                          <td class="text-end">
                            <div class="admin-action-group">
                              <button class="btn btn-sm admin-action-btn" data-edit-entity="${section}" data-id="${item._id}">Edit</button>
                              <button class="btn btn-sm admin-action-btn is-danger" data-delete-entity="${section}" data-id="${item._id}">Delete</button>
                            </div>
                          </td>
                        </tr>
                      `
                    )
                    .join('')
                : `<tr><td colspan="${columns.length + 1}" class="admin-empty-state">No records available yet.</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
};

const loadSection = async (section) => {
  const panel = document.getElementById('dashboard-panel');

  if (section === 'overview') {
    const [portfolio, services, quotes, contacts] = await Promise.all([
      api.get(apiEndpoints.portfolio),
      api.get(apiEndpoints.services),
      api.get(apiEndpoints.quotes),
      api.get(apiEndpoints.contacts)
    ]);

    panel.innerHTML = analyticsMarkup({
      portfolio: portfolio.data,
      services: services.data,
      quotes: quotes.data,
      contacts: contacts.data
    });
    return;
  }

  const response = await api.get(configMap[section].endpoint);
  panel.innerHTML = tableMarkup(section, response.data);

  const createButton = panel.querySelector(`[data-create-entity="${section}"]`);
  if (createButton) {
    createButton.addEventListener('click', () =>
      openEntityModal(section, null, async (payload) => {
        await api.post(configMap[section].endpoint, payload);
        await loadSection(section);
      })
    );
  }

  panel.querySelectorAll(`[data-edit-entity="${section}"]`).forEach((button) => {
    button.addEventListener('click', async () => {
      const item = response.data.find((entry) => entry._id === button.dataset.id);
      openEntityModal(section, item, async (payload) => {
        await api.put(`${configMap[section].endpoint}/${button.dataset.id}`, payload);
        await loadSection(section);
      });
    });
  });

  panel.querySelectorAll(`[data-delete-entity="${section}"]`).forEach((button) => {
    button.addEventListener('click', async () => {
      const shouldDelete = window.confirm('Delete this entry? This cannot be undone.');
      if (!shouldDelete) return;

      await api.delete(`${configMap[section].endpoint}/${button.dataset.id}`);
      await loadSection(section);
    });
  });
};

export const initDashboard = async () => {
  const root = document.getElementById('dashboard-root');
  if (!root) return;

  const user = await requireAdminSession();
  if (!user) return;

  root.innerHTML = renderDashboardLayout();
  document.getElementById('dashboard-user').innerHTML = `
    <span class="dashboard-user-name">${user.name}</span>
    <span class="dashboard-user-role">${String(user.role).replace(/_/g, ' ')}</span>
  `;
  document.getElementById('dashboard-logout').addEventListener('click', logoutAdmin);

  const navLinks = [...document.querySelectorAll('.dashboard-nav-link')];
  navLinks.forEach((button) => {
    button.addEventListener('click', async () => {
      navLinks.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      document.getElementById('dashboard-panel').innerHTML =
        '<div class="loading-state">Loading section...</div>';
      await loadSection(button.dataset.section);
    });
  });

  document.getElementById('dashboard-panel').innerHTML =
    '<div class="loading-state">Loading overview...</div>';
  await loadSection('overview');
};
