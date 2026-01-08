import { useState } from 'react';
import Header from '../components/Header';
import BrainwaveGraph from '../components/BrainwaveGraph';
import RecentlyWatched from '../components/RecentlyWatched';
import MentalHealthTrend from '../components/MentalHealthTrend';
import CurrentMentalState from '../components/CurrentMentalState';
import './Dashboard.css';

function Dashboard() {

  return (
    <div className="page dashboard fade-in">
      <Header />
        
        <main className="dashboard-main stagger-children">
          <BrainwaveGraph />
          
          <div className="metrics-row">
            <MentalHealthTrend />
            <CurrentMentalState />
          </div>
          
          <RecentlyWatched />
        </main>
    </div>
  );
}

export default Dashboard;
