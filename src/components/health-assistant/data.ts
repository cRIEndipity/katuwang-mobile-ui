import {
  Stethoscope,
  Heart,
  Activity,
  Shield,
  ActivitySquare,
  Baby
} from 'lucide-react'

export interface HealthCategory {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  color: string
  bgColor: string
}

export interface Symptom {
  id: string
  name: string
  description: string
  level1: string[]
  level2: string[]
  level3: string[]
  emergencyActions: string[]
  nextSteps: string[]
  whenToSeekHelp: string[]
}

export const categories: HealthCategory[] = [
  {
    id: 'symptoms',
    name: 'Symptom Checker',
    icon: Stethoscope,
    description: 'Assess symptoms and get triage level',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'firstaid',
    name: 'First Aid Guide',
    icon: Heart,
    description: 'Emergency care instructions',
    color: 'text-red-500',
    bgColor: 'bg-red-100'
  },
  {
    id: 'chronic',
    name: 'Chronic Care',
    icon: Activity,
    description: 'Long-term condition management',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'prevention',
    name: 'Prevention',
    icon: Shield,
    description: 'Disease prevention strategies',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    icon: ActivitySquare,
    description: 'Healthy living guidance',
    color: 'text-amber-500',
    bgColor: 'bg-amber-100'
  },
  {
    id: 'maternal',
    name: 'Maternal & Child',
    icon: Baby,
    description: 'Pregnancy and pediatric care',
    color: 'text-pink-500',
    bgColor: 'bg-pink-100'
  }
]

export const symptoms: Symptom[] = [
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
  }
]

export const emergencySymptoms = [
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
]