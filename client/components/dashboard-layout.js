export const renderDashboardLayout = () => `
  <aside class="dashboard-sidebar">
    <div>
      <a class="brand-mark d-inline-block mb-4" href="/index.html">Faive Global</a>
      <nav class="dashboard-nav">
        <button data-section="overview" class="dashboard-nav-link is-active">Overview</button>
        <button data-section="portfolio" class="dashboard-nav-link">Portfolio</button>
        <button data-section="services" class="dashboard-nav-link">Services</button>
        <button data-section="quotes" class="dashboard-nav-link">Quotes</button>
        <button data-section="contacts" class="dashboard-nav-link">Contacts</button>
      </nav>
    </div>
    <button id="dashboard-logout" class="btn btn-outline-light">Logout</button>
  </aside>
  <section class="dashboard-content">
    <div class="dashboard-topbar">
      <div>
        <p class="dashboard-kicker">Administration</p>
        <h1>Platform Dashboard</h1>
      </div>
      <div id="dashboard-user" class="dashboard-user"></div>
    </div>
    <div id="dashboard-panel"></div>
    <div id="dashboard-modal-root"></div>
  </section>
`;
