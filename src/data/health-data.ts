export interface HealthImpact {
  id: string;
  title: string;
  icon: string;
  stat: string;
  statLabel: string;
  description: string;
  atRisk: string[];
  aqiTrigger: string;
  severity: "moderate" | "high" | "critical";
}

export const healthImpacts: HealthImpact[] = [
  {
    id: "respiratory",
    title: "Respiratory Disease",
    icon: "Wind",
    stat: "40%",
    statLabel: "of Delhi residents have lung function below normal",
    description:
      "Prolonged exposure to PM2.5 causes permanent lung damage - scarring airways, reducing capacity, and accelerating conditions like asthma, COPD, and bronchitis.",
    atRisk: ["Children", "Elderly", "Outdoor workers", "Athletes"],
    aqiTrigger: "Begins at AQI 100+. Critical above 300.",
    severity: "critical",
  },
  {
    id: "cardiovascular",
    title: "Heart & Blood Vessels",
    icon: "HeartPulse",
    stat: "1 in 4",
    statLabel: "cardiac deaths in India linked to air pollution annually",
    description:
      "Ultra-fine PM2.5 particles enter the bloodstream directly through lung tissue, causing arterial inflammation, blood clotting, and accelerated atherosclerosis.",
    atRisk: ["Adults 40+", "Existing heart patients", "Diabetics"],
    aqiTrigger: "Risk begins at AQI 150+. Emergency level above 400.",
    severity: "critical",
  },
  {
    id: "neurological",
    title: "Brain & Cognition",
    icon: "Brain",
    stat: "23%",
    statLabel: "higher dementia risk in high-AQI urban zones",
    description:
      "Long-term PM2.5 exposure crosses the blood-brain barrier, causing neuroinflammation linked to accelerated cognitive decline, IQ loss in children, and dementia.",
    atRisk: ["Children under 12", "Students", "Elderly 65+"],
    aqiTrigger: "Cumulative damage from AQI 150+ over months.",
    severity: "high",
  },
  {
    id: "pregnancy",
    title: "Pregnancy & Fetal Health",
    icon: "Baby",
    stat: "18%",
    statLabel: "higher premature birth risk in high-pollution zones",
    description:
      "Toxic air during pregnancy is linked to low birth weight, premature delivery, and impaired fetal brain development - with lifelong consequences for the child.",
    atRisk: ["Pregnant women", "Couples planning families", "Newborns"],
    aqiTrigger: "All stages of pregnancy affected from AQI 100+.",
    severity: "critical",
  },
  {
    id: "children",
    title: "Children's Development",
    icon: "User",
    stat: "50%",
    statLabel: "more air inhaled per body weight vs adults",
    description:
      "Children breathe faster and spend more time outdoors. PM2.5 exposure stunts lung development permanently - lungs damaged before age 18 never fully recover.",
    atRisk: ["Ages 0-12", "School children", "Children near busy roads"],
    aqiTrigger: "Every AQI level above 50 affects children.",
    severity: "critical",
  },
  {
    id: "eyes",
    title: "Eyes, Skin & Allergies",
    icon: "Eye",
    stat: "3×",
    statLabel: "higher rate of allergic conjunctivitis in polluted cities",
    description:
      "Ozone and NO₂ cause direct corneal damage, skin aging from oxidative stress, and trigger allergic responses - making outdoor exposure physically painful.",
    atRisk: ["Cyclists", "Outdoor workers", "Contact lens wearers"],
    aqiTrigger: "Ozone effects from AQI 150+. Skin damage cumulative.",
    severity: "moderate",
  },
];

export const healthStats = [
  {
    value: 1.6,
    suffix: "M",
    label: "Deaths Per Year",
    sublabel: "linked to air pollution in India",
    color: "#C0392B",
  },
  {
    value: 7,
    suffix: " YRS",
    label: "Life Expectancy Lost",
    sublabel: "in severely polluted Indian cities",
    color: "#FF6B35",
  },
  {
    value: 40,
    suffix: "%",
    label: "Rise in Lung Cancer",
    sublabel: "over the last two decades",
    color: "#F39C12",
  },
  {
    value: 680,
    suffix: "M",
    label: "People in High-AQI Zones",
    sublabel: "exposed daily to dangerous air",
    color: "#58A6FF",
  },
];
