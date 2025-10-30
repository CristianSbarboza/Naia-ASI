export const INITIAL_FORM_DATA = {
  protagonistName: '',
  protagonistDescription: '',
  protagonistGoal: '',
  antagonistNature: '',
  conflictStartingPoint: '',
  settingLocation: '',
  settingTime: '',
  settingTone: '',
  plotObstacle: '',
  plotClimax: '',
  themeMessage: '',
};

export const stepsConfig = [
  {
    title: "Protagonist",
    iconName: "User",
    description: "Define the hero of your story and what they are seeking.",
    fields: [
      { id: 'protagonistName', label: 'Protagonist Name', type: 'text', placeholder: 'Ex: Arthur' },
      { id: 'protagonistDescription', label: 'Protagonist Description', type: 'textarea', placeholder: 'Ex: Young blacksmith with an innocent heart.' },
      { id: 'protagonistGoal', label: 'Main Goal', type: 'text', placeholder: 'Ex: Retrieve the stolen magical sword.' },
    ],
  },
  {
    title: "Antagonist & Conflict",
    iconName: "Zap",
    description: "Who or what opposes your hero and how the action begins.",
    fields: [
      { id: 'antagonistNature', label: 'Antagonist Nature', type: 'textarea', placeholder: 'Ex: The Dark Queen, consumed by envy.' },
      { id: 'conflictStartingPoint', label: 'Conflict Starting Point', type: 'text', placeholder: 'Ex: He receives a mysterious letter on a rainy day.' },
    ],
  },
  {
    title: "Setting & Atmosphere",
    iconName: "Globe",
    description: "Where and when the story takes place and the emotional tone.",
    fields: [
      { id: 'settingLocation', label: 'Location', type: 'text', placeholder: 'Ex: Kingdom of Eldoria' },
      { id: 'settingTime', label: 'Time Period (year)', type: 'number', placeholder: 'Ex: 1423' },
      { id: 'settingTone', label: 'Tone & Atmosphere', type: 'text', placeholder: 'Ex: Melancholic, with touches of hope.' },
    ],
  },
  {
    title: "Plot & Climax",
    iconName: "BookOpen",
    description: "The greatest challenge and the final confrontation.",
    fields: [
      { id: 'plotObstacle', label: 'The Greatest Obstacle', type: 'textarea', placeholder: 'Ex: Being captured and having to escape a flying dungeon.' },
      { id: 'plotClimax', label: 'Climactic Action', type: 'text', placeholder: 'Ex: Final magical duel at the top of the Antagonist’s tower.' },
    ],
  },
  {
    title: "Theme & Message",
    iconName: "MessageSquare",
    description: "The essence and meaning of your narrative.",
    fields: [
      { id: 'themeMessage', label: 'Central Message / Theme', type: 'textarea', placeholder: 'Ex: True strength lies in kindness.' },
    ],
  },
];
