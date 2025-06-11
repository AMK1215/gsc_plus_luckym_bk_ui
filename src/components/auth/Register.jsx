import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => (
  <div className="login-page bg-body-secondary" style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div className="login-box">
      <div className="login-logo mb-3 text-center">
        <Link to="/" className="h1 text-decoration-none"><b>Admin</b>LTE</Link>
      </div>
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Register a new membership</p>
          <form>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Full name" />
              <div className="input-group-text"><span className="bi bi-person"></span></div>
            </div>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email" />
              <div className="input-group-text"><span className="bi bi-envelope"></span></div>
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control" placeholder="Password" />
              <div className="input-group-text"><span className="bi bi-lock-fill"></span></div>
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control" placeholder="Retype password" />
              <div className="input-group-text"><span className="bi bi-lock-fill"></span></div>
            </div>
            <div className="row mb-3">
              <div className="col-8 d-flex align-items-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="agreeTerms" />
                  <label className="form-check-label" htmlFor="agreeTerms"> I agree to the <a href="#">terms</a> </label>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </div>
            </div>
          </form>
          <div className="social-auth-links text-center mb-3 d-grid gap-2">
            <p>- OR -</p>
            <button className="btn btn-primary mb-1"><i className="bi bi-facebook me-2"></i> Sign up using Facebook</button>
            <button className="btn btn-danger"><i className="bi bi-google me-2"></i> Sign up using Google+</button>
          </div>
          <p className="mb-0">
            <Link to="/login" className="text-center">I already have a membership</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Register; 