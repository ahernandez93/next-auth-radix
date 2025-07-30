import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
    const data = await request.json();
    const session = await getServerSession(authOption);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newProject = await prisma.project.create({
        data: {
            title: data.title,
            description: data.description,
            user: {
                connect: {
                    id: parseInt(session.user.id),
                },
            },
        },
    });
    return NextResponse.json(newProject, {
        status: 201,
    });
}
