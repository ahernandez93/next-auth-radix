import { Container, Grid, Card, Heading, Text } from '@radix-ui/themes'
import HeaderDashboard from '@/components/dashboard/HeaderDashboard'
import { prisma } from '@/libs/prisma'

const loadProjects = async () => {
    return await prisma.project.findMany();
}

export default async function DashboardPage() {
    const projects = await loadProjects();
    console.log(projects);

    return (
        <Container className="mt-10">
            <HeaderDashboard />
            <Grid columns="3" gap="3">
                {projects.map(project => (
                    <Card key={project.id} className="hover:cursor-pointer hover:opacity-90">
                        <Heading>{project.title}</Heading>
                        <Text className="text-slate-500">{project.description}</Text>
                    </Card>
                ))}
            </Grid>
        </Container>
    )
}
