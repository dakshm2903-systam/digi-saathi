import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AssessmentSection } from '@/components/AssessmentSection';
import { ToolsSection } from '@/components/ToolsSection';
import { SchemesSection } from '@/components/SchemesSection';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTool, setSelectedTool] = useState('');
  const [assessmentResults, setAssessmentResults] = useState(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedTool(''); // Reset tool selection when navigating
  };

  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    setCurrentPage('learn'); // Navigate to learning recommendations
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'assessment':
        return <AssessmentSection onComplete={handleAssessmentComplete} />;
      case 'tools':
        return (
          <ToolsSection 
            selectedTool={selectedTool} 
            onSelectTool={setSelectedTool}
          />
        );
      case 'learn':
        return (
          <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Enhance your digital skills with our curated video tutorials and learning resources.
                </p>
              </div>

              {/* Video Learning Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Video Tutorials</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Video 1 */}
                  <div className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Productivity Tools for Business</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Learn the basics leveraging productivity tools for your business
                        </p>
                        <a 
                          href="https://www.youtube.com/watch?v=rn_ADJyb_K8" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          Watch on YouTube →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Video 2 */}
                  <div className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">AI Tools for Business</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Discover various AI tools to enhance efficiency
                        </p>
                        <a 
                          href="https://www.youtube.com/watch?v=760SGirpyvQ" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          Watch on YouTube →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Video 3 */}
                  <div className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Digital Financial Solutions</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Master the fundamentals of finance management for digital business
                        </p>
                        <a 
                          href="https://www.youtube.com/watch?v=f1t9DHYqWNs" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          Watch on YouTube →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Video 4 */}
                  <div className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Scale Small Business</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Learn to achieve scale for small businesses
                        </p>
                        <a 
                          href="https://www.youtube.com/watch?v=-c_4ZZ4e5H4" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          Watch on YouTube →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Video 5 */}
                  <div className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Prerequisites of Digitization</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Leverage technology to streamline your business operations
                        </p>
                        <a 
                          href="https://www.youtube.com/watch?v=CtYnswysqhY" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          Watch on YouTube →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Playlist */}
                  <div className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 7H2v1h20V7zM13 12H2v-1h11v1zM13 16H2v-1h11v1zM15 11.5v6l5-3-5-3z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Digital Skill Development Course</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Full playlist covering all aspects of modern digital business
                        </p>
                        <a 
                          href="https://www.youtube.com/playlist?list=PLFwyro9MnMVxQlXbNyhKVIMRRG5fB93wM" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          Watch Playlist →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traditional Learning Section */}
             
            </div>
          </div>
        );
      case 'schemes':
        return <SchemesSection />;
      default:
        return <HeroSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
    </div>
  );
};

export default Index;
