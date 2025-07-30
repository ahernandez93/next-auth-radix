'use client';
import { Container, Heading, Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    return (
        <Container className="mt-10">
            <div className="flex justify-between">
                <Heading>Task</Heading>
                <Button onClick={() => router.push('dashboard/task/new')}>Add Task</Button>
            </div>
        </Container>
    )
}
