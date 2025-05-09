import React from 'react';
import '../style/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="containerAdmin">
      <header className="headerAdmin">
        <div className="logoGroupAdmin">
          <h1 className="logoTextAdmin">Helping</h1>
          <p className="logoSubTextAdmin">Hand</p>
        </div>
        <h2 className="titleAdmin">DASHBOARD</h2>
      </header>

      <aside className="sidebarAdmin">
        <div className="avatarAdmin"></div>
        <div className="adminNameGroupAdmin">
          <p className="adminNameAdmin">Chin Chin Admin</p>
          <div className="notificationAdmin">
            <div className="bellIconAdmin"></div>
            <div className="badgeAdmin">
              <span className="badgeLabelAdmin">3</span>
            </div>
          </div>
        </div>
        <nav className="menuAdmin">
          <div className="menuItemAdmin active">
            <div className="iconAdmin"></div>
            <span className="menuTextAdmin">Dashboard</span>
          </div>
          <div className="menuItemAdmin">
            <div className="iconAdmin"></div>
            <span className="menuTextAdmin">User Management</span>
          </div>
          <div className="menuItemAdmin">
            <div className="iconAdmin"></div>
            <span className="menuTextAdmin">Help Center</span>
          </div>
          <div className="menuItemAdmin">
            <div className="iconAdmin"></div>
            <span className="menuTextAdmin">Log Out</span>
          </div>
        </nav>
      </aside>

      <main className="mainContentAdmin">
        <section className="cardAdmin">
          <h3 className="cardTitleAdmin">Monthly Earnings</h3>
          <div className="cardBoxAdmin"></div>
        </section>

        <section className="cardAdmin rightAdmin">
          <h3 className="cardTitleAdmin">Yearly Earnings</h3>
          <div className="cardBoxAdmin"></div>
        </section>

        <section className="salesAdmin">
          <h3 className="cardTitleAdmin">National Sales</h3>
          <div className="salesBoxAdmin"></div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;