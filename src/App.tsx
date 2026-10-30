import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { StatementBand } from './components/sections/StatementBand';
import { StatsRow } from './components/sections/StatsRow';
import { ServicesGrid } from './components/sections/ServicesGrid';
import { Philosophy } from './components/sections/Philosophy';
import { ProjectsGallery } from './components/sections/ProjectsGallery';
import { Timeline } from './components/sections/Timeline';
import { QuoteBand } from './components/sections/QuoteBand';
import { TeamGrid } from './components/sections/TeamGrid';
import { Marquee } from './components/sections/Marquee';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  return (
    <div className="site-wrapper">
      {/* Fixed Anchor Navigation */}
      <Navbar />

      {/* Main Content Landmarks */}
      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Oversized Statement Band */}
        <StatementBand />

        {/* Section 3: Stats Row */}
        <StatsRow />

        {/* Section 4: Services 9-Card Grid */}
        <ServicesGrid />

        {/* Section 5: Philosophy Inverted Blueprint Section */}
        <Philosophy />

        {/* Section 6: Projects Portfolio Horizontal Gallery */}
        <ProjectsGallery />

        {/* Section 7: Founder & 7-Milestone Vertical Timeline */}
        <Timeline />

        {/* Section 8: Pull Quote Band */}
        <QuoteBand />

        {/* Section 9: Studio Team Showcase */}
        <TeamGrid />

        {/* Section 10: Infinite Scrolling Marquee Strip */}
        <Marquee />
      </main>

      {/* Section 11: Comprehensive Studio Footer */}
      <Footer />
    </div>
  );
};

export default App;
