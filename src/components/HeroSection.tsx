import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  ArrowRight, 
  CheckCircle, 
  Smartphone, 
  TrendingUp, 
  Users,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const { t } = useLanguage();

  const features = [
    {
      icon: CheckCircle,
      title: 'Free Assessment',
      description: 'Discover your digital readiness'
    },
    {
      icon: Zap,
      title: 'Practical Tools',
      description: 'QR codes, invoices, and more'
    },
    {
      icon: TrendingUp,
      title: 'Track Growth',
      description: 'Measure your digital ROI'
    }
  ];

  const stats = [
    { number: '7', label: 'Assessment Areas' },
    { number: '4+', label: 'Free Tools' },
    { number: '100%', label: 'Free to Use' },
  ];

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-success-light/10 to-warning-light/20" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-light text-success text-sm font-medium">
                <Smartphone className="h-4 w-4" />
                Digital India Initiative
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-gradient">{t('hero.title')}</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => onNavigate('assessment')}
                className="group"
              >
                {t('cta.start')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => onNavigate('tools')}
              >
                {t('cta.useTools')}
              </Button>
              
              <Button 
                variant="secondary" 
                size="xl"
                onClick={() => onNavigate('schemes')}
              >
                Explore Schemes
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="space-y-6">
            <Card className="p-6 gradient-card border-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Digital Assessment Preview</h3>
                      <p className="text-muted-foreground">Evaluate Your Digital Readiness</p>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed">
                    Discover your digital strengths and identify areas for improvement with our comprehensive assessment covering smartphone usage, digital payments, online presence, and more.
                  </p>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <div className="text-success font-semibold">Free Assessment</div>
                    <div className="text-primary font-semibold">Instant Results</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Cards */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-4 border-0 shadow-lg hover:shadow-xl transition-smooth">
                  <CardContent className="p-0 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}