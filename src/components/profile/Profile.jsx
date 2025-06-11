import React, { useState, useEffect } from 'react';
import { useAfetch } from '../../hooks/useAfetch';
import profileLogo from '../../assets/dist/assets/img/city_slot_logo.jpg';

const Profile = () => {
  const [tab, setTab] = useState('activity');
  const [profile, setProfile] = useState(null);
  const { request } = useAfetch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await request('/dashboard/user', {
          method: 'GET',
        });
        setProfile(response.data);
      } catch (error) {
        // Optionally handle error
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card card-primary card-outline">
          <div className="card-body box-profile text-center">
            <div className="mb-3">
              <img className="profile-user-img img-fluid img-circle" src={profileLogo} alt="User profile" style={{width: '100px'}} />
            </div>
            <h3 className="profile-username text-center">{profile ? profile.name : 'Jane Doe'}</h3>
            {profile && (
              <p className="text-center mb-1">
                <span className="badge bg-success">Balance: ${profile.balance}</span>
              </p>
            )}
            <p className="text-muted text-center">Lead Developer</p>
            <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <b>Followers</b> <span className="badge bg-primary">1,322</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <b>Friends</b> <span className="badge bg-success">543</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <b>Projects</b> <span className="badge bg-info">12</span>
              </li>
            </ul>
            <a href="#" className="btn btn-primary btn-block w-100"><b>Follow</b></a>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">About Me</h3>
          </div>
          <div className="card-body">
            <strong><i className="bi bi-book me-1"></i> Education</strong>
            <p className="text-muted">B.S. in Computer Science from MIT</p>
            <hr />
            <strong><i className="bi bi-geo-alt me-1"></i> Location</strong>
            <p className="text-muted">San Francisco, CA</p>
            <hr />
            <strong><i className="bi bi-pencil me-1"></i> Skills</strong>
            <p className="text-muted">
              <span className="badge bg-danger me-1">UI Design</span>
              <span className="badge bg-success me-1">Coding</span>
              <span className="badge bg-info me-1">Javascript</span>
              <span className="badge bg-warning text-dark">React</span>
            </p>
            <hr />
            <strong><i className="bi bi-file-earmark-text me-1"></i> Notes</strong>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card">
          <div className="card-header p-2">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button className={`nav-link${tab === 'activity' ? ' active' : ''}`} onClick={() => setTab('activity')}>Activity</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link${tab === 'timeline' ? ' active' : ''}`} onClick={() => setTab('timeline')}>Timeline</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link${tab === 'settings' ? ' active' : ''}`} onClick={() => setTab('settings')}>Settings</button>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {tab === 'activity' && (
              <div>
                <div className="post">
                  <div className="user-block d-flex align-items-center mb-2">
                    <img className="img-circle img-bordered-sm me-2" src={profileLogo} alt="user" style={{width: '40px'}} />
                    <span>
                      <strong>{profile ? profile.name : 'Jane Doe'}</strong> posted a new update<br />
                      <span className="description">2 hours ago</span>
                    </span>
                  </div>
                  <p>Just finished the new dashboard design! 🚀</p>
                </div>
                <div className="post">
                  <div className="user-block d-flex align-items-center mb-2">
                    <img className="img-circle img-bordered-sm me-2" src="/src/assets/dist/img/user3-128x128.jpg" alt="user" style={{width: '40px'}} />
                    <span>
                      <strong>John Smith</strong> commented<br />
                      <span className="description">1 hour ago</span>
                    </span>
                  </div>
                  <p>Great work, Jane! 👏</p>
                </div>
              </div>
            )}
            {tab === 'timeline' && (
              <ul className="timeline">
                <li>
                  <i className="bi bi-envelope timeline-icon bg-primary"></i>
                  <div className="timeline-item">
                    <span className="time"><i className="bi bi-clock"></i> 12:05</span>
                    <h5 className="timeline-header">Support Team sent you an email</h5>
                    <div className="timeline-body">Check your inbox for the latest updates.</div>
                  </div>
                </li>
                <li>
                  <i className="bi bi-person timeline-icon bg-success"></i>
                  <div className="timeline-item">
                    <span className="time"><i className="bi bi-clock"></i> 5 mins ago</span>
                    <h5 className="timeline-header">You joined a new project</h5>
                    <div className="timeline-body">Welcome to the new team!</div>
                  </div>
                </li>
                <li>
                  <i className="bi bi-check-circle timeline-icon bg-warning"></i>
                  <div className="timeline-item">
                    <span className="time"><i className="bi bi-clock"></i> 2 days ago</span>
                    <h5 className="timeline-header">Task Completed</h5>
                    <div className="timeline-body">You finished the dashboard redesign.</div>
                  </div>
                </li>
              </ul>
            )}
            {tab === 'settings' && (
              <>
                <form className="form-horizontal">
                  <div className="mb-3 row">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="inputName" placeholder="Name" defaultValue={profile ? profile.name : 'Jane Doe'} />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" id="inputEmail" placeholder="Email" defaultValue={profile ? profile.email : 'jane@example.com'} />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Experience</label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control"
                        id="inputExperience"
                        placeholder="Experience"
                        defaultValue="Lead developer at Company X"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="offset-sm-2 col-sm-10">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                        <label className="form-check-label" htmlFor="exampleCheck2">I agree to the <a href="#">terms and conditions</a></label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="offset-sm-2 col-sm-10">
                      <button type="submit" className="btn btn-danger">Submit</button>
                    </div>
                  </div>
                </form>
                {/* Password Change Form */}
                <PasswordChangeForm />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

function PasswordChangeForm() {
  const { request } = useAfetch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      setLoading(false);
      return;
    }
    try {
      const response = await request('/dashboard/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      });
      setSuccess(response.message || 'Password has been changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-horizontal mt-4" onSubmit={handleSubmit} autoComplete="off">
      <h5>Change Password</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="mb-3 row">
        <label htmlFor="currentPassword" className="col-sm-3 col-form-label">Current Password</label>
        <div className="col-sm-9">
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="newPassword" className="col-sm-3 col-form-label">New Password</label>
        <div className="col-sm-9">
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">Confirm Password</label>
        <div className="col-sm-9">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="offset-sm-3 col-sm-9">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </div>
    </form>
  );
} 