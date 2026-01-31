import { useState, useEffect, useRef, KeyboardEvent, ReactNode } from 'react';
import {
  ChevronLeft,
  Bot,
  Send,
  Menu,
  AlertTriangle,
  Clock,
  Heart,
  Stethoscope,
  Pill,
  Activity,
  Shield,
  Baby,
  Home,
  MessageSquare,
  X,
  Thermometer,
  HeartPulse,
  ActivitySquare,
  Calendar,
  Search,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  FileText,
  Phone,
  MapPin,
  Star,
  CheckCircle
} from 'lucide-react';

import { Screen } from "../types";

interface HealthAssistantProps {
  onNavigate: (screen: Screen) => void;
}

interface Message {
  id: string;
  type: 'bot' | 'user' | 'system';
  content: string;
  timestamp: Date;
  options?: string[];
  symptomLevel?: number;
}

interface HealthCategory {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  color: string;
  bgColor: string;
}

interface Symptom {
  id: string;
  name: string;
  description: string;
  level1: string[];
  level2: string[];
  level3: string[];
  emergencyActions: string[];
  nextSteps: string[];
  whenToSeekHelp: string[];
}

const categories: HealthCategory[] = [
  {
    id: 'symptoms',
    name: 'Symptom Checker',
    icon: <Stethoscope className="w-5 h-5" />,
    description: 'Assess symptoms and get triage level',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    id: 'firstaid',
    name: 'First Aid Guide',
    icon: <Heart className="w-5 h-5" />,
    description: 'Emergency care instructions',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10'
  },
  {
    id: 'chronic',
    name: 'Chronic Care',
    icon: <Activity className="w-5 h-5" />,
    description: 'Long-term condition management',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    id: 'prevention',
    name: 'Prevention',
    icon: <Shield className="w-5 h-5" />,
    description: 'Disease prevention strategies',
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    icon: <ActivitySquare className="w-5 h-5" />,
    description: 'Healthy living guidance',
    color: 'text-warning',
    bgColor: 'bg-warning/10'
  },
  {
    id: 'maternal',
    name: 'Maternal & Child',
    icon: <Baby className="w-5 h-5" />,
    description: 'Pregnancy and pediatric care',
    color: 'text-pink-500',
    bgColor: 'bg-pink-100'
  }
];

const symptoms: Symptom[] = [
  {
    id: 'fever',
    name: 'Fever',
    description: 'Elevated body temperature',
    level1: [
      'Temperature: 37.5°C - 38°C (99.5°F - 100.4°F)',
      'Mild discomfort',
      'Normal activity possible',
      'No other concerning symptoms'
    ],
    level2: [
      'Temperature: 38.1°C - 39°C (100.5°F - 102.2°F)',
      'Moderate discomfort',
      'Fatigue and chills',
      'Mild headache',
      'Decreased appetite'
    ],
    level3: [
      'Temperature: Above 39°C (102.2°F)',
      'Severe discomfort',
      'Confusion or disorientation',
      'Stiff neck',
      'Difficulty breathing',
      'Persistent vomiting',
      'Seizures'
    ],
    emergencyActions: [
      'Seek immediate medical attention',
      'Call emergency services if temperature > 40°C (104°F)',
      'If accompanied by rash that doesn\'t fade',
      'If patient is under 3 months old'
    ],
    nextSteps: [
      'Rest and hydrate',
      'Monitor temperature every 4 hours',
      'Take antipyretics as directed',
      'Use cool compresses',
      'Wear light clothing'
    ],
    whenToSeekHelp: [
      'Fever persists > 3 days',
      'Symptoms worsen',
      'New symptoms appear',
      'Underlying health conditions',
      'Age < 3 months or > 65 years'
    ]
  },
  {
    id: 'headache',
    name: 'Headache',
    description: 'Pain in head or neck region',
    level1: [
      'Mild pain',
      'Doesn\'t interfere with daily activities',
      'Relieved by rest or OTC medication',
      'No other symptoms'
    ],
    level2: [
      'Moderate pain',
      'Interferes with concentration',
      'Sensitive to light/sound',
      'Nausea without vomiting',
      'Lasts 4-72 hours'
    ],
    level3: [
      'Severe, sudden "thunderclap" headache',
      'Worst headache of life',
      'Accompanied by fever > 38°C',
      'Stiff neck',
      'Vision changes',
      'Weakness/numbness',
      'Confusion',
      'After head injury'
    ],
    emergencyActions: [
      'Call emergency services immediately',
      'Do not drive to hospital',
      'Note time of onset',
      'Check for stroke symptoms (FAST test)'
    ],
    nextSteps: [
      'Rest in quiet, dark room',
      'Hydrate adequately',
      'Avoid triggers (caffeine, stress)',
      'Practice relaxation techniques',
      'Keep headache diary'
    ],
    whenToSeekHelp: [
      'New headache pattern after age 50',
      'Headache that wakes you from sleep',
      'Headache with fever and stiff neck',
      'Headache after head injury',
      'Increasing frequency/severity'
    ]
  },
  {
    id: 'cough',
    name: 'Cough',
    description: 'Respiratory symptom assessment',
    level1: [
      'Occasional cough',
      'No fever',
      'Normal breathing',
      'Lasts < 3 weeks',
      'Clear or white mucus'
    ],
    level2: [
      'Persistent cough',
      'Mild shortness of breath',
      'Low-grade fever',
      'Colored mucus (yellow/green)',
      'Lasts 3-8 weeks',
      'Interferes with sleep'
    ],
    level3: [
      'Severe, constant cough',
      'Difficulty breathing',
      'Coughing up blood',
      'High fever > 39°C',
      'Chest pain',
      'Wheezing or stridor',
      'Cannot speak in full sentences'
    ],
    emergencyActions: [
      'Call emergency if breathing difficulty',
      'Seek immediate care for coughing blood',
      'Emergency room for blue lips/nails',
      'Immediate evaluation for chest pain'
    ],
    nextSteps: [
      'Stay hydrated',
      'Use humidifier',
      'Honey for adults (not children under 1)',
      'Avoid irritants (smoke, strong scents)',
      'Elevate head while sleeping'
    ],
    whenToSeekHelp: [
      'Cough > 8 weeks duration',
      'Associated weight loss',
      'Night sweats',
      'Hoarseness > 3 weeks',
      'Swollen neck glands'
    ]
  },
  {
    id: 'chest-pain',
    name: 'Chest Pain',
    description: 'Cardiac and respiratory assessment',
    level1: [
      'Brief, sharp pain',
      'Reproducible by pressing',
      'Worsens with breathing',
      'Relieved by changing position',
      'No associated symptoms'
    ],
    level2: [
      'Pressure or tightness',
      'Radiates to arm/jaw',
      'Associated with shortness of breath',
      'Brought on by exertion',
      'Relieved by rest',
      'Lasts < 15 minutes'
    ],
    level3: [
      'Severe, crushing pain',
      'Lasts > 15 minutes',
      'Radiates to both arms/jaw/back',
      'Profuse sweating',
      'Nausea/vomiting',
      'Lightheadedness/fainting',
      'Irregular heartbeat',
      'Sense of impending doom'
    ],
    emergencyActions: [
      'CALL 911 IMMEDIATELY',
      'Chew 325mg aspirin (if not allergic)',
      'Stay calm, sit down',
      'Do not drive yourself',
      'Unlock door for responders'
    ],
    nextSteps: [
      'Emergency department evaluation',
      'Cardiac monitoring',
      'Blood tests (troponin, ECG)',
      'Follow-up with cardiologist',
      'Cardiac risk assessment'
    ],
    whenToSeekHelp: [
      'Any new chest pain',
      'Change in pattern of known chest pain',
      'Pain with exertion',
      'Family history of heart disease',
      'Multiple risk factors (smoking, diabetes, hypertension)'
    ]
  },
  {
    id: 'abdominal-pain',
    name: 'Abdominal Pain',
    description: 'Stomach and digestive system assessment',
    level1: [
      'Mild stomach ache or cramping',
      'Gas or bloating',
      'Mild nausea without vomiting',
      'Constipation',
      'Can move and walk normally'
    ],
    level2: [
      'Constant pain or discomfort',
      'Vomiting or diarrhea',
      'Low grade fever',
      'Pain worsens after eating',
      'Localized tenderness'
    ],
    level3: [
      'Severe, sharp, or tearing pain',
      'Rigid or very tender abdomen',
      'Vomiting blood or "coffee grounds"',
      'Bloody or black stools',
      'Inability to pass stool or gas',
      'Pregnant with abdominal pain'
    ],
    emergencyActions: [
      'Seek immediate emergency care',
      'Do not eat or drink anything',
      'Do not take pain medication until evaluated',
      'Lie still in comfortable position'
    ],
    nextSteps: [
      'Rest digestive system (clear liquids)',
      'Avoid solid foods initially',
      'Monitor hydration status',
      'Use heating pad for comfort',
      'Follow BRAT diet when eating resumes'
    ],
    whenToSeekHelp: [
      'Pain > 24 hours',
      'Fever > 38.5°C',
      'Dehydration signs',
      'Possible pregnancy',
      'Recent abdominal injury'
    ]
  },
  {
    id: 'back-pain',
    name: 'Back Pain',
    description: 'Spine and prolonged back discomfort',
    level1: [
      'Stiffness or soreness',
      'After physical exertion',
      'Relieved by rest or changing position',
      'Full range of motion preserved',
      'No radiation to legs'
    ],
    level2: [
      'Persistent ache',
      'Radiates to one leg (above knee)',
      'Muscle spasms',
      'Pain limits daily activities',
      'Lasts > 1 week'
    ],
    level3: [
      'Loss of bladder/bowel control',
      'Numbness or weakness in legs',
      'Pain radiates below knee',
      'History of cancer',
      'Associated with fever',
      'After severe trauma (fall/accident)'
    ],
    emergencyActions: [
      'Go to ER immediately for bowel/bladder loss',
      'Immobilize if trauma suspected',
      'Do not heat injured area initially',
      'Neurological evaluation needed'
    ],
    nextSteps: [
      'Alternate heat and cold therapy',
      'Gentle stretching exercises',
      'OTC anti-inflammatory medication',
      'Maintain good posture',
      'Avoid heavy lifting'
    ],
    whenToSeekHelp: [
      'Unexplained weight loss',
      'Constant pain at night',
      'History of steroid use',
      'Pain > 4 weeks',
      'Leg weakness'
    ]
  }
];

const emergencySymptoms = [
  'Chest pain with shortness of breath',
  'Difficulty breathing',
  'Severe bleeding',
  'Sudden weakness/numbness',
  'Severe burns',
  'Poisoning',
  'Head injury with loss of consciousness',
  'Seizures',
  'Severe allergic reaction',
  'Thoughts of self-harm'
];

export default function HealthAssistant({ onNavigate }: HealthAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: '## 🏥 Naga City Health Assistant\n\n**Katuwang:** Your trusted health companion\n\n*Powered by Naga City Health Department*\n\nI can help you assess symptoms, provide first aid guidance, and connect you with local health resources. How may I assist you today?',
      timestamp: new Date(),
      options: ['symptoms', 'firstaid', 'chronic', 'prevention', 'lifestyle', 'maternal']
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSymptom, setCurrentSymptom] = useState<Symptom | null>(null);
  const [symptomLevel, setSymptomLevel] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<Array<{ role: string, content: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type: 'bot' | 'user' | 'system', content: string, options?: string[], symptomLevel?: number) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      options,
      symptomLevel
    };
    setMessages(prev => [...prev, newMessage]);
    setChatHistory(prev => [...prev, { role: type === 'user' ? 'user' : 'assistant', content }]);
  };

  const simulateTyping = (duration: number = 1000) => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve(true);
      }, duration);
    });
  };

  const handleCategorySelect = async (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    setSelectedCategory(categoryId);
    addMessage('user', `Selected: ${category.name}`);

    await simulateTyping(800);

    if (categoryId === 'symptoms') {
      addMessage(
        'bot',
        `## ${category.name}\n\n${category.description}\n\nPlease select a symptom to assess or describe your symptoms in your own words:`,
        [...symptoms.map(s => s.id), 'describe-symptoms', 'back']
      );
    } else {
      addMessage(
        'bot',
        `## ${category.name}\n\n${category.description}\n\nSelect a specific topic or ask your question:`,
        ['back']
      );
    }
  };

  const handleSymptomSelect = async (symptomId: string) => {
    const symptom = symptoms.find(s => s.id === symptomId);
    if (!symptom) return;

    setCurrentSymptom(symptom);
    addMessage('user', `Symptom: ${symptom.name}`);

    await simulateTyping(1000);

    addMessage(
      'bot',
      `## ${symptom.name}\n\n${symptom.description}\n\n**Please select the level that best describes your symptoms:**\n\n*This helps determine appropriate next steps*`,
      ['level1', 'level2', 'level3', 'not-sure', 'back']
    );
  };

  const handleSymptomLevelSelect = async (level: number) => {
    if (!currentSymptom) return;

    setSymptomLevel(level);
    const levelStars = level === 1 ? '⭐' : level === 2 ? '⭐⭐' : '⭐⭐⭐';
    addMessage('user', `Selected: ${levelStars}`);

    await simulateTyping(1200);

    const levelSymptoms = level === 1 ? currentSymptom.level1 :
      level === 2 ? currentSymptom.level2 :
        currentSymptom.level3;

    let response = `## ${currentSymptom.name} - ${levelStars}\n\n`;

    const levelName = level === 1 ? 'Mild' : level === 2 ? 'Moderate' : 'Severe';
    response += `**Symptoms indicating ${levelName.toLowerCase()} severity:**\n`;
    levelSymptoms.forEach(symptom => {
      response += `• ${symptom}\n`;
    });

    response += `\n**Recommended actions:**\n`;
    currentSymptom.nextSteps.forEach(step => {
      response += `✓ ${step}\n`;
    });

    if (level === 3) {
      response += `\n**🚨 EMERGENCY ACTIONS:**\n`;
      currentSymptom.emergencyActions.forEach(action => {
        response += `⚠️ ${action}\n`;
      });
    } else {
      response += `\n**When to seek medical help:**\n`;
      currentSymptom.whenToSeekHelp.forEach(when => {
        response += `• ${when}\n`;
      });
    }

    response += `\n**Naga City Resources:**\n`;
    response += `📍 Nearest Health Center: ${level === 3 ? 'EMERGENCY - Call 911' : 'Schedule appointment at City Health Office'}\n`;
    response += `📞 Health Hotline: 1555\n`;
    response += `🏥 Emergency Services: Available 24/7`;

    addMessage('bot', response,
      level === 3 ? ['call-911', 'find-hospital', 'back'] :
        ['monitor-symptoms', 'schedule-appointment', 'find-clinic', 'back']
    );
  };

  const handleQuickAction = async (action: string) => {
    switch (action) {
      case 'back':
        setSelectedCategory(null);
        setCurrentSymptom(null);
        setSymptomLevel(0);
        addMessage('user', 'Back to main menu');
        await simulateTyping(500);
        addMessage(
          'bot',
          '## Main Menu\n\nHow can I assist you today?',
          categories.map(c => c.id)
        );
        break;

      case 'describe-symptoms':
        addMessage('bot', 'Please describe your symptoms in detail. Include:\n\n• When symptoms started\n• Severity (1-10 scale)\n• Any associated symptoms\n• What makes it better/worse\n• Any medications tried');
        break;

      case 'call-911':
        onNavigate('emergency');
        break;

      case 'find-hospital':
        onNavigate('hospitals');
        break;

      case 'find-clinic':
        onNavigate('contacts');
        break;

      case 'schedule-appointment':
        addMessage('bot', 'To schedule an appointment:\n\n1. **Online:** Visit Naga City Health Portal\n2. **Phone:** Call 1555\n3. **In-person:** Visit City Health Office\n\nOperating hours: 8AM-5PM, Monday-Friday');
        break;

      case 'monitor-symptoms':
        addMessage('bot', '**Symptom Monitoring Guide:**\n\n📋 Keep a symptom diary:\n• Record symptoms daily\n• Note severity (1-10)\n• Track triggers\n• Document medications\n\nReturn if symptoms worsen or new symptoms appear.');
        break;

      case 'not-sure':
        addMessage('bot', '**If you\'re unsure about symptom level:**\n\n1. **Describe your symptoms** in detail\n2. **Contact health hotline**: 1555\n3. **Visit nearest clinic** for assessment\n\nWhen in doubt, seek professional evaluation.');
        break;

      case 'emergency':
        addMessage('bot', '## 🚨 Emergency Symptoms\n\n**Seek IMMEDIATE medical attention for:**\n\n' +
          emergencySymptoms.map(s => `• ${s}`).join('\n') +
          '\n\n**Call 911 or go to nearest Emergency Room**');
        break;

      case 'head-pain':
      case 'abdominal-pain':
      case 'back-pain':
        // These are now handled as symptoms
        break;

      case 'describe-pain':
        addMessage('bot', 'Please describe your pain in detail. Include location, type (sharp/dull), severity, and duration.');
        break;

      case 'assess-fever':
        handleSymptomSelect('fever');
        break;

      case 'monitor':
        addMessage('bot', '**Symptom Monitoring Guide:**\n\n📋 Keep a symptom diary:\n• Record symptoms daily\n• Note severity (1-10)\n• Track triggers\n• Document medications\n\nReturn if symptoms worsen or new symptoms appear.');
        break;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage('user', userMessage);
    setInputMessage('');

    await simulateTyping(1500);

    // Simple keyword matching for demo (in real app, use NLP/AI)
    const lowerMessage = userMessage.toLowerCase();

    let response = '';

    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      response = '**Regarding fever:**\n\nFever is your body\'s response to infection. Key considerations:\n\n• Monitor temperature regularly\n• Stay hydrated\n• Rest as needed\n• Seek help if >39°C or persists >3 days\n\nWould you like to assess your fever level?';
      addMessage('bot', response, ['assess-fever', 'monitor', 'back']);
    } else if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
      response = '**Regarding pain:**\n\nPain assessment is important. Please specify:\n\n1. Location of pain\n2. Type (sharp, dull, throbbing)\n3. Severity (1-10)\n4. Duration\n5. What relieves/worsens it';
      response = '**Regarding pain:**\n\nPain assessment is important. Please specify:\n\n1. Location of pain\n2. Type (sharp, dull, throbbing)\n3. Severity (1-10)\n4. Duration\n5. What relieves/worsens it';
      addMessage('bot', response, ['headache', 'chest-pain', 'abdominal-pain', 'back-pain', 'describe-pain']);
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      response = '**Emergency Response:**\n\nIf this is a medical emergency:\n\n🚨 **Call 911 immediately**\n\nFor non-emergency concerns, please describe your symptoms for proper guidance.';
      addMessage('bot', response, ['call-911', 'find-hospital']);
    } else {
      response = 'Thank you for sharing. For accurate assessment:\n\n1. **Describe specific symptoms**\n2. **Note duration and severity**\n3. **Any existing health conditions**\n4. **Current medications**\n\nOr select from common symptoms for detailed guidance.';
      addMessage('bot', response, symptoms.map(s => s.id));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 2: return 'bg-amber-100 text-amber-700 border-amber-200';
      case 3: return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getLevelIcon = (level: number) => {
    switch (level) {
      case 1: return '⭐';
      case 2: return '⭐⭐';
      case 3: return '⭐⭐⭐';
      default: return '○';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <div>
                <h1 className="text-base font-bold text-foreground">Health Assistant</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Naga City Health</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('emergency')}
              className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
              title="Emergency"
            >
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {message.type === 'bot' && (
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">Katuwang Assistant</div>
                    <div className="text-[10px] text-muted-foreground">Naga City Certified</div>
                  </div>
                </div>
              )}

              <div className={`rounded-xl p-4 ${message.type === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-none shadow-sm'
                : 'bg-card border border-border rounded-bl-none shadow-sm'
                }`}>
                {message.type === 'bot' && message.content.includes('##') && (
                  <div className="mb-3 pb-2 border-b border-border/50">
                    <h3 className="text-base font-bold text-foreground">
                      {message.content.split('\n')[0].replace('## ', '')}
                    </h3>
                  </div>
                )}

                <div className="prose prose-sm max-w-none">
                  {message.content.split('\n').map((line, index) => {
                    if (line.startsWith('## ')) return null;

                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <div key={index} className="font-semibold text-foreground mb-2">
                          {line.replace(/\*\*/g, '')}
                        </div>
                      );
                    }

                    if (line.startsWith('• ') || line.startsWith('✓ ') || line.startsWith('⚠️ ') || line.startsWith('📍 ') || line.startsWith('📞 ') || line.startsWith('🏥 ')) {
                      const prefix = line.charAt(0);
                      const color = prefix === '•' ? 'text-muted-foreground' :
                        prefix === '✓' ? 'text-emerald-600' :
                          prefix === '⚠️' ? 'text-destructive' : 'text-primary';
                      return (
                        <div key={index} className={`flex items-start gap-2 mb-1 ${color}`}>
                          <span className="mt-0.5 flex-shrink-0">{prefix === '•' ? '•' : prefix === '✓' ? '✓' : prefix}</span>
                          <span>{line.substring(2)}</span>
                        </div>
                      );
                    }

                    if (line.trim() === '') {
                      return <div key={index} className="h-3" />;
                    }

                    return (
                      <p key={index} className="text-sm text-foreground/80 mb-2 last:mb-0">
                        {line}
                      </p>
                    );
                  })}
                </div>

                {message.symptomLevel && (
                  <div className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getLevelColor(message.symptomLevel)}`}>
                    <span>{getLevelIcon(message.symptomLevel)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/30">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 opacity-60" />
                    <span className="text-xs opacity-60">{formatTime(message.timestamp)}</span>
                  </div>
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-primary/10 rounded text-primary">
                      <CheckCircle className="w-2.5 h-2.5" />
                      <span>Verified Info</span>
                    </div>
                  )}
                </div>
              </div>

              {message.options && message.options.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {message.options.map((option) => {
                    let label = '';
                    let color = 'bg-muted hover:bg-muted/80 text-foreground border-border';
                    let icon = null;

                    const category = categories.find(c => c.id === option);
                    const symptom = symptoms.find(s => s.id === option);

                    if (category) {
                      label = category.name;
                      color = 'bg-primary/10 hover:bg-primary/20 text-primary border-primary/20';
                      icon = category.icon;
                    } else if (symptom) {
                      label = symptom.name;
                      color = 'bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20';
                      icon = <Stethoscope className="w-3.5 h-3.5" />;
                    } else if (option === 'back') {
                      label = 'Back to Main';
                      color = 'bg-muted hover:bg-muted/80 text-muted-foreground border-border';
                      icon = <ChevronLeft className="w-3.5 h-3.5" />;
                    } else if (option.startsWith('level')) {
                      const level = parseInt(option.replace('level', ''));
                      const stars = level === 1 ? '⭐' : level === 2 ? '⭐⭐' : '⭐⭐⭐';
                      const severity = level === 1 ? 'Mild' : level === 2 ? 'Moderate' : 'Severe';
                      label = `${stars} - ${severity}`;
                      color = level === 1 ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-emerald-200' :
                        level === 2 ? 'bg-amber-100 hover:bg-amber-200 text-amber-700 border-amber-200' :
                          'bg-red-100 hover:bg-red-200 text-red-700 border-red-200';
                      icon = <Star className="w-3.5 h-3.5" />;
                    } else if (option === 'call-911') {
                      label = '🚨 Call Emergency Services';
                      color = 'bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/20';
                      icon = <AlertTriangle className="w-3.5 h-3.5" />;
                    } else if (option === 'find-hospital') {
                      label = '🏥 Find Emergency Room';
                      color = 'bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/20';
                      icon = <MapPin className="w-3.5 h-3.5" />;
                    } else if (option === 'find-clinic') {
                      label = '📍 Find Health Center';
                      color = 'bg-primary/10 hover:bg-primary/20 text-primary border-primary/20';
                      icon = <Home className="w-3.5 h-3.5" />;
                    } else if (option === 'schedule-appointment') {
                      label = '📅 Schedule Appointment';
                      color = 'bg-primary/10 hover:bg-primary/20 text-primary border-primary/20';
                      icon = <Calendar className="w-3.5 h-3.5" />;
                    } else if (option === 'monitor-symptoms') {
                      label = '📋 Monitor Symptoms';
                      color = 'bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20';
                      icon = <Activity className="w-3.5 h-3.5" />;
                    } else if (option === 'describe-symptoms') {
                      label = '✏️ Describe Symptoms';
                      color = 'bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20';
                      icon = <FileText className="w-3.5 h-3.5" />;
                    } else if (option === 'not-sure') {
                      label = '❓ Not Sure About Level';
                      color = 'bg-muted hover:bg-muted/80 text-muted-foreground border-border';
                      icon = <HelpCircle className="w-3.5 h-3.5" />;
                      color = 'bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/20';
                      icon = <AlertTriangle className="w-3.5 h-3.5" />;
                    } else if (option === 'describe-pain') {
                      label = '📝 Describe Pain';
                      color = 'bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20';
                      icon = <FileText className="w-3.5 h-3.5" />;
                    } else if (option === 'assess-fever') {
                      label = '🌡️ Assess Fever';
                      color = 'bg-primary/10 hover:bg-primary/20 text-primary border-primary/20';
                      icon = <Thermometer className="w-3.5 h-3.5" />;
                    } else if (option === 'monitor') {
                      label = '📋 Monitor Symptoms';
                      color = 'bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20';
                      icon = <Activity className="w-3.5 h-3.5" />;
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => {
                          if (category) {
                            handleCategorySelect(option);
                          } else if (symptom) {
                            handleSymptomSelect(option);
                          } else if (option.startsWith('level')) {
                            handleSymptomLevelSelect(parseInt(option.replace('level', '')));
                          } else {
                            handleQuickAction(option);
                          }
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-left transition-all hover:scale-[1.01] active:scale-[0.99] text-xs font-medium flex items-center gap-2.5 border ${color}`}
                      >
                        {icon}
                        <span className="flex-1">{label}</span>
                        <ChevronRight className="w-3 h-3 opacity-60" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[85%]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl rounded-bl-none p-3">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full animate-pulse delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-sm p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your symptoms or question."
                className="w-full pl-4 pr-12 py-3 bg-input-background border border-input-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground text-sm"
              />
              <button
                onClick={() => handleQuickAction('describe-symptoms')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-muted rounded-lg transition-colors"
                title="Describe symptoms"
              >
                <FileText className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`px-4 py-3 rounded-xl font-medium transition-all active:scale-95 ${inputMessage.trim()
                ? 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Your health data is private and secure</span>
              </div>
            </div>
            <button
              onClick={() => handleQuickAction('emergency')}
              className="text-xs text-destructive hover:text-destructive-hover transition-colors flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Emergency Symptoms</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}