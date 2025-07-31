'use client';
import { Container, TextField, TextArea, Flex, Button, Card, Heading } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { TrashIcon } from '@radix-ui/react-icons';

export default function NewTaskPage() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    });
    const router = useRouter();
    const params = useParams();

    const onSubmit = handleSubmit(async data => {
        if (!params.id) {
            const res = await axios.post('/api/projects', data);
            if (res.status === 201) {
                router.push('/dashboard');
                router.refresh();
            }
        } else {
            const res = await axios.put(`/api/projects/${params.id}`, data);
            if (res.status === 200) {
                router.push('/dashboard');
                router.refresh();
            }
        }
    });

    return (
        <Container size="2" height="100%" className="p-3 md:p-0">
            <Flex className="h-screen w-full items-center">
                <Card className="w-full p-7">
                    <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
                        <Heading>{params.id ? 'Edit Project' : 'New Project'}</Heading>
                        <label htmlFor="title">Project Title</label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField.Root size="3" placeholder="Title" {...field} />
                            )}
                        />
                        <label htmlFor="description">Project Description</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextArea size="3" placeholder="Description" {...field} />
                            )}
                        />
                        <Button type="submit">{params.id ? 'Edit Project' : 'Create Project'}</Button>
                    </form>
                    <div className="flex justify-end my-4">
                        {params.id && (
                            <Button color="red" onClick={() => router.push('/dashboard')}>
                                <TrashIcon />
                                Delete Project
                            </Button>
                        )}
                    </div>
                </Card>
            </Flex>
        </Container>
    )
}