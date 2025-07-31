'use client';
import { Container, TextField, TextArea, Flex, Button, Card, Heading } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { TrashIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function NewTaskPage() {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    });

    const router = useRouter();
    const params = useParams() as { id: string };

    const onSubmit = handleSubmit(async data => {
        if (!params.id) {
            const res = await axios.post('/api/projects', data);
            if (res.status === 201) {
                toast.success('Project created successfully');
            }
            router.push('/dashboard');
            router.refresh();
        } else {
            const res = await axios.put(`/api/projects/${params.id}`, data);
            if (res.status === 200) {
                toast.success('Project updated successfully');
            }
            router.push('/dashboard');
            router.refresh();
        }
    });

    const handleDelete = async (projectid: string) => {
        const res = await axios.delete(`/api/projects/${projectid}`);
        if (res.status === 200) {
            toast.success('Project deleted successfully');
        }
        router.push('/dashboard');
        router.refresh();
    }

    useEffect(() => {
        if (params.id) {
            axios.get(`/api/projects/${params.id}`).then(res => {
                setValue('title', res.data.title);
                setValue('description', res.data.description);
            });
        }
    }, [params.id, setValue]);

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
                            <Button color="red" onClick={() => handleDelete(params.id)}>
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