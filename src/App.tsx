import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { StatementBand } from './components/sections/StatementBand';
import { DesignProcess } from './components/sections/DesignProcess';
import { ServicesGrid } from './components/sections/ServicesGrid';
import { Philosophy } from './components/sections/Philosophy';
import { ProjectsGallery } from './components/sections/ProjectsGallery';
import { Timeline } from './components/sections/Timeline';
import { QuoteBand } from './components/sections/QuoteBand';
import { AwardsSection } from './components/sections/AwardsSection';
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

        {/* Section 3: Interactive Design Process & Methodology */}
        <DesignProcess />

        {/* Section 4: Specialized Services Grid (7 Core Services) */}
        <ServicesGrid />

        {/* Section 5: Interior Space Planning & Philosophy */}
        <Philosophy />

        {/* Section 6: Projects Portfolio Horizontal Gallery */}
        <ProjectsGallery />

        {/* Section 7: Founder & 7-Milestone Vertical Timeline */}
        <Timeline />

        {/* Section 8: Pull Quote Band */}
        <QuoteBand />

        {/* Section 9: Awards, Honors & Independent Practice Advantage */}
        <AwardsSection />

        {/* Section 10: Infinite Scrolling Marquee Strip */}
        <Marquee />
      </main>

      {/* Section 11: Comprehensive Studio Footer */}
      <Footer />
    </div>
  );
};

export default App;
