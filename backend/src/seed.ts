import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { ClientsService } from './clients/clients.service';
import { ProjectsService } from './projects/projects.service';
import { UserRole } from './users/schemas/user.schema';
import { ProjectStatus } from './projects/schemas/project.schema';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const usersService = app.get(UsersService);
    const clientsService = app.get(ClientsService);
    const projectsService = app.get(ProjectsService);

    console.log('🌱 Seeding database...');

    try {
        // Create Admin User
        const admin = await usersService.create({
            username: 'admin',
            password: 'admin123',
            email: 'admin@dashboard.com',
            role: UserRole.ADMIN,
        });
        console.log('✅ Created admin user');

        // Create Clients
        const client1 = await clientsService.create({
            name: 'Acme Corporation',
            email: 'contact@acme.com',
            notes: 'Large enterprise client with multiple ongoing projects',
        });

        const client2 = await clientsService.create({
            name: 'TechStart Inc',
            email: 'hello@techstart.io',
            notes: 'Startup focused on AI solutions',
        });

        const client3 = await clientsService.create({
            name: 'Global Solutions Ltd',
            email: 'info@globalsolutions.com',
            notes: 'International consulting firm',
        });

        console.log('✅ Created 3 clients');

        // Create Client Users
        const clientUser1 = await usersService.create({
            username: 'acme_user',
            password: 'client123',
            email: 'user@acme.com',
            role: UserRole.CLIENT,
            clientId: String(client1._id),
        });

        const clientUser2 = await usersService.create({
            username: 'techstart_user',
            password: 'client123',
            email: 'user@techstart.io',
            role: UserRole.CLIENT,
            clientId: String(client2._id),
        });

        console.log('✅ Created 2 client users');

        // Create Projects
        const projects = [
            {
                title: 'Website Redesign',
                clientId: String(client1._id),
                status: ProjectStatus.IN_PROGRESS,
                description: 'Complete overhaul of corporate website with modern design',
            },
            {
                title: 'Mobile App Development',
                clientId: String(client1._id),
                status: ProjectStatus.PLANNING,
                description: 'iOS and Android app for customer engagement',
            },
            {
                title: 'Cloud Migration',
                clientId: String(client1._id),
                status: ProjectStatus.COMPLETED,
                description: 'Migrate on-premise infrastructure to AWS',
            },
            {
                title: 'AI Chatbot Integration',
                clientId: String(client2._id),
                status: ProjectStatus.IN_PROGRESS,
                description: 'Implement GPT-powered customer support chatbot',
            },
            {
                title: 'Data Analytics Platform',
                clientId: String(client2._id),
                status: ProjectStatus.BLOCKED,
                description: 'Build real-time analytics dashboard - waiting for API access',
            },
            {
                title: 'Security Audit',
                clientId: String(client3._id),
                status: ProjectStatus.COMPLETED,
                description: 'Comprehensive security assessment and penetration testing',
            },
            {
                title: 'CRM Implementation',
                clientId: String(client3._id),
                status: ProjectStatus.PLANNING,
                description: 'Deploy and customize Salesforce CRM',
            },
            {
                title: 'E-commerce Platform',
                clientId: String(client3._id),
                status: ProjectStatus.IN_PROGRESS,
                description: 'Build custom e-commerce solution with payment integration',
            },
        ];

        for (const project of projects) {
            await projectsService.create(project);
        }

        console.log('✅ Created 8 projects');

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📝 Login Credentials:');
        console.log('   Admin: admin / admin123');
        console.log('   Client 1: acme_user / client123');
        console.log('   Client 2: techstart_user / client123');

    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
    }

    await app.close();
}

bootstrap();
