import "./OpenIPLApp.css";

const navigation = ["Overview", "Groups", "Members", "Payments", "Messages", "Subscription"];

export default function OpenIPLApp() {
  return (
    <div className="portal-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="Open IPL home">
          <span className="brand-mark">O</span>
          <span><strong>Open IPL</strong><small>GROUP PORTAL</small></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav aria-label="Main navigation">
          {navigation.map((item, index) => (
            <a className={`nav-item${index === 0 ? " active" : ""}`} href={index === 0 ? "#overview" : "#coming-soon"} key={item} aria-current={index === 0 ? "page" : undefined}>
              <span className="nav-dot" aria-hidden="true" />{item}{index > 0 && <span className="soon-tag">Soon</span>}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom"><span className="avatar">GL</span><span><strong>Group Leader</strong><small>Open IPL account</small></span></div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div><p className="breadcrumb">Open IPL <span>/</span> Overview</p><h1>Group leader portal</h1></div>
          <span className="release-pill">VERSION 1.0 FOUNDATION</span>
        </header>

        <section className="hero-card" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">YOUR GROUP, WELL ORGANIZED</span>
            <h2 id="hero-title">Bring your group together.</h2>
            <p>Manage membership, monthly dues, announcements, and feedback in one place.</p>
            <a className="primary-button" href="#application">Start group application <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-core">IPL</div><span className="art-chip chip-one">Members</span><span className="art-chip chip-two">Dues</span><span className="art-chip chip-three">Updates</span></div>
        </section>

        <section className="section-heading"><div><span className="eyebrow">OVERVIEW</span><h2>Your workspace</h2></div><span className="empty-count">No group connected</span></section>
        <section className="empty-card" aria-labelledby="empty-title">
          <div className="empty-icon" aria-hidden="true">＋</div>
          <h3 id="empty-title">Your group workspace will appear here</h3>
          <p>Apply to create a group. Once it’s approved, you’ll receive a unique Group ID and can invite members.</p>
          <a className="secondary-button" href="#application">See the first setup step</a>
        </section>

        <section className="next-step" id="application">
          <div className="step-number">01</div>
          <div><span className="eyebrow">NEXT IN THE BUILD</span><h3>Group registration</h3><p>The v1.0 foundation is in place. The application form, document upload, and approval workflow are the next implementation slice.</p></div>
          <span className="status-tag">In progress</span>
        </section>
        <footer>Open IPL · Group management, built with privacy in mind.</footer>
      </main>
    </div>
  );
}
