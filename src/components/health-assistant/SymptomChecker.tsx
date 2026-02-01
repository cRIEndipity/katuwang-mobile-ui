import { symptoms, emergencySymptoms } from './data'

// Helper to construct bot responses based on symptom analysis
export const analyzeSymptom = (
  symptomId: string, 
  level: number
): { text: string; options: string[] } => {
  const symptom = symptoms.find(s => s.id === symptomId)
  
  if (!symptom) return { text: "Details not found.", options: ['back'] }

  const levelStars = level === 1 ? '⭐' : level === 2 ? '⭐⭐' : '⭐⭐⭐'
  const levelName = level === 1 ? 'Mild' : level === 2 ? 'Moderate' : 'Severe'
  
  const levelSymptoms = level === 1 ? symptom.level1 :
    level === 2 ? symptom.level2 :
      symptom.level3

  let response = `## ${symptom.name} - ${levelStars}\n\n`
  
  response += `**Symptoms indicating ${levelName.toLowerCase()} severity:**\n`
  levelSymptoms.forEach(s => {
    response += `• ${s}\n`
  })

  response += `\n**Recommended actions:**\n`
  symptom.nextSteps.forEach(step => {
    response += `✓ ${step}\n`
  })

  if (level === 3) {
    response += `\n**🚨 EMERGENCY ACTIONS:**\n`
    symptom.emergencyActions.forEach(action => {
      response += `⚠️ ${action}\n`
    })
  } else {
    response += `\n**When to seek medical help:**\n`
    symptom.whenToSeekHelp.forEach(when => {
      response += `• ${when}\n`
    })
  }

  response += `\n**Naga City Resources:**\n`
  response += `📍 Nearest Health Center: ${level === 3 ? 'EMERGENCY - Call 911' : 'Schedule appointment at City Health Office'}\n`
  response += `📞 Health Hotline: 1555\n`
  response += `🏥 Emergency Services: Available 24/7`

  const options = level === 3 
    ? ['call-911', 'find-hospital', 'back'] 
    : ['monitor-symptoms', 'schedule-appointment', 'find-clinic', 'back']

  return { text: response, options }
}

export const getEmergencyResponse = (): { text: string; options: string[] } => {
  const text = '## 🚨 Emergency Symptoms\n\n**Seek IMMEDIATE medical attention for:**\n\n' +
    emergencySymptoms.map(s => `• ${s}`).join('\n') +
    '\n\n**Call 911 or go to nearest Emergency Room**'
  
  return { text, options: ['call-911', 'find-hospital'] }
}