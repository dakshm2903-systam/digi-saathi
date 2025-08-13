import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { 
  Home, 
  ClipboardCheck, 
  BookOpen, 
  Wrench, 
  Building, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t('nav.home'), icon: Home },
    { key: 'assessment', label: t('nav.assessment'), icon: ClipboardCheck },
    { key: 'learn', label: t('nav.learn'), icon: BookOpen },
    { key: 'tools', label: t('nav.tools'), icon: Wrench },
    { key: 'schemes', label: t('nav.schemes'), icon: Building },
    { key: 'analytics', label: t('nav.analytics'), icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-white font-bold text-lg">
              M
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gradient">{t('app.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('app.tagline')}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={currentPage === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate(key)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 py-4">
            <div className="flex flex-col gap-2">
              {navItems.map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={currentPage === key ? 'default' : 'ghost'}
                  onClick={() => {
                    onNavigate(key);
                    setIsMenuOpen(false);
                  }}
                  className="justify-start gap-3 h-12"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Button>
              ))}
              <div className="pt-4 border-t border-border/40">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}