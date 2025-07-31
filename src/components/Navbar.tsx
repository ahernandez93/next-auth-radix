import { Container, Heading, Link, Flex, DropdownMenu, Button } from "@radix-ui/themes";
import NextLink from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/app/ClientLayout";

export default function Navbar() {
    const { data: session } = useSession();
    return (
        <nav className="bg-zinc-950 py-4 px-10 md:px-0">
            <Container>
                <Flex justify="between" align="center" wrap="wrap" gap="4">
                    <NextLink href="/" passHref>
                        <Heading size="4" className="text-center text-white">
                            RadixNext
                        </Heading>
                    </NextLink>

                    <Flex align="center" className="ml-auto gap-4">
                        <ul className="flex gap-x-2 items-center m-0 p-0">
                            {!session ? (
                                <>
                                    <li>
                                        <Link asChild>
                                            <NextLink href="/auth/login" passHref>
                                                Login
                                            </NextLink>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link asChild>
                                            <NextLink href="/auth/register" passHref>
                                                Register
                                            </NextLink>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link asChild>
                                            <NextLink href="/dashboard" passHref>
                                                Dashboard
                                            </NextLink>
                                        </Link>
                                    </li>
                                    <li>
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger>
                                                <Button variant="soft">
                                                    {session?.user?.name}
                                                    <DropdownMenu.TriggerIcon />
                                                </Button>
                                            </DropdownMenu.Trigger>
                                            <DropdownMenu.Content>
                                                <DropdownMenu.Item>My Profile</DropdownMenu.Item>
                                                <DropdownMenu.Item>Settings</DropdownMenu.Item>
                                                <DropdownMenu.Separator />
                                                <DropdownMenu.Item color="red" onClick={() => signOut()}>
                                                    Logout
                                                </DropdownMenu.Item>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Root>
                                    </li>
                                </>
                            )}

                        </ul>
                        <div className="flex-shrink-0">
                            <ThemeToggle />
                        </div>
                    </Flex>
                </Flex>
            </Container>
        </nav>
    )
}
