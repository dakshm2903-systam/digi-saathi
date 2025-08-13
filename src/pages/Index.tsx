import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AssessmentSection } from '@/components/AssessmentSection';
import { ToolsSection } from '@/components/ToolsSection';
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
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-2xl">
              <h1 className="text-3xl font-bold mb-4">Learning Recommendations</h1>
              <p className="text-muted-foreground mb-8">
                Based on your assessment, we've created a personalized learning plan.
              </p>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg text-left">
                  <h3 className="font-semibold">📱 WhatsApp Business Setup</h3>
                  <p className="text-sm text-muted-foreground">Learn to use WhatsApp for customer communication</p>
                </div>
                <div className="p-4 border rounded-lg text-left">
                  <h3 className="font-semibold">💳 UPI Payment Setup</h3>
                  <p className="text-sm text-muted-foreground">Accept digital payments easily</p>
                </div>
                <div className="p-4 border rounded-lg text-left">
                  <h3 className="font-semibold">📊 Digital Marketing Basics</h3>
                  <p className="text-sm text-muted-foreground">Reach more customers online</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'schemes':
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-2xl">
              <h1 className="text-3xl font-bold mb-4">{t('schemes.title')}</h1>
              <p className="text-muted-foreground">{t('schemes.subtitle')}</p>
              <div className="grid gap-4 mt-8">
                <div className="p-6 border rounded-lg text-left">
                  <h3 className="font-semibold">CGTMSE Scheme</h3>
                  <p className="text-sm text-muted-foreground">Collateral-free loans up to ₹2 crores</p>
                </div>
                <div className="p-6 border rounded-lg text-left">
                  <h3 className="font-semibold">PM SVANidhi</h3>
                  <p className="text-sm text-muted-foreground">Special loans for street vendors</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-2xl">
              <h1 className="text-3xl font-bold mb-4">{t('analytics.title')}</h1>
              <p className="text-muted-foreground">{t('analytics.subtitle')}</p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-success">₹15,000</div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
                <div className="p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-primary">5</div>
                  <p className="text-sm text-muted-foreground">Tools Used</p>
                </div>
                <div className="p-6 border rounded-lg">
                  <div className="text-3xl font-bold text-warning">200%</div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                </div>
              </div>
            </div>
          </div>
        );
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
