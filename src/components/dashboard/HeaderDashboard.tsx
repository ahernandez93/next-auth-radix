'use client';
import { Heading, Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';

export default function HeaderDashboard() {
    const router = useRouter();

    return (
        <div className="flex justify-between items-center">
            <Heading>Projects</Heading>
            <Button onClick={() => router.push('dashboard/projects/new')}>Add Project</Button>
        </div>
    )
}
