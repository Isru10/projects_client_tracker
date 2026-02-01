"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const clients_service_1 = require("./clients/clients.service");
const projects_service_1 = require("./projects/projects.service");
const user_schema_1 = require("./users/schemas/user.schema");
const project_schema_1 = require("./projects/schemas/project.schema");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const clientsService = app.get(clients_service_1.ClientsService);
    const projectsService = app.get(projects_service_1.ProjectsService);
    console.log('🌱 Seeding database...');
    try {
        const admin = await usersService.create({
            username: 'admin',
            password: 'admin123',
            email: 'admin@dashboard.com',
            role: user_schema_1.UserRole.ADMIN,
        });
        console.log('✅ Created admin user');
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
        const clientUser1 = await usersService.create({
            username: 'acme_user',
            password: 'client123',
            email: 'user@acme.com',
            role: user_schema_1.UserRole.CLIENT,
            clientId: String(client1._id),
        });
        const clientUser2 = await usersService.create({
            username: 'techstart_user',
            password: 'client123',
            email: 'user@techstart.io',
            role: user_schema_1.UserRole.CLIENT,
            clientId: String(client2._id),
        });
        console.log('✅ Created 2 client users');
        const projects = [
            {
                title: 'Website Redesign',
                clientId: String(client1._id),
                status: project_schema_1.ProjectStatus.IN_PROGRESS,
                description: 'Complete overhaul of corporate website with modern design',
            },
            {
                title: 'Mobile App Development',
                clientId: String(client1._id),
                status: project_schema_1.ProjectStatus.PLANNING,
                description: 'iOS and Android app for customer engagement',
            },
            {
                title: 'Cloud Migration',
                clientId: String(client1._id),
                status: project_schema_1.ProjectStatus.COMPLETED,
                description: 'Migrate on-premise infrastructure to AWS',
            },
            {
                title: 'AI Chatbot Integration',
                clientId: String(client2._id),
                status: project_schema_1.ProjectStatus.IN_PROGRESS,
                description: 'Implement GPT-powered customer support chatbot',
            },
            {
                title: 'Data Analytics Platform',
                clientId: String(client2._id),
                status: project_schema_1.ProjectStatus.BLOCKED,
                description: 'Build real-time analytics dashboard - waiting for API access',
            },
            {
                title: 'Security Audit',
                clientId: String(client3._id),
                status: project_schema_1.ProjectStatus.COMPLETED,
                description: 'Comprehensive security assessment and penetration testing',
            },
            {
                title: 'CRM Implementation',
                clientId: String(client3._id),
                status: project_schema_1.ProjectStatus.PLANNING,
                description: 'Deploy and customize Salesforce CRM',
            },
            {
                title: 'E-commerce Platform',
                clientId: String(client3._id),
                status: project_schema_1.ProjectStatus.IN_PROGRESS,
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
    }
    catch (error) {
        console.error('❌ Error seeding database:', error.message);
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map