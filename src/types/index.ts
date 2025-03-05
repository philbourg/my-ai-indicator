export type Category = 1 | 2 | 3 | 4 | 5 | null;

export interface WizardContextType {
  step: number;
  setStep: (step: number) => void;
  musicCategory: Category;
  setMusicCategory: (category: Category) => void;
  textCategory: Category;
  setTextCategory: (category: Category) => void;
  isQuestionnaireMode: boolean;
  setQuestionnaireMode: (mode: boolean) => void;
  musicQuestionnaireAnswers: Record<string, number>;
  setMusicQuestionnaireAnswers: (answers: Record<string, number>) => void;
  textQuestionnaireAnswers: Record<string, number>;
  setTextQuestionnaireAnswers: (answers: Record<string, number>) => void;
}

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}

export interface ResultProps {
  onBack?: () => void;
}

export interface CategoryOption {
  id: Category;
  title: string;
  description: string;
}

export const musicCategoryOptions: CategoryOption[] = [
  {
    id: 1,
    title: "IA seule",
    description: "Génération IA sans intervention humaine.",
  },
  {
    id: 2,
    title: "IA dirigée",
    description: "Génération IA avec direction humaine (prompts, corrections).",
  },
  {
    id: 3,
    title: "Collaboration IA",
    description: "Mélange équilibré entre créativité humaine et IA.",
  },
  {
    id: 4,
    title: "Assistance numérique",
    description: "Production humaine avec outils numériques basiques.",
  },
  {
    id: 5,
    title: "Production artisanale",
    description: "Production humaine sans IA ni automatisation.",
  },
];

export const textCategoryOptions: CategoryOption[] = [
  {
    id: 1,
    title: "IA seule",
    description: "Texte généré par IA sans intervention.",
  },
  {
    id: 2,
    title: "IA dirigée",
    description: "Texte IA avec raffinement humain intensif.",
  },
  {
    id: 3,
    title: "Collaboration IA",
    description: "Rédaction mixte humain-IA.",
  },
  {
    id: 4,
    title: "Assistance numérique",
    description: "Texte humain avec outils d'aide basiques.",
  },
  {
    id: 5,
    title: "Production artisanale",
    description: "Texte 100% humain sans assistance automatique.",
  },
];

export const musicCategoryOptionsDetailed: CategoryOption[] = [
  {
    id: 1,
    title: "IA seule",
    description:
      "L'œuvre est générée par une IA sans aucune implication manuelle directe dans le choix ou la modification du contenu final.",
  },
  {
    id: 2,
    title: "IA dirigée",
    description:
      "L'œuvre finale est toujours à 100% générée par l'IA, mais avec une forte intervention humaine sur le plan de la direction créative, du prompting, des corrections et du raffinage.",
  },
  {
    id: 3,
    title: "Collaboration IA",
    description:
      "Un mélange entre la créativité et l'interprétation humaine, et l'apport de l'IA ou d'autres outils numériques, de manière significative dans le processus.",
  },
  {
    id: 4,
    title: "Assistance numérique",
    description:
      "L'œuvre est principalement produite, jouée ou composée par un être humain, mais emploie des outils numériques pour des améliorations ou des corrections non substantielles.",
  },
  {
    id: 5,
    title: "Production artisanale",
    description:
      "L'œuvre est quasi entièrement le fruit d'une interprétation et d'une expertise humaines, avec un usage très limité ou inexistant d'automatismes IA ou numériques.",
  },
];

export const textCategoryOptionsDetailed: CategoryOption[] = [
  {
    id: 1,
    title: "IA seule",
    description:
      "Le texte est généré automatiquement par une IA sans prompt réfléchi ou avec un prompt unique accepté tel quel.",
  },
  {
    id: 2,
    title: "IA dirigée",
    description:
      "Le texte est principalement généré par l'IA, mais avec un raffinage intensif humain sur le plan de la structure, du style et du contenu.",
  },
  {
    id: 3,
    title: "Collaboration IA",
    description:
      "L'auteur rédige (en partie) ou conçoit la structure, les idées, puis s'appuie sur l'IA pour compléter ou optimiser des segments de texte de manière significative.",
  },
  {
    id: 4,
    title: "Assistance numérique",
    description:
      "Le texte est principalement écrit par l'auteur, mais utilise des outils IA ou d'autres logiciels qui affinent le résultat, sans changer fondamentalement les idées ni la structure.",
  },
  {
    id: 5,
    title: "Production artisanale",
    description:
      "Le texte est exclusivement écrit par un être humain sans avoir recours à des outils automatiques pour la correction, la suggestion, ou la reformulation.",
  },
];

// Music questionnaire types
export interface QuestionOption {
  id: string;
  text: string;
  points: number;
}

export interface QuestionItem {
  id: string;
  text: string;
  options: QuestionOption[];
  notApplicable?: boolean;
}

export const musicQuestions: QuestionItem[] = [
  {
    id: "q1",
    text: "Comment le matériau musical de base (mélodie, harmonie, rythme) a-t-il été créé ?",
    options: [
      {
        id: "a",
        text: "Entièrement généré par une IA sans modification",
        points: 1,
      },
      {
        id: "b",
        text: "Généré par une IA, puis sélectionné parmi plusieurs propositions",
        points: 2,
      },
      {
        id: "c",
        text: "Co-créé avec une aide significative de l'IA",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement créé par un humain avec suggestions d'IA",
        points: 4,
      },
      {
        id: "e",
        text: "Entièrement composé par un humain sans aucune suggestion d'IA",
        points: 5,
      },
    ],
  },
  {
    id: "q2",
    text: "Quel niveau de prompting ou de direction avez-vous fourni à l'IA ?",
    options: [
      {
        id: "a",
        text: "Aucun prompt spécifique ou un prompt très basique",
        points: 1,
      },
      {
        id: "b",
        text: "Un prompt détaillé avec paramètres spécifiques",
        points: 2,
      },
      {
        id: "c",
        text: "Multiples itérations de prompts avec ajustements progressifs",
        points: 3,
      },
      {
        id: "d",
        text: "Ne s'applique pas - J'ai principalement composé moi-même avec une assistance minimale",
        points: 4,
      },
      {
        id: "e",
        text: "Ne s'applique pas - Aucune IA utilisée dans la composition",
        points: 5,
      },
    ],
  },
  {
    id: "q3",
    text: "Comment les structures musicales (couplets, refrains, transitions) ont-elles été déterminées ?",
    options: [
      {
        id: "a",
        text: "Générées automatiquement par l'IA sans modification",
        points: 1,
      },
      {
        id: "b",
        text: "Générées par l'IA mais réarrangées manuellement",
        points: 2,
      },
      {
        id: "c",
        text: "Combinaison de suggestions IA et de décisions humaines",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement déterminées par un humain avec quelques suggestions d'outils",
        points: 4,
      },
      {
        id: "e",
        text: "Entièrement conçues par un humain sans outils automatisés",
        points: 5,
      },
    ],
  },
  {
    id: "q4",
    text: "Comment les sons et instruments ont-ils été sélectionnés et utilisés ?",
    options: [
      {
        id: "a",
        text: "Entièrement choisis par l'IA sans intervention",
        points: 1,
      },
      {
        id: "b",
        text: "Générés par l'IA mais avec sélection humaine parmi plusieurs options",
        points: 2,
      },
      {
        id: "c",
        text: "Mélange de sons générés par IA et de sons/instruments conventionnels",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement des instruments virtuels ou réels joués/sélectionnés par un humain",
        points: 4,
      },
      {
        id: "e",
        text: "Uniquement des instruments réels joués par des humains",
        points: 5,
      },
    ],
  },
  {
    id: "q5",
    text: "Comment les éléments sonores ont-ils été arrangés dans le mix ?",
    options: [
      { id: "a", text: "Mix entièrement généré par l'IA", points: 1 },
      {
        id: "b",
        text: "Mix généré par l'IA avec ajustements humains mineurs",
        points: 2,
      },
      {
        id: "c",
        text: "Mix réalisé avec l'aide significative d'outils automatisés/IA",
        points: 3,
      },
      {
        id: "d",
        text: "Mix principalement manuel avec utilisation d'outils d'assistance (EQ, compresseurs)",
        points: 4,
      },
      {
        id: "e",
        text: "Mix entièrement manuel sans automatisation significative",
        points: 5,
      },
    ],
  },
  {
    id: "q6",
    text: "Quelle approche avez-vous utilisée pour les effets sonores et traitements (réverbération, délai, etc.) ?",
    options: [
      {
        id: "a",
        text: "Effets entièrement générés et appliqués par l'IA",
        points: 1,
      },
      {
        id: "b",
        text: "Effets suggérés par l'IA avec ajustements humains",
        points: 2,
      },
      {
        id: "c",
        text: "Mélange d'effets automatiques et d'effets manuellement configurés",
        points: 3,
      },
      {
        id: "d",
        text: "Effets principalement appliqués manuellement avec des plugins standards",
        points: 4,
      },
      {
        id: "e",
        text: "Effets entièrement analogiques ou appliqués manuellement sans suggestions automatisées",
        points: 5,
      },
    ],
  },
  {
    id: "q7",
    text: "Comment les voix ou solos instrumentaux ont-ils été créés ?",
    options: [
      { id: "a", text: "Entièrement synthétisés/chantés par l'IA", points: 1 },
      {
        id: "b",
        text: "Générés par l'IA avec édition humaine substantielle",
        points: 2,
      },
      { id: "c", text: "Mélange de voix/solos IA et humains", points: 3 },
      {
        id: "d",
        text: "Interprétation humaine avec correction/assistance numérique (auto-tune léger, quantification)",
        points: 4,
      },
      {
        id: "e",
        text: "Performance humaine pure sans correction numérique",
        points: 5,
      },
    ],
    notApplicable: true,
  },
  {
    id: "q8",
    text: "Comment avez-vous géré la post-production et la finalisation ?",
    options: [
      {
        id: "a",
        text: "Automatiquement générée et masterisée par l'IA",
        points: 1,
      },
      {
        id: "b",
        text: "Générée par l'IA avec ajustements humains limités",
        points: 2,
      },
      {
        id: "c",
        text: "Processus hybride utilisant des outils automatisés avec supervision humaine significative",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement manuelle avec utilisation d'outils d'assistance standards",
        points: 4,
      },
      {
        id: "e",
        text: "Entièrement manuelle sans automatisation substantielle",
        points: 5,
      },
    ],
  },
  {
    id: "q9",
    text: "Quel pourcentage approximatif du contenu final considérez-vous comme généré ou fortement influencé par l'IA ?",
    options: [
      { id: "a", text: "90-100%", points: 1 },
      { id: "b", text: "70-89%", points: 2 },
      { id: "c", text: "40-69%", points: 3 },
      { id: "d", text: "10-39%", points: 4 },
      { id: "e", text: "0-9%", points: 5 },
    ],
  },
  {
    id: "q10",
    text: "Quelle a été votre intervention principale dans le processus créatif ?",
    options: [
      {
        id: "a",
        text: "Principalement la sélection et l'approbation des résultats IA",
        points: 1,
      },
      {
        id: "b",
        text: "Ajustement des paramètres et itération des prompts IA",
        points: 2,
      },
      {
        id: "c",
        text: "Édition substantielle et combinaison des éléments générés par IA",
        points: 3,
      },
      {
        id: "d",
        text: "Création principale avec assistance numérique pour l'amélioration",
        points: 4,
      },
      {
        id: "e",
        text: "Création, interprétation et production entièrement humaines",
        points: 5,
      },
    ],
  },
];

export const textQuestions: QuestionItem[] = [
  {
    id: "q1",
    text: "Comment le concept et les idées principales du texte ont-ils été générés ?",
    options: [
      {
        id: "a",
        text: "Entièrement proposés par l'IA sans modification",
        points: 1,
      },
      {
        id: "b",
        text: "Générés par l'IA, puis sélectionnés parmi plusieurs propositions",
        points: 2,
      },
      {
        id: "c",
        text: "Co-créés avec une aide significative de l'IA",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement conçus par un humain avec quelques suggestions d'IA",
        points: 4,
      },
      {
        id: "e",
        text: "Entièrement conçus par un humain sans aucune suggestion d'IA",
        points: 5,
      },
    ],
  },
  {
    id: "q2",
    text: "Comment avez-vous formulé vos demandes à l'IA ?",
    options: [
      { id: "a", text: "Prompt unique et simple sans itération", points: 1 },
      {
        id: "b",
        text: "Prompt détaillé avec paramètres spécifiques",
        points: 2,
      },
      {
        id: "c",
        text: "Série de prompts avec ajustements progressifs",
        points: 3,
      },
      {
        id: "d",
        text: "Ne s'applique pas - J'ai principalement écrit moi-même",
        points: 4,
      },
      { id: "e", text: "Ne s'applique pas - Aucune IA utilisée", points: 5 },
    ],
  },
  {
    id: "q3",
    text: "Comment la structure narrative ou argumentative a-t-elle été déterminée ?",
    options: [
      { id: "a", text: "Structure entièrement générée par l'IA", points: 1 },
      { id: "b", text: "Structure IA réorganisée manuellement", points: 2 },
      { id: "c", text: "Structure co-créée avec suggestions IA", points: 3 },
      {
        id: "d",
        text: "Structure humaine avec assistance mineure d'outils",
        points: 4,
      },
      { id: "e", text: "Structure entièrement conçue par l'humain", points: 5 },
    ],
  },
  {
    id: "q4",
    text: "Comment le premier jet du texte a-t-il été produit ?",
    options: [
      {
        id: "a",
        text: "Généré intégralement par l'IA et utilisé tel quel",
        points: 1,
      },
      { id: "b", text: "Généré par l'IA et légèrement modifié", points: 2 },
      {
        id: "c",
        text: "Mélange de segments générés par IA et de segments écrits par l'humain",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement écrit par l'humain avec quelques suggestions d'IA",
        points: 4,
      },
      {
        id: "e",
        text: "Entièrement écrit par l'humain sans génération IA",
        points: 5,
      },
    ],
  },
  {
    id: "q5",
    text: "Comment le vocabulaire et les formulations spécifiques ont-ils été choisis ?",
    options: [
      {
        id: "a",
        text: "Entièrement générés et sélectionnés par l'IA",
        points: 1,
      },
      {
        id: "b",
        text: "Générés par l'IA avec quelques remplacements manuels",
        points: 2,
      },
      {
        id: "c",
        text: "Mélange de suggestions IA et de choix humains",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement choisis par l'humain avec assistance de dictionnaires/thésaurus",
        points: 4,
      },
      {
        id: "e",
        text: "Entièrement choisis par l'humain sans outils de suggestion",
        points: 5,
      },
    ],
  },
  {
    id: "q6",
    text: "Comment les exemples, métaphores ou illustrations ont-ils été créés ?",
    options: [
      {
        id: "a",
        text: "Entièrement générés par l'IA sans modification",
        points: 1,
      },
      {
        id: "b",
        text: "Générés par l'IA puis sélectionnés/modifiés",
        points: 2,
      },
      {
        id: "c",
        text: "Certains générés par IA, d'autres créés par l'humain",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement créés par l'humain avec inspiration d'outils",
        points: 4,
      },
      {
        id: "e",
        text: "Entièrement créés par l'humain sans assistance",
        points: 5,
      },
    ],
    notApplicable: true,
  },
  {
    id: "q7",
    text: "Comment la révision et l'édition du texte ont-elles été effectuées ?",
    options: [
      {
        id: "a",
        text: "Aucune révision ou révision entièrement automatique par l'IA",
        points: 1,
      },
      {
        id: "b",
        text: "Principalement révisé par des outils IA avec peu d'interventions manuelles",
        points: 2,
      },
      {
        id: "c",
        text: "Révision partagée entre outils IA et édition humaine",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement révisé manuellement avec l'aide de correcteurs standards",
        points: 4,
      },
      {
        id: "e",
        text: "Entièrement révisé manuellement sans outils automatiques",
        points: 5,
      },
    ],
  },
  {
    id: "q8",
    text: "Comment avez-vous géré la cohérence et la fluidité du texte ?",
    options: [
      {
        id: "a",
        text: "Entièrement gérées par l'IA sans intervention",
        points: 1,
      },
      {
        id: "b",
        text: "Générées par l'IA avec quelques ajustements manuels",
        points: 2,
      },
      {
        id: "c",
        text: "Améliorées par des outils IA mais avec intervention humaine substantielle",
        points: 3,
      },
      {
        id: "d",
        text: "Principalement gérées manuellement avec assistance limitée d'outils",
        points: 4,
      },
      {
        id: "e",
        text: "Entièrement gérées manuellement sans outils de cohérence automatiques",
        points: 5,
      },
    ],
  },
  {
    id: "q9",
    text: "Quel pourcentage approximatif du texte final estimez-vous avoir été généré ou fortement influencé par l'IA ?",
    options: [
      { id: "a", text: "90-100%", points: 1 },
      { id: "b", text: "70-89%", points: 2 },
      { id: "c", text: "40-69%", points: 3 },
      { id: "d", text: "10-39%", points: 4 },
      { id: "e", text: "0-9%", points: 5 },
    ],
  },
  {
    id: "q10",
    text: "Quelle a été votre contribution principale au texte final ?",
    options: [
      {
        id: "a",
        text: "Principalement la formulation du prompt et la sélection du résultat",
        points: 1,
      },
      {
        id: "b",
        text: "Édition et raffinement d'un texte majoritairement généré par IA",
        points: 2,
      },
      {
        id: "c",
        text: "Combinaison significative d'éléments IA et de création originale",
        points: 3,
      },
      {
        id: "d",
        text: "Création principale avec assistance pour l'amélioration et la correction",
        points: 4,
      },
      {
        id: "e",
        text: "Rédaction, révision et finalisation entièrement humaines",
        points: 5,
      },
    ],
  },
];

// Weights for music questions
export const musicQuestionWeights: Record<string, number> = {
  q1: 1.5, // Création du matériau musical
  q9: 1.5, // Pourcentage de contenu influencé par l'IA
  q10: 1.2, // Intervention principale
};

// Weights for text questions
export const textQuestionWeights: Record<string, number> = {
  q4: 1.5, // Production du premier jet
  q9: 1.5, // Pourcentage de contenu influencé par l'IA
  q10: 1.2, // Contribution principale
};

// Algorithm to calculate the final category
export const calculateCategory = (
  answers: Record<string, number>,
  weights: Record<string, number>
): Category => {
  let totalPoints = 0;
  let totalWeight = 0;

  // Calculate weighted average
  Object.entries(answers).forEach(([questionId, points]) => {
    const weight = weights[questionId] || 1;
    totalPoints += points * weight;
    totalWeight += weight;
  });

  const score = totalPoints / totalWeight;

  // Determine category based on score ranges
  if (score >= 1 && score < 1.6) return 1;
  if (score >= 1.6 && score < 2.6) return 2;
  if (score >= 2.6 && score < 3.6) return 3;
  if (score >= 3.6 && score < 4.6) return 4;
  if (score >= 4.6 && score <= 5) return 5;

  return null;
};
