import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Search, 
  ExternalLink, 
  Users, 
  Building, 
  Zap, 
  TrendingUp, 
  DollarSign,
  MapPin,
  Target,
  FileText,
  Award,
  Briefcase
} from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  summary: string;
  categories: string[];
  url: string;
  eligibility?: string;
  benefits?: string;
  amount?: string;
  icon?: any;
}

export function SchemesSection() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const schemes: Scheme[] = [
    {
      id: "cgtmse",
      name: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
      summary: "Enables collateral-free credit by providing lender guarantees for eligible micro & small enterprises up to ₹2 crores.",
      categories: ["finance", "credit"],
      url: "https://www.nimsme.gov.in/about-scheme/credit-guarantee-fund-trust-for-micro-and-small-enterprises-cgtmse-",
      eligibility: "Micro and Small Enterprises as per MSMED Act 2006",
      benefits: "Collateral-free loans, Reduced documentation, Quick processing",
      amount: "Up to ₹2 crores",
      icon: DollarSign
    },
    {
      id: "pmegp",
      name: "Prime Minister's Employment Generation Programme (PMEGP)",
      summary: "Credit-linked subsidy to set up new micro-enterprises and generate employment opportunities.",
      categories: ["employment", "finance"],
      url: "https://www.nimsme.gov.in/about-scheme/prime-minister-employment-generation-programme-pmegp",
      eligibility: "18+ years, 8th pass for projects above ₹10 lakhs",
      benefits: "15-35% subsidy, Self-employment opportunities",
      amount: "₹25 lakhs (manufacturing), ₹10 lakhs (service)",
      icon: Briefcase
    },
    {
      id: "aspire",
      name: "A Scheme for Promotion of Innovation, Rural Industries and Entrepreneurship (ASPIRE)",
      summary: "Supports rural innovation, micro-entrepreneurship, and incubation to generate employment at grassroots level.",
      categories: ["innovation", "rural", "entrepreneurship"],
      url: "https://www.nimsme.gov.in/about-scheme/a-scheme-for-promotion-of-innovation-rural-industries-and-entrepreneurship-aspire-",
      eligibility: "Rural entrepreneurs, Innovators, Start-ups",
      benefits: "Incubation support, Funding assistance, Mentorship",
      amount: "Up to ₹50 lakhs per project",
      icon: Zap
    },
    {
      id: "ramp",
      name: "Raising and Accelerating MSME Performance (RAMP)",
      summary: "World Bank-assisted program to improve access to market and credit for MSMEs with focus on greening and digitalization.",
      categories: ["performance", "digital", "green"],
      url: "https://www.nimsme.gov.in/about-scheme/raising-and-accelerating-msme-performance-ramp-",
      eligibility: "Registered MSMEs",
      benefits: "Market linkage, Technology upgradation, Digital transformation",
      amount: "₹6,062.45 crores (total program)",
      icon: TrendingUp
    },
    {
      id: "msecdp",
      name: "Micro & Small Enterprises Cluster Development Programme (MSE-CDP)",
      summary: "Enhances productivity and competitiveness of MSMEs through cluster-based development approach.",
      categories: ["cluster", "development"],
      url: "https://www.nimsme.gov.in/about-scheme/micro-small-enterprises-cluster-development-programme-mse-cdp-scheme",
      eligibility: "MSME clusters with minimum 50 units",
      benefits: "Infrastructure development, Skill development, Technology upgradation",
      amount: "Up to ₹10 crores per cluster",
      icon: Building
    },
    {
      id: "esdp",
      name: "Entrepreneurship & Skill Development Programme (ESDP)",
      summary: "Training initiatives to enable aspiring entrepreneurs to launch and run MSMEs successfully.",
      categories: ["training", "entrepreneurship", "skill-development"],
      url: "https://www.nimsme.gov.in/about-scheme/entrepreneurship-and-skill-development-programme-esdp-scheme",
      eligibility: "Aspiring entrepreneurs, Existing MSME owners",
      benefits: "Free training, Certification, Mentorship support",
      amount: "Free training programs",
      icon: Users
    },
    {
      id: "champions",
      name: "MSME Champions Scheme",
      summary: "Creating MSME Champions who will handhold and nurture other MSMEs for better growth and performance.",
      categories: ["mentorship", "growth"],
      url: "https://www.nimsme.gov.in/about-scheme/msme-champions-scheme",
      eligibility: "High-performing MSMEs",
      benefits: "Mentorship opportunities, Network access, Recognition",
      amount: "Support-based scheme",
      icon: Award
    },
    {
      id: "international",
      name: "International Cooperation (IC) Scheme",
      summary: "Facilitates international linkages for technology transfer, market access and international collaboration for MSMEs.",
      categories: ["international", "export"],
      url: "https://www.nimsme.gov.in/about-scheme/international-cooperation-ic-scheme",
      eligibility: "Export-oriented MSMEs",
      benefits: "International market access, Technology transfer, Export promotion",
      amount: "Project-based funding",
      icon: ExternalLink
    },
    {
      id: "sfurti",
      name: "Scheme of Fund for Regeneration of Traditional Industries (SFURTI)",
      summary: "Organizes traditional industries and artisans into clusters to improve their competitiveness and provide sustainable employment.",
      categories: ["traditional", "artisan", "cluster"],
      url: "https://www.nimsme.gov.in/about-scheme/scheme-of-fund-for-regeneration-of-traditional-industries-sfurti-",
      eligibility: "Traditional industry clusters, Artisan groups",
      benefits: "Skill development, Market linkage, Infrastructure support",
      amount: "Up to ₹8 crores per cluster",
      icon: Target
    }
  ];

  const categories = [
    { id: 'all', label: t('schemes.filter.all') },
    { id: 'finance', label: 'Finance & Credit' },
    { id: 'employment', label: 'Employment' },
    { id: 'innovation', label: 'Innovation' },
    { id: 'training', label: 'Training & Skills' },
    { id: 'export', label: 'Export & International' },
    { id: 'cluster', label: 'Cluster Development' },
    { id: 'traditional', label: 'Traditional Industries' }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           scheme.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      finance: 'bg-green-100 text-green-800',
      employment: 'bg-blue-100 text-blue-800',
      innovation: 'bg-purple-100 text-purple-800',
      training: 'bg-orange-100 text-orange-800',
      export: 'bg-indigo-100 text-indigo-800',
      cluster: 'bg-pink-100 text-pink-800',
      traditional: 'bg-yellow-100 text-yellow-800',
      rural: 'bg-emerald-100 text-emerald-800',
      entrepreneurship: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-success/5 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gradient">{t('schemes.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('schemes.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-xs"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => {
              const IconComponent = scheme.icon || FileText;
              return (
                <Card key={scheme.id} className="group hover:shadow-xl transition-all duration-300 border-0 gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {scheme.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {scheme.summary}
                    </p>

                    {scheme.amount && (
                      <div className="mb-4">
                        <div className="text-lg font-bold text-success">
                          {scheme.amount}
                        </div>
                      </div>
                    )}

                    {scheme.eligibility && (
                      <div className="mb-3">
                        <div className="text-xs font-medium text-muted-foreground mb-1">
                          {t('schemes.eligibility')}:
                        </div>
                        <div className="text-sm">{scheme.eligibility}</div>
                      </div>
                    )}

                    {scheme.benefits && (
                      <div className="mb-4">
                        <div className="text-xs font-medium text-muted-foreground mb-1">
                          {t('schemes.benefits')}:
                        </div>
                        <div className="text-sm">{scheme.benefits}</div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mb-4">
                      {scheme.categories.slice(0, 3).map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className={`text-xs ${getCategoryColor(category)}`}
                        >
                          {category.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      onClick={() => window.open(scheme.url, '_blank')}
                    >
                      Learn More
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg">
                No schemes found matching your criteria.
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="p-8 gradient-card border-0">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help Finding the Right Scheme?</h3>
              <p className="text-muted-foreground mb-6">
                Our experts can help you identify the best government schemes for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="default"
                  onClick={() => window.open('https://www.nimsme.gov.in/msme-schemes', '_blank')}
                >
                  Visit NIMSME Portal
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline">
                  Contact Support
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}