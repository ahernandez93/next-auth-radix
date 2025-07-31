import { Container, Grid } from '@radix-ui/themes'
import HeaderDashboard from '@/components/dashboard/HeaderDashboard'
import { prisma } from '@/libs/prisma'
import { authOption } from '@/app/api/auth/[...nextauth]/route'
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
        <Container className="mt-10">
            <HeaderDashboard />
            <Grid columns="3" gap="3" className="mt-10">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </Grid>
        </Container>
    )
}
