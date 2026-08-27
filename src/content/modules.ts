const localized = (en: string, ro: string) => ({ en, ro });

export const moduleDefinitions = [
  {
    id: 'colvision',
    name: 'ColVisionAI',
    shortCode: 'CV',
    accent: '#3478B9',
    responsibility: localized(
      'Structured acquisition and technical image-quality checks for cervical-screening workflows.',
      'Achiziție structurată și verificări ale calității tehnice a imaginilor pentru fluxurile de screening cervical.'
    ),
    boundary: localized(
      'Technical and workflow feedback only. Clinical interpretation remains with qualified professionals.',
      'Doar feedback tehnic și operațional. Interpretarea clinică rămâne responsabilitatea profesioniștilor calificați.'
    )
  },
  {
    id: 'navigator',
    name: 'NavigatorAI',
    shortCode: 'NAV',
    accent: '#7057D2',
    responsibility: localized(
      'Grounded operational guidance, preparation information and approved communication templates.',
      'Îndrumare operațională bazată pe surse aprobate, informații de pregătire și modele de comunicare controlate.'
    ),
    boundary: localized(
      'Questions requiring clinical judgement are escalated to qualified personnel.',
      'Întrebările care necesită raționament clinic sunt direcționate către personal calificat.'
    )
  },
  {
    id: 'followup',
    name: 'Follow-upAI',
    shortCode: 'FU',
    accent: '#CC5873',
    responsibility: localized(
      'Reminders, appointments, preparation checklists, escalation queues and controlled interoperability.',
      'Notificări, programări, liste de pregătire, liste de lucru pentru escaladare și interoperabilitate controlată.'
    ),
    boundary: localized(
      'Supports continuity and prioritisation without making autonomous care decisions.',
      'Sprijină continuitatea și prioritizarea fără a lua decizii autonome de îngrijire.'
    )
  },
  {
    id: 'eco',
    name: 'EcoAI',
    shortCode: 'ECO',
    accent: '#299477',
    responsibility: localized(
      'Equipment availability, predictive-maintenance research and operational capacity planning.',
      'Disponibilitatea echipamentelor, cercetare pentru mentenanță predictivă și planificarea capacității operaționale.'
    ),
    boundary: localized(
      'Operational support only. The module does not make clinical decisions.',
      'Doar sprijin operațional. Modulul nu ia decizii clinice.'
    )
  }
] as const;

export type ModuleDefinition = (typeof moduleDefinitions)[number];
export type ModuleId = ModuleDefinition['id'];
