// prisma/seed.ts
import { prisma } from '../src/lib/db';

async function main() {
  console.log('🌱 Starting database seed...');

  // Create or update default system admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@vedasetu.com' },
    update: {},
    create: {
      email: 'admin@vedasetu.com',
      name: 'VedaSetu Admin',
      role: 'ADMIN',
    },
  });

  console.log(`✅ Default admin created: ${adminUser.email} (ID: ${adminUser.id})`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });