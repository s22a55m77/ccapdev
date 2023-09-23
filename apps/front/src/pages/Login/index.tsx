import './index.css';

export default function LoginPage() {
  return (
    <section className="login-section">
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2 className="login-h2">Login</h2>
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
                id="password"
                placeholder=" "
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" />
                Remember Me
                <a href="#">Forget Password</a>
              </label>
            </div>
            <button className="login-button">Log in</button>
            <div className="register">
              <p>
                Don't have an account? <a href="register">Register Now!</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
