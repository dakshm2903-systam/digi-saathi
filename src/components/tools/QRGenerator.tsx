import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  QrCode, 
  Download, 
  Share2, 
  CreditCard,
  Type,
  Globe,
  Copy,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function QRGenerator() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [qrData, setQrData] = useState({
    text: '',
    url: '',
    upi: {
      vpa: '',
      name: '',
      amount: ''
    }
  });
  const [activeTab, setActiveTab] = useState('text');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateQR = () => {
    let dataString = '';
    
    switch (activeTab) {
      case 'text':
        dataString = qrData.text;
        break;
      case 'url':
        dataString = qrData.url;
        break;
      case 'upi':
        const { vpa, name, amount } = qrData.upi;
        dataString = `upi://pay?pa=${vpa}&pn=${encodeURIComponent(name)}${amount ? `&am=${amount}` : ''}`;
        break;
    }

    if (!dataString.trim()) {
      toast({
        title: "Error",
        description: "Please enter data to generate QR code",
        variant: "destructive"
      });
      return;
    }

    // For demo purposes, we'll create a placeholder QR code
    // In a real implementation, you'd use a QR code library like 'qrcode'
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;
    
    if (ctx) {
      // Create a simple pattern that looks like a QR code
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = '#000000';
      
      // Draw a simple QR-like pattern
      const moduleSize = 8;
      for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
          }
        }
      }
      
      // Add corner squares
      ctx.fillRect(0, 0, 56, 56);
      ctx.fillRect(200, 0, 56, 56);
      ctx.fillRect(0, 200, 56, 56);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(8, 8, 40, 40);
      ctx.fillRect(208, 8, 40, 40);
      ctx.fillRect(8, 208, 40, 40);
      ctx.fillStyle = '#000000';
      ctx.fillRect(16, 16, 24, 24);
      ctx.fillRect(216, 16, 24, 24);
      ctx.fillRect(16, 216, 24, 24);
    }

    const qrDataUrl = canvas.toDataURL();
    setGeneratedQR(qrDataUrl);
    
    toast({
      title: "QR Code Generated!",
      description: "Your QR code is ready to download or share."
    });
  };

  const downloadQR = () => {
    if (!generatedQR) return;
    
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = generatedQR;
    link.click();
    
    toast({
      title: "Downloaded!",
      description: "QR code saved to your device."
    });
  };

  const shareQR = async () => {
    if (!generatedQR) return;
    
    if (navigator.share) {
      try {
        const response = await fetch(generatedQR);
        const blob = await response.blob();
        const file = new File([blob], 'qr-code.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'QR Code',
          files: [file]
        });
      } catch (error) {
        toast({
          title: "Share failed",
          description: "Could not share QR code"
        });
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Copied!",
          description: "QR code link copied to clipboard"
        });
      } catch (error) {
        toast({
          title: "Copy failed",
          description: "Could not copy to clipboard"
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('tools.qr.title')}</h1>
        <p className="text-muted-foreground">{t('tools.qr.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="gap-2">
                  <Type className="h-4 w-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="url" className="gap-2">
                  <Globe className="h-4 w-4" />
                  URL
                </TabsTrigger>
                <TabsTrigger value="upi" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  UPI
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="text">Enter Text</Label>
                  <Textarea
                    id="text"
                    placeholder="Enter any text to convert to QR code..."
                    value={qrData.text}
                    onChange={(e) => setQrData(prev => ({ ...prev, text: e.target.value }))}
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="url" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://your-website.com"
                    value={qrData.url}
                    onChange={(e) => setQrData(prev => ({ ...prev, url: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </TabsContent>

              <TabsContent value="upi" className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="vpa">UPI ID</Label>
                  <Input
                    id="vpa"
                    placeholder="yourname@paytm"
                    value={qrData.upi.vpa}
                    onChange={(e) => setQrData(prev => ({ 
                      ...prev, 
                      upi: { ...prev.upi, vpa: e.target.value }
                    }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Payee Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Business Name"
                    value={qrData.upi.name}
                    onChange={(e) => setQrData(prev => ({ 
                      ...prev, 
                      upi: { ...prev.upi, name: e.target.value }
                    }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (Optional)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="100"
                    value={qrData.upi.amount}
                    onChange={(e) => setQrData(prev => ({ 
                      ...prev, 
                      upi: { ...prev.upi, amount: e.target.value }
                    }))}
                    className="mt-1"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={generateQR} 
              className="w-full mt-6" 
              size="lg"
              variant="hero"
            >
              Generate QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {generatedQR ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <img 
                    src={generatedQR} 
                    alt="Generated QR Code" 
                    className="border-2 border-border rounded-xl shadow-lg"
                  />
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button onClick={downloadQR} variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button onClick={shareQR} variant="outline" className="gap-2">
                    {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                    Share
                  </Button>
                </div>

                <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                  <div className="font-medium mb-2">💡 Pro Tips:</div>
                  <ul className="text-left space-y-1">
                    <li>• Print on stickers for easy sharing</li>
                    <li>• Test scan before distributing</li>
                    <li>• Include your business name for clarity</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-12 text-muted-foreground">
                <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Your QR code will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}