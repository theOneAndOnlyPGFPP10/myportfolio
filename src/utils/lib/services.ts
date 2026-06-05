import { CodeXml, BrainCircuit, Wallpaper, LucideIcon, Cpu } from 'lucide-react';
import { env } from './env';
import { StaticImageData } from 'next/image';

export type ImageProps = {
  src: string | StaticImageData;
  alt: string;
};

export const my_images: ImageProps[] = [
  { src: `/images/profile_img/me_eye_closed.png`, alt: `Smiling author with closed eye` },
  { src: `/images/profile_img/me_one_finger.png`, alt: `Author with one finger up` },
  { src: `/images/profile_img/me_smiling.png`, alt: `Smiling author` },
  { src: `/images/profile_img/me_thinking.png`, alt: `Wondering author` },
  { src: `/images/profile_img/me_thinking2.png`, alt: `More emotionaly Wondering author than usual` },
];

export type AuthorsMessageProps = {
  text: string;
  img: ImageProps;
  alt?: string;
  messageType?: string;
};

export const authorsMessages: AuthorsMessageProps[] = [
  {
    text: `Hi!I'm ${env.AUTHORS_NAME}</br>Designer × Developer × Mechatronics Engineer — 99% focus, 1% chaos.`,
    img: my_images[2],
  },
  {
    text: `I create modern, functional, and thoughtful digital solutions.`,
    img: my_images[4],
  },
  {
    text: `Feel free to look around and get inspired to level up your skills but first let's focus on the main subject which is... `,
    img: my_images[0],
  },
];

export type ServiceCategory = 'design' | 'web' | 'ai' | 'IoT';

export type ServiceGroup = {
  serviceCategory: ServiceCategory;
  services: readonly string[];
  description?: string;
  color: string;
  icon: LucideIcon;
};

export const services: readonly ServiceGroup[] = [
  {
    serviceCategory: 'design',
    services: [
      'art-direction',
      'ux-ui-design',
      'motion-design',
      // 'design-system',
      'content-strategy',
      'usability-testing',
    ],
    description: 'Creating cohesive interfaces, animations and visual strategy.',
    color: 'var(--color-third)',
    icon: Wallpaper,
  },
  {
    serviceCategory: 'web',
    services: [
      'full-stack-development',
      'custom-wordpress-website',
      // 'custom-shopify-e-commerce',
      'creative-web-development',
      'gamification',
      'seo',
    ],
    description: 'Building modern web applications from frontend to backend.',
    color: 'var(--color-fourth)',
    icon: CodeXml,
  },
  {
    serviceCategory: 'ai',
    services: [
      'ai-chatbot-development',
      'llm-integration',
      // 'computer-vision',
      'ml-model-training',
      'ai-automation',
      'natural-language-processing',
    ],
    description: 'Integrating language models and automating processes with AI.',
    color: 'var(--color-sixth)',
    icon: BrainCircuit,
  },
  {
    serviceCategory: 'IoT',
    services: ['smart-home-systems', 'iot-device-firmware', 'rtos-development', 'sensor-integration', 'embedded-linux'],
    description: 'Programming microcontrollers, real-time systems and IoT devices.',
    color: 'var(--color-fifth)',
    icon: Cpu,
  },
];
