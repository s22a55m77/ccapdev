import './index.css';

export default function RegisterPage() {
  return (
    <section className="register-section">
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2 className="register-h2">Register</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
              <input type="text" id="username" placeholder=" " required />
              <label htmlFor="username">Username</label>
            </div>
            <div className="inputbox">
              <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
              <input
                type="email"
                id="email"
                placeholder=" "
                required
                aria-label="Email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                id="password1"
                placeholder=" "
                required
              />
              <label htmlFor="password1">Password</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                id="password2"
                placeholder=" "
                required
              />
              <label htmlFor="password2">Repeat Password</label>
            </div>
            <button className="register-button">Register</button>
          </form>
        </div>
      </div>
    </section>
  );
}
