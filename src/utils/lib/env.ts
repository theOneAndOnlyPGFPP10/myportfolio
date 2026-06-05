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
  NEXT_PUBLIC_STRAPI_URL: z.string().min(1).default('http://localhost:1337'),
  STRAPI_API_TOKEN: z
    .string()
    .min(1)
    .default(
      'd99b8214dd24e8cc82fb7600621b67a349edbfcfd31a1d4f08ec4b5599ec97c9f02f7c8efc328c01025c73fd2eb899ab7496113f624812fd3c328f5c1ae2e2025b0d7dbf4968aef5ff6dfa8c8ecf2a6b4661622b194af6ab32b7110f47c5a58b99a3f050acfc27c0ba0f8981fe1c9e1dd6181a74d3ad1c3247dde377e3afae73'
    ),
  AUTHORS_NAME: z.string().min(1).default('Johny'),
  AUTHORS_FULL_NAME: z.string().min(1).default('Paweł Polomski'),
  HERO_MOTTO: z
    .string()
    .min(1)
    .default('Ever wondered what happens when you hack your imagination to unlock the impossible?'),
});

// Teraz parse wypełni brakujące wartości defaultami
export const env = envSchema.parse(process.env);
