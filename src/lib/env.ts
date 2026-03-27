import { z } from 'zod';

const envSchema = z.object({
  //   DATABASE_URL: z.string().url()
  //     .default('postgresql://postgres:postgres@localhost:5432/dev_db'),

  //   API_KEY: z.string()
  //     .default('sk_test_1234567890abcdef'),

  //   NEXT_PUBLIC_API_URL: z.string().url()
  //     .default('http://localhost:3000'),

  //   JWT_SECRET: z.string().min(32)
  //     .default('dev-secret-key-minimum-32-characters-long'),

  //   NODE_ENV: z.enum(['development', 'production', 'test'])
  //     .default('development'),
  AUTHORS_NAME: z.string().min(1).default('Johny'),
  AUTHORS_FULL_NAME: z.string().min(1).default('Paweł Polomski'),
  HERO_MOTTO: z
    .string()
    .min(1)
    .default('Ever wondered what happens when you hack your imagination to unlock the impossible?'),
});

// Teraz parse wypełni brakujące wartości defaultami
export const env = envSchema.parse(process.env);
