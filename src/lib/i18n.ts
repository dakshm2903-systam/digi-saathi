export type Language = 'en' | 'hi';

export interface I18nConfig {
  lang: Language;
  translations: Record<string, string>;
}

// Translation keys and content
export const translations = {
  en: {
    // Common
    'app.title': 'DigiSaathi',
    'app.tagline': 'Digital Capability Assessment Tool for Indian businesses',
    'lang.english': 'English',
    'lang.hindi': 'हिन्दी',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try Again',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.finish': 'Finish',
    'common.download': 'Download',
    'common.share': 'Share',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    
    // Navigation
    'nav.home': 'Home',
    'nav.assessment': 'Assessment',
    'nav.learn': 'Learn',
    'nav.tools': 'Tools',
    'nav.schemes': 'Schemes',
    'nav.analytics': 'Analytics',
    
    // Landing page
    'hero.title': 'Transform Your Business with Digital Tools',
    'hero.subtitle': 'Free assessment, personalized learning, and practical tools for Indian MSMEs',
    'cta.start': 'Start Assessment',
    'cta.useTools': 'Use Free Tools',
    'cta.exploreSchemes': 'Explore Schemes',
    
    // Assessment
    'assessment.title': 'Digital Readiness Assessment',
    'assessment.subtitle': 'Discover your digital strengths and areas for growth',
    'assessment.progress': 'Progress',
    'assessment.section.smartphone': 'Smartphone Basics',
    'assessment.section.payments': 'Digital Payments',
    'assessment.section.presence': 'Online Presence',
    'assessment.section.social': 'Social Media',
    'assessment.section.commerce': 'E-Commerce',
    'assessment.section.finance': 'Digital Finance',
    'assessment.section.security': 'Digital Security',
    
    // Tools
    'tools.title': 'Digital Tools',
    'tools.subtitle': 'Free tools to grow your business',
    'tools.qr.title': 'QR Code Generator',
    'tools.qr.subtitle': 'Create QR codes for payments and sharing',
    'tools.invoice.title': 'Invoice Generator',
    'tools.invoice.subtitle': 'Professional GST-compliant invoices',
    'tools.social.title': 'Social Media Scheduler',
    'tools.social.subtitle': 'Plan and schedule your posts',
    'tools.website.title': 'Website Builder',
    'tools.website.subtitle': 'Create a simple business website',
    
    // Schemes
    'schemes.title': 'Government Schemes',
    'schemes.subtitle': 'Discover funding and support opportunities',
    'schemes.filter.all': 'All Schemes',
    'schemes.filter.central': 'Central Government',
    'schemes.filter.state': 'State Government',
    'schemes.eligibility': 'Eligibility',
    'schemes.benefits': 'Benefits',
    'schemes.documents': 'Required Documents',
    'schemes.apply': 'How to Apply',
    
    // Analytics
    'analytics.title': 'Business Impact',
    'analytics.subtitle': 'Track your digital transformation progress',
    'analytics.roi': 'Return on Investment',
    'analytics.tools.used': 'Tools Used',
    'analytics.learning.completed': 'Modules Completed',
  },
  hi: {
    // Common
    'app.title': 'डिजीसाथी',
    'app.tagline': 'भारतीय व्यवसायों के लिए डिजिटल क्षमता मूल्यांकन उपकरण',
    'lang.english': 'English',
    'lang.hindi': 'हिन्दी',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'कुछ गलत हुआ',
    'common.retry': 'फिर से कोशिश करें',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.finish': 'समाप्त',
    'common.download': 'डाउनलोड',
    'common.share': 'शेयर करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'मिटाएं',
    'common.view': 'देखें',
    
    // Navigation
    'nav.home': 'होम',
    'nav.assessment': 'आकलन',
    'nav.learn': 'सीखें',
    'nav.tools': 'उपकरण',
    'nav.schemes': 'योजनाएं',
    'nav.analytics': 'विश्लेषण',
    
    // Landing page
    'hero.title': 'डिजिटल उपकरणों से अपने व्यवसाय को बदलें',
    'hero.subtitle': 'भारतीय एमएसएमई के लिए मुफ्त आकलन, व्यक्तिगत शिक्षा और व्यावहारिक उपकरण',
    'cta.start': 'आकलन शुरू करें',
    'cta.useTools': 'मुफ़्त टूल्स इस्तेमाल करें',
    'cta.exploreSchemes': 'योजनाओं का अन्वेषण करें',
    
    // Assessment
    'assessment.title': 'डिजिटल तैयारी आकलन',
    'assessment.subtitle': 'अपनी डिजिटल शक्तियों और विकास के क्षेत्रों की खोज करें',
    'assessment.progress': 'प्रगति',
    'assessment.section.smartphone': 'स्मार्टफोन की बुनियादी बातें',
    'assessment.section.payments': 'डिजिटल भुगतान',
    'assessment.section.presence': 'ऑनलाइन उपस्थिति',
    'assessment.section.social': 'सोशल मीडिया',
    'assessment.section.commerce': 'ई-कॉमर्स',
    'assessment.section.finance': 'डिजिटल वित्त',
    'assessment.section.security': 'डिजिटल सुरक्षा',
    
    // Tools
    'tools.title': 'डिजिटल उपकरण',
    'tools.subtitle': 'अपने व्यवसाय को बढ़ाने के लिए मुफ्त उपकरण',
    'tools.qr.title': 'QR कोड जेनरेटर',
    'tools.qr.subtitle': 'भुगतान और साझाकरण के लिए QR कोड बनाएं',
    'tools.invoice.title': 'चालान जेनरेटर',
    'tools.invoice.subtitle': 'पेशेवर GST-अनुपालित चालान',
    'tools.social.title': 'सोशल मीडिया शेड्यूलर',
    'tools.social.subtitle': 'अपनी पोस्ट की योजना बनाएं और शेड्यूल करें',
    'tools.website.title': 'वेबसाइट बिल्डर',
    'tools.website.subtitle': 'एक सरल व्यावसायिक वेबसाइट बनाएं',
    
    // Schemes
    'schemes.title': 'सरकारी योजनाएं',
    'schemes.subtitle': 'फंडिंग और सहायता के अवसरों की खोज करें',
    'schemes.filter.all': 'सभी योजनाएं',
    'schemes.filter.central': 'केंद्र सरकार',
    'schemes.filter.state': 'राज्य सरकार',
    'schemes.eligibility': 'पात्रता',
    'schemes.benefits': 'लाभ',
    'schemes.documents': 'आवश्यक दस्तावेज',
    'schemes.apply': 'आवेदन कैसे करें',
    
    // Analytics
    'analytics.title': 'व्यावसायिक प्रभाव',
    'analytics.subtitle': 'अपनी डिजिटल परिवर्तन प्रगति को ट्रैक करें',
    'analytics.roi': 'निवेश पर रिटर्न',
    'analytics.tools.used': 'उपयोग किए गए उपकरण',
    'analytics.learning.completed': 'पूर्ण किए गए मॉड्यूल',
  }
};

export function t(key: string, lang: Language = 'en'): string {
  return translations[lang][key] || key;
}

export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('msme-lang') as Language) || 'en';
  }
  return 'en';
}

export function setLanguage(lang: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('msme-lang', lang);
  }
}