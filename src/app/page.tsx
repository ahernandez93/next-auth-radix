import { Container } from "@radix-ui/themes"
import { Metadata } from "next"
import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOption } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: 'NextAuth Radix',
  description: 'NextAuth Radix',
}

export default async function HomePage() {

  const session = await getServerSession(authOption);

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <Container className="flex items-center justify-center px-5 md:px-0">
      <header className="my-4 bg-slate-900 p-10 rounded-md">
        <h1 className="text-7xl font-bold my-10">NextAuth Radix</h1>
        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint voluptas numquam tenetur, nobis fugit architecto dolore dolor molestias velit illo illum ab sapiente sequi sunt esse quo officia voluptate atque.</p>
        <div className="flex gap-3 mt-5">
          <Link
            href="/auth/login"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Register
          </Link>
        </div>
      </header>
    </Container>
  )
}
