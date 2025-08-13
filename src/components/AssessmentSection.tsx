import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Smartphone, 
  CreditCard, 
  Globe, 
  Share2, 
  ShoppingCart, 
  Calculator, 
  Shield 
} from 'lucide-react';

const assessmentSections = [
  { key: 'smartphone', icon: Smartphone, weight: 1 },
  { key: 'payments', icon: CreditCard, weight: 2 },
  { key: 'presence', icon: Globe, weight: 2 },
  { key: 'social', icon: Share2, weight: 2 },
  { key: 'commerce', icon: ShoppingCart, weight: 3 },
  { key: 'finance', icon: Calculator, weight: 2 },
  { key: 'security', icon: Shield, weight: 2 },
];

const sampleQuestions = {
  smartphone: [
    { question: 'How comfortable are you with installing new apps?', options: ['Very comfortable', 'Somewhat comfortable', 'Not comfortable'], scores: [3, 2, 1] },
    { question: 'Can you easily share files using your smartphone?', options: ['Yes, always', 'Sometimes', 'No'], scores: [3, 2, 1] },
  ],
  payments: [
    { question: 'Do you use UPI for business transactions?', options: ['Daily', 'Weekly', 'Never'], scores: [3, 2, 1] },
    { question: 'How comfortable are you with QR code payments?', options: ['Very comfortable', 'Somewhat comfortable', 'Not comfortable'], scores: [3, 2, 1] },
  ],
  presence: [
    { question: 'Does your business have a Google Business Profile?', options: ['Yes, updated regularly', 'Yes, but rarely updated', 'No'], scores: [3, 2, 1] },
    { question: 'How often do customers find you through online search?', options: ['Very often', 'Sometimes', 'Rarely'], scores: [3, 2, 1] },
  ],
  social: [
    { question: 'Do you post about your business on social media?', options: ['Daily', 'Weekly', 'Never'], scores: [3, 2, 1] },
    { question: 'Can you create and edit videos for your business?', options: ['Yes, easily', 'With help', 'No'], scores: [3, 2, 1] },
  ],
  commerce: [
    { question: 'Do you sell products/services online?', options: ['Yes, regularly', 'Occasionally', 'No'], scores: [3, 2, 1] },
    { question: 'How do you manage your product catalog?', options: ['Digital app', 'WhatsApp/Photos', 'Paper/Memory'], scores: [3, 2, 1] },
  ],
  finance: [
    { question: 'Do you create digital invoices for your customers?', options: ['Always', 'Sometimes', 'Never'], scores: [3, 2, 1] },
    { question: 'How do you track your business income?', options: ['Digital app', 'Spreadsheet', 'Paper/Memory'], scores: [3, 2, 1] },
  ],
  security: [
    { question: 'Do you use strong passwords for business accounts?', options: ['Always', 'Sometimes', 'No'], scores: [3, 2, 1] },
    { question: 'How do you backup important business data?', options: ['Cloud storage', 'Local backup', 'No backup'], scores: [3, 2, 1] },
  ],
};

interface AssessmentSectionProps {
  onComplete: (results: any) => void;
}

export function AssessmentSection({ onComplete }: AssessmentSectionProps) {
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const section = assessmentSections[currentSection];
  const questions = sampleQuestions[section.key as keyof typeof sampleQuestions];
  const question = questions[currentQuestion];
  const totalQuestions = assessmentSections.reduce((sum, s) => sum + sampleQuestions[s.key as keyof typeof sampleQuestions].length, 0);
  const answeredQuestions = Object.values(answers).flat().length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (optionIndex: number) => {
    const score = question.scores[optionIndex];
    const sectionKey = section.key;
    
    setAnswers(prev => ({
      ...prev,
      [sectionKey]: [...(prev[sectionKey] || []), score]
    }));

    // Move to next question
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else if (currentSection < assessmentSections.length - 1) {
        setCurrentSection(currentSection + 1);
        setCurrentQuestion(0);
      } else {
        // Assessment complete
        setIsCompleted(true);
        calculateResults();
      }
    }, 300);
  };

  const calculateResults = () => {
    const sectionScores = assessmentSections.map(section => {
      const sectionAnswers = answers[section.key] || [];
      const maxPossible = sampleQuestions[section.key as keyof typeof sampleQuestions].length * 3;
      const actual = sectionAnswers.reduce((sum, score) => sum + score, 0);
      const percentage = (actual / maxPossible) * 100;
      
      let level = 'beginner';
      if (percentage > 70) level = 'advanced';
      else if (percentage > 40) level = 'intermediate';
      
      return {
        section: section.key,
        score: percentage,
        level,
        weight: section.weight
      };
    });

    const overallScore = sectionScores.reduce((sum, s) => sum + (s.score * s.weight), 0) / 
                       sectionScores.reduce((sum, s) => sum + s.weight, 0);

    onComplete({
      sectionScores,
      overallScore,
      completedAt: new Date().toISOString()
    });
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Remove last answer
      const sectionKey = section.key;
      setAnswers(prev => ({
        ...prev,
        [sectionKey]: prev[sectionKey]?.slice(0, -1) || []
      }));
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      const prevSection = assessmentSections[currentSection - 1];
      const prevQuestions = sampleQuestions[prevSection.key as keyof typeof sampleQuestions];
      setCurrentQuestion(prevQuestions.length - 1);
      
      // Remove last answer from previous section
      setAnswers(prev => ({
        ...prev,
        [prevSection.key]: prev[prevSection.key]?.slice(0, -1) || []
      }));
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-8">
          <CardContent className="space-y-6">
            <div className="h-16 w-16 mx-auto rounded-full bg-success flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Assessment Complete!</h2>
              <p className="text-muted-foreground">
                Your personalized learning plan is being generated...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 to-success-light/10 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('assessment.title')}</h1>
          <p className="text-muted-foreground">{t('assessment.subtitle')}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{t('assessment.progress')}</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {t(`assessment.section.${section.key}`)}
                </div>
                <div className="text-lg">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-xl font-medium leading-relaxed">
              {question.question}
            </h3>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-4 hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={currentSection === 0 && currentQuestion === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('common.previous')}
          </Button>
          
          <div className="text-sm text-muted-foreground self-center">
            {answeredQuestions} / {totalQuestions} questions
          </div>
        </div>
      </div>
    </div>
  );
}