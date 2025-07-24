import { Container, Card, Heading, Flex, Text, Link } from "@radix-ui/themes";
import SignInForm from "@/components/auth/SignInForm";
import NavLink from "next/link";


export default function LoginPage() {
    return (
        <>
            <Container size="1" height="100%" className="p-3 md:p-0" >
                <Flex className="h-screen w-full items-center">
                    <Card className="w-full p-7">
                        <Heading>Sign In</Heading>
                        <SignInForm />
                        <Flex justify="between" my="4">
                            <Text>
                                Don't have an account?
                            </Text>
                            <Link asChild>
                                <NavLink href={"/auth/register"} passHref>
                                    Sign Up
                                </NavLink>
                            </Link>
                        </Flex>
                    </Card>
                </Flex>
            </Container>
        </>
    )
}
