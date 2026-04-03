export const createModalShell = (title, body) => `
  <div class="app-modal is-open" id="entityModal" aria-hidden="false">
    <div class="app-modal-dialog">
      <div class="app-modal-content">
        <div class="app-modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close modal-close-trigger" aria-label="Close"></button>
        </div>
        <div class="app-modal-body">${body}</div>
      </div>
    </div>
  </div>
`;
