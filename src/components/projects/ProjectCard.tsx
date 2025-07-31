'use client';
import { Card, Heading, Text } from '@radix-ui/themes'
import { Project } from '@prisma/client'
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
    project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter();
    return (
        <Card key={project.id} className="hover:cursor-pointer hover:opacity-90">
            <Heading onClick={() => router.push(`/dashboard/projects/${project.id}`)}>{project.title}</Heading>
            <Text className="text-slate-500">{project.description}</Text>
        </Card>
    )
}
