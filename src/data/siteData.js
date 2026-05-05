import {
  AiIcon,
  CertificateIcon,
  ChipIcon,
  CodeIcon,
  GlobeIcon,
  MentorIcon,
  ProjectIcon,
  ShieldIcon,
  SparkIcon,
} from '../components/icons.jsx';

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Courses', href: '#courses' },
  { label: 'About', href: '#about' },
  { label: 'Advantages', href: '#advantages' },
  { label: 'Contact', href: '#contact' },
];

export const courses = [
  {
    title: 'Kiberxavfsizlik',
    tag: 'Ethical security',
    Icon: ShieldIcon,
    description:
      'Ethical hacking, network security, system protection, vulnerability analysis va incident response bo‘yicha qonuniy, amaliy ta’lim.',
  },
  {
    title: 'IoT — Internet of Things',
    tag: 'Connected systems',
    Icon: ChipIcon,
    description:
      'Smart devices, sensorlar, microcontrollerlar, avtomatlashtirish, smart home va industrial IoT loyihalarini yaratish.',
  },
  {
    title: 'Sun’iy intellekt',
    tag: 'AI engineering',
    Icon: AiIcon,
    description:
      'Machine learning, neural networks, data analysis, AI tools, automation va real hayotdagi AI loyihalar bilan ishlash.',
  },
];

export const advantages = [
  { title: 'Amaliy loyihalar', Icon: ProjectIcon },
  { title: 'Tajribali mentorlar', Icon: MentorIcon },
  { title: 'Zamonaviy texnologiyalar', Icon: SparkIcon },
  { title: 'Sertifikat', Icon: CertificateIcon },
  { title: 'Online va offline o‘qish imkoniyati', Icon: GlobeIcon },
  { title: 'Portfolio uchun real loyihalar', Icon: CodeIcon },
];

export const stats = [
  { value: '3', label: 'ta asosiy yo‘nalish' },
  { value: '20+', label: 'amaliy loyiha' },
  { value: '1000+', label: 'o‘quvchi' },
  { value: '24/7', label: 'qo‘llab-quvvatlash' },
];
