import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => changeLanguage('en')}
        className="h-8 px-3"
      >
        {t('lang.english')}
      </Button>
      <Button
        variant={language === 'hi' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => changeLanguage('hi')}
        className="h-8 px-3"
      >
        {t('lang.hindi')}
      </Button>
    </div>
  );
}