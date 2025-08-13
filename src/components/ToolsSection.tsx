import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  QrCode, 
  FileText, 
  Calendar, 
  Globe, 
  ArrowRight,
  Zap,
  Star
} from 'lucide-react';
import { QRGenerator } from '@/components/tools/QRGenerator';
import { InvoiceGenerator } from '@/components/tools/InvoiceGenerator';
import { SocialScheduler } from '@/components/tools/SocialScheduler';
import { WebsiteBuilder } from '@/components/tools/WebsiteBuilder';

interface ToolsSectionProps {
  selectedTool?: string;
  onSelectTool: (tool: string) => void;
}

export function ToolsSection({ selectedTool, onSelectTool }: ToolsSectionProps) {
  const { t } = useLanguage();

  const tools = [
    {
      key: 'qr',
      icon: QrCode,
      title: t('tools.qr.title'),
      subtitle: t('tools.qr.subtitle'),
      color: 'bg-blue-500',
      features: ['UPI Payment QR', 'Business Info QR', 'Print Layout'],
      popular: true
    },
    {
      key: 'invoice',
      icon: FileText,
      title: t('tools.invoice.title'),
      subtitle: t('tools.invoice.subtitle'),
      color: 'bg-green-500',
      features: ['GST Compliance', 'Auto Calculations', 'PDF Export'],
      popular: true
    },
    {
      key: 'social',
      icon: Calendar,
      title: t('tools.social.title'),
      subtitle: t('tools.social.subtitle'),
      color: 'bg-purple-500',
      features: ['Multi-platform', 'Scheduling', 'Reminders'],
      popular: false
    },
    {
      key: 'website',
      icon: Globe,
      title: t('tools.website.title'),
      subtitle: t('tools.website.subtitle'),
      color: 'bg-orange-500',
      features: ['Templates', 'Mobile Ready', 'SEO Optimized'],
      popular: false
    }
  ];

  const renderTool = () => {
    switch (selectedTool) {
      case 'qr':
        return <QRGenerator />;
      case 'invoice':
        return <InvoiceGenerator />;
      case 'social':
        return <SocialScheduler />;
      case 'website':
        return <WebsiteBuilder />;
      default:
        return null;
    }
  };

  if (selectedTool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light/10 to-success-light/10">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => onSelectTool('')}
              className="gap-2"
            >
              ← Back to Tools
            </Button>
          </div>
          {renderTool()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 to-success-light/10 p-4">
      <div className="container mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning-light text-warning text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Free Digital Tools
          </div>
          <h1 className="text-4xl font-bold mb-4">{t('tools.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('tools.subtitle')}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <Card 
              key={tool.key} 
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 shadow-lg"
              onClick={() => onSelectTool(tool.key)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl ${tool.color} flex items-center justify-center text-white`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {tool.title}
                        {tool.popular && (
                          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                            <Star className="h-3 w-3" />
                            Popular
                          </div>
                        )}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm mt-1">
                        {tool.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Key Features:</div>
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group-hover:bg-primary group-hover:text-white mt-4"
                  >
                    Launch Tool
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Success with Our Tools</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-bold text-success">₹2.5L</div>
                <p className="text-sm text-muted-foreground">
                  Additional revenue generated using QR payments in first month
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary">5hrs</div>
                <p className="text-sm text-muted-foreground">
                  Time saved weekly using automated invoicing
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-bold text-warning">300%</div>
                <p className="text-sm text-muted-foreground">
                  Increase in online visibility with website builder
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}