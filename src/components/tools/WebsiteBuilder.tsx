import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Globe, 
  Download, 
  Eye, 
  Smartphone, 
  Store, 
  Wrench, 
  Building,
  Plus,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WebsiteData {
  template: 'shop' | 'service' | 'manufacturer';
  businessName: string;
  tagline: string;
  about: string;
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  logo?: File;
  heroImage?: File;
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    image?: File;
  }>;
  services: Array<{
    id: string;
    name: string;
    description: string;
    features: string[];
  }>;
}

export function WebsiteBuilder() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [websiteData, setWebsiteData] = useState<WebsiteData>({
    template: 'shop',
    businessName: '',
    tagline: '',
    about: '',
    phone: '',
    email: '',
    address: '',
    whatsappNumber: '',
    products: [],
    services: []
  });

  const [previewMode, setPreviewMode] = useState(false);

  const templates = [
    {
      id: 'shop',
      name: 'Online Shop',
      description: 'Perfect for retail businesses',
      icon: Store,
      features: ['Product catalog', 'Price display', 'WhatsApp ordering']
    },
    {
      id: 'service',
      name: 'Service Business',
      description: 'Ideal for service providers',
      icon: Wrench,
      features: ['Service listings', 'Contact forms', 'Testimonials']
    },
    {
      id: 'manufacturer',
      name: 'Manufacturer',
      description: 'For manufacturing businesses',
      icon: Building,
      features: ['Product showcase', 'Capabilities', 'B2B focused']
    }
  ];

  const addProduct = () => {
    const newProduct = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: ''
    };
    setWebsiteData(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const removeProduct = (id: string) => {
    setWebsiteData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const updateProduct = (id: string, field: string, value: string) => {
    setWebsiteData(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      name: '',
      description: '',
      features: []
    };
    setWebsiteData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const removeService = (id: string) => {
    setWebsiteData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const updateService = (id: string, field: string, value: string) => {
    setWebsiteData(prev => ({
      ...prev,
      services: prev.services.map(s => 
        s.id === id ? { ...s, [field]: value } : s
      )
    }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setWebsiteData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const generateWebsite = () => {
    if (!websiteData.businessName.trim()) {
      toast({
        title: "Business Name Required",
        description: "Please enter your business name",
        variant: "destructive"
      });
      return;
    }

    // Generate HTML/CSS/JS files
    const htmlContent = generateHTML();
    const cssContent = generateCSS();
    
    // Create a zip file (simplified for demo)
    toast({
      title: "Website Generated!",
      description: "Your website files are ready to download"
    });
    
    // In a real implementation, you would create a zip file with the generated files
    downloadWebsite(htmlContent, cssContent);
  };

  const generateHTML = () => {
    const whatsappLink = websiteData.whatsappNumber 
      ? `https://wa.me/${websiteData.whatsappNumber.replace(/\D/g, '')}`
      : '#';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.businessName}</title>
    <meta name="description" content="${websiteData.tagline}">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="container">
                <h1>${websiteData.businessName}</h1>
                <div class="nav-links">
                    <a href="#about">About</a>
                    <a href="#${websiteData.template === 'shop' ? 'products' : 'services'}">${websiteData.template === 'shop' ? 'Products' : 'Services'}</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <h2>${websiteData.businessName}</h2>
                <p>${websiteData.tagline}</p>
                <a href="${whatsappLink}" class="cta-button">Contact on WhatsApp</a>
            </div>
        </section>

        <section id="about" class="about">
            <div class="container">
                <h2>About Us</h2>
                <p>${websiteData.about}</p>
            </div>
        </section>

        ${websiteData.template === 'shop' ? generateProductsSection() : generateServicesSection()}

        <section id="contact" class="contact">
            <div class="container">
                <h2>Contact Us</h2>
                <div class="contact-info">
                    <p>📞 ${websiteData.phone}</p>
                    <p>📧 ${websiteData.email}</p>
                    <p>📍 ${websiteData.address}</p>
                </div>
                <a href="${whatsappLink}" class="whatsapp-button">Chat on WhatsApp</a>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2024 ${websiteData.businessName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
  };

  const generateProductsSection = () => {
    return `
        <section id="products" class="products">
            <div class="container">
                <h2>Our Products</h2>
                <div class="product-grid">
                    ${websiteData.products.map(product => `
                        <div class="product-card">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div class="price">₹${product.price}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;
  };

  const generateServicesSection = () => {
    return `
        <section id="services" class="services">
            <div class="container">
                <h2>Our Services</h2>
                <div class="service-grid">
                    ${websiteData.services.map(service => `
                        <div class="service-card">
                            <h3>${service.name}</h3>
                            <p>${service.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;
  };

  const generateCSS = () => {
    return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    background: #2563eb;
    color: white;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
}

nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
}

.hero {
    background: linear-gradient(135deg, #2563eb, #16a34a);
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
}

.cta-button, .whatsapp-button {
    display: inline-block;
    background: #25d366;
    color: white;
    padding: 1rem 2rem;
    text-decoration: none;
    border-radius: 50px;
    font-weight: bold;
    margin: 1rem;
}

.about, .products, .services, .contact {
    padding: 4rem 0;
}

.about {
    background: #f9fafb;
}

.product-grid, .service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.product-card, .service-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2563eb;
    margin-top: 1rem;
}

.contact {
    background: #f9fafb;
    text-align: center;
}

.contact-info {
    margin: 2rem 0;
}

footer {
    background: #1f2937;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    .hero h2 {
        font-size: 2rem;
    }
    
    .nav-links {
        display: none;
    }
    
    .product-grid, .service-grid {
        grid-template-columns: 1fr;
    }
}`;
  };

  const downloadWebsite = (html: string, css: string) => {
    // Create and download HTML file
    const htmlBlob = new Blob([html], { type: 'text/html' });
    const htmlUrl = URL.createObjectURL(htmlBlob);
    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = 'index.html';
    htmlLink.click();

    // Create and download CSS file
    setTimeout(() => {
      const cssBlob = new Blob([css], { type: 'text/css' });
      const cssUrl = URL.createObjectURL(cssBlob);
      const cssLink = document.createElement('a');
      cssLink.href = cssUrl;
      cssLink.download = 'styles.css';
      cssLink.click();
    }, 500);
  };

  if (previewMode) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Website Preview</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPreviewMode(false)}>
              ← Edit
            </Button>
            <Button onClick={generateWebsite} variant="hero" className="gap-2">
              <Download className="h-4 w-4" />
              Download Website
            </Button>
          </div>
        </div>
        
        <Card className="p-0 overflow-hidden">
          <div className="bg-gray-100 p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-muted-foreground">
                {websiteData.businessName.toLowerCase().replace(/\s+/g, '')}.com
              </div>
            </div>
          </div>
          <div 
            className="h-96 overflow-auto bg-white"
            dangerouslySetInnerHTML={{ __html: generateHTML() }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('tools.website.title')}</h1>
        <p className="text-muted-foreground">{t('tools.website.subtitle')}</p>
      </div>

      <Tabs defaultValue="template" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="template">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      websiteData.template === template.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setWebsiteData(prev => ({ 
                      ...prev, 
                      template: template.id as any 
                    }))}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <template.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {template.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-muted text-xs rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={websiteData.businessName}
                  onChange={(e) => setWebsiteData(prev => ({ 
                    ...prev, 
                    businessName: e.target.value 
                  }))}
                  placeholder="Your Business Name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={websiteData.tagline}
                  onChange={(e) => setWebsiteData(prev => ({ 
                    ...prev, 
                    tagline: e.target.value 
                  }))}
                  placeholder="Short description of your business"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="about">About Your Business</Label>
                <Textarea
                  id="about"
                  value={websiteData.about}
                  onChange={(e) => setWebsiteData(prev => ({ 
                    ...prev, 
                    about: e.target.value 
                  }))}
                  placeholder="Tell customers about your business..."
                  className="mt-1"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          {websiteData.template === 'shop' ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Products
                  <Button onClick={addProduct} size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {websiteData.products.map((product, index) => (
                  <Card key={product.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Product {index + 1}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeProduct(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Product Name</Label>
                        <Input
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                          placeholder="Product name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Price (₹)</Label>
                        <Input
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                          placeholder="999"
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={product.description}
                          onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                          placeholder="Product description"
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                
                {websiteData.products.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Store className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No products added yet. Click "Add Product" to start.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Services
                  <Button onClick={addService} size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Service
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {websiteData.services.map((service, index) => (
                  <Card key={service.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Service {index + 1}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeService(service.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Service Name</Label>
                        <Input
                          value={service.name}
                          onChange={(e) => updateService(service.id, 'name', e.target.value)}
                          placeholder="Service name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          placeholder="Service description"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                
                {websiteData.services.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Wrench className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No services added yet. Click "Add Service" to start.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={websiteData.phone}
                  onChange={(e) => setWebsiteData(prev => ({ 
                    ...prev, 
                    phone: e.target.value 
                  }))}
                  placeholder="+91 98765 43210"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={websiteData.email}
                  onChange={(e) => setWebsiteData(prev => ({ 
                    ...prev, 
                    email: e.target.value 
                  }))}
                  placeholder="business@example.com"
                  className="mt-1"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={websiteData.address}
                  onChange={(e) => setWebsiteData(prev => ({ 
                    ...prev, 
                    address: e.target.value 
                  }))}
                  placeholder="Your business address"
                  className="mt-1"
                  rows={2}
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="whatsapp">WhatsApp Number (with country code)</Label>
                <Input
                  id="whatsapp"
                  value={websiteData.whatsappNumber}
                  onChange={(e) => setWebsiteData(prev => ({ 
                    ...prev, 
                    whatsappNumber: e.target.value 
                  }))}
                  placeholder="919876543210"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 justify-center mt-8">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => setPreviewMode(true)}
          className="gap-2"
        >
          <Eye className="h-5 w-5" />
          Preview Website
        </Button>
        
        <Button 
          variant="hero" 
          size="lg" 
          onClick={generateWebsite}
          className="gap-2"
        >
          <Download className="h-5 w-5" />
          Download Website Files
        </Button>
      </div>
    </div>
  );
}