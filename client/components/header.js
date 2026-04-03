export const renderHeader = () => `
  <header class="site-header">
    <div class="container">
      <nav class="navbar navbar-expand-lg py-4">
        <a class="navbar-brand brand-mark" href="/index.html">Faive Global</a>
        <button
          class="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#siteNav"
          aria-controls="siteNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="siteNav">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/pages/services.html">Services</a></li>
            <li class="nav-item"><a class="nav-link" href="/pages/portfolio.html">Portfolio</a></li>
            <li class="nav-item"><a class="nav-link" href="/pages/about.html">About</a></li>
            <li class="nav-item"><a class="nav-link" href="/pages/contact.html">Contact</a></li>
            <li class="nav-item"><a class="btn btn-gold btn-sm px-4" href="/pages/quote.html">Request a Quote</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
`;
