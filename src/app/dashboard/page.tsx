import { Container } from '@radix-ui/themes'
import HeaderDashboard from '@/components/dashboard/HeaderDashboard'
import { prisma } from '@/libs/prisma'
import { authOption } from '@/libs/authOptions'
import { getServerSession } from 'next-auth/next'
import ProjectCard from '@/components/projects/ProjectCard'

const loadProjects = async () => {
    const session = await getServerSession(authOption);
    if (!session) {
        throw new Error('Unauthorized');
    }
    return await prisma.project.findMany({
        where: {
            userId: parseInt(session.user.id),
        },
    });
}

export default async function DashboardPage() {
    const projects = await loadProjects();

    return (
        <Container className="mt-10 px-10 md:px-0">
            <HeaderDashboard />
            <div className="grid md:grid-cols-3 gap-4 mt-10">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </Container>
    )
}
