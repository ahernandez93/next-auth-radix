import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
    const session = await getServerSession(authOption);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        const project = await prisma.project.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(project, {
            status: 200,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ error: "Project not found" }, { status: 404 });
            }
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOption);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        const projectDeleted = await prisma.project.delete({
            where: {
                id: parseInt(id),
            },
        });
        return NextResponse.json(projectDeleted, {
            status: 200,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ error: "Project not found" }, { status: 404 });
            }
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOption);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();
    
    try {
        const projectUpdated = await prisma.project.update({
            where: {
                id: parseInt(id),
            },
            data,
        });
        return NextResponse.json(projectUpdated, {
            status: 200,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ error: "Project not found" }, { status: 404 });
            }
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
