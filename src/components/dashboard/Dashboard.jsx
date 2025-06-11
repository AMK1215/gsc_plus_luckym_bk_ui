import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import userlogo from '../../assets/dist/assets/img/user7-128x128.jpg';
import userlogo2 from '../../assets/dist/assets/img/user1-128x128.jpg';
import userlogo3 from '../../assets/dist/assets/img/user3-128x128.jpg';


const Dashboard = () => {
  useEffect(() => {
    // Sales Chart
    const salesChartOptions = {
      series: [
        {
          name: 'Digital Goods',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
        {
          name: 'Electronics',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
      chart: {
        height: 300,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      colors: ['#0d6efd', '#20c997'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2023-01-01',
          '2023-02-01',
          '2023-03-01',
          '2023-04-01',
          '2023-05-01',
          '2023-06-01',
          '2023-07-01',
        ],
      },
      tooltip: {
        x: {
          format: 'MMMM yyyy',
        },
      },
    };

    const salesChart = new ApexCharts(
      document.querySelector('#revenue-chart'),
      salesChartOptions
    );
    salesChart.render();

    return () => {
      salesChart.destroy();
    };
  }, []);

  return (
    <div className="row g-3">
      {/* Info Boxes */}
      <div className="col-md-3 col-sm-6">
        <div className="info-box bg-primary text-white mb-3">
          <span className="info-box-icon"><i className="bi bi-people"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">Users</span>
            <span className="info-box-number">1,245</span>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-6">
        <div className="info-box bg-success text-white mb-3">
          <span className="info-box-icon"><i className="bi bi-bag"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">Sales</span>
            <span className="info-box-number">$9,300</span>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-6">
        <div className="info-box bg-warning text-dark mb-3">
          <span className="info-box-icon"><i className="bi bi-bar-chart"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">Visits</span>
            <span className="info-box-number">23,000</span>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-6">
        <div className="info-box bg-danger text-white mb-3">
          <span className="info-box-icon"><i className="bi bi-exclamation-triangle"></i></span>
          <div className="info-box-content">
            <span className="info-box-text">Errors</span>
            <span className="info-box-number">12</span>
          </div>
        </div>
      </div>

      {/* Small Boxes */}
      <div className="col-lg-3 col-6">
        <div className="small-box text-bg-primary">
          <div className="inner">
            <h3>150</h3>
            <p>New Orders</p>
          </div>
          <i className="bi bi-cart small-box-icon"></i>
          <a href="#" className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
            More info <i className="bi bi-link-45deg"></i>
          </a>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="small-box text-bg-success">
          <div className="inner">
            <h3>53<sup className="fs-5">%</sup></h3>
            <p>Bounce Rate</p>
          </div>
          <i className="bi bi-bar-chart-line small-box-icon"></i>
          <a href="#" className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
            More info <i className="bi bi-link-45deg"></i>
          </a>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="small-box text-bg-warning">
          <div className="inner">
            <h3>44</h3>
            <p>User Registrations</p>
          </div>
          <i className="bi bi-person-plus small-box-icon"></i>
          <a href="#" className="small-box-footer link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
            More info <i className="bi bi-link-45deg"></i>
          </a>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="small-box text-bg-danger">
          <div className="inner">
            <h3>65</h3>
            <p>Unique Visitors</p>
          </div>
          <i className="bi bi-people small-box-icon"></i>
          <a href="#" className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
            More info <i className="bi bi-link-45deg"></i>
          </a>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="card-title">Sales Value</h3>
          </div>
          <div className="card-body">
            <div id="revenue-chart"></div>
          </div>
        </div>
      </div>

      {/* User Card */}
      <div className="col-lg-4">
        <div className="card card-widget widget-user mb-4">
          <div className="widget-user-header bg-info text-white">
            <h3 className="widget-user-username">Jane Doe</h3>
            <h5 className="widget-user-desc">Lead Developer</h5>
          </div>
          <div className="widget-user-image" style={{marginTop: '-40px'}}>
            <img className="img-circle elevation-2" src={userlogo} alt="User Avatar" style={{width: '80px', borderRadius: '50%'}} />
          </div>
          <div className="card-footer">
            <div className="row text-center">
              <div className="col-4">
                <b>Followers</b>
                <br />
                1,322
              </div>
              <div className="col-4">
                <b>Projects</b>
                <br />
                12
              </div>
              <div className="col-4">
                <b>Friends</b>
                <br />
                35
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Chat */}
      <div className="col-lg-6">
        <div className="card direct-chat direct-chat-primary mb-4">
          <div className="card-header">
            <h3 className="card-title">Direct Chat</h3>
          </div>
          <div className="card-body">
            <div className="direct-chat-messages" style={{maxHeight: '200px', overflowY: 'auto'}}>
              <div className="direct-chat-msg">
                <div className="direct-chat-infos clearfix">
                  <span className="direct-chat-name float-start">Jane Doe</span>
                  <span className="direct-chat-timestamp float-end">23 Jan 2:00 pm</span>
                </div>
                <img className="direct-chat-img" src={userlogo2} alt="user" />
                <div className="direct-chat-text">Hi! How are you?</div>
              </div>
              <div className="direct-chat-msg end">
                <div className="direct-chat-infos clearfix">
                  <span className="direct-chat-name float-end">John Smith</span>
                  <span className="direct-chat-timestamp float-start">23 Jan 2:05 pm</span>
                </div>
                <img className="direct-chat-img" src={userlogo3} alt="user" />
                <div className="direct-chat-text">I'm good, thanks!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="col-lg-6">
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
          </div>
          <div className="card-body">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 