import { Container, Card, Heading, Flex, Text, Link } from "@radix-ui/themes";
import SignInForm from "@/components/auth/SignInForm";


export default function LoginPage() {
    return (
        <>
            <Container size="1" height="100%" className="p-3 md:p-0" >
                <Flex className="h-screen w-full items-center">
                    <Card className="w-full p-7">
                        <Heading>Sign In</Heading>
                        {/* <p>Please enter your credentials to log in.</p> */}
                        <SignInForm />
                        <Flex justify="between" my="4">
                            <Text>
                                Don't have an account?
                            </Text>
                            <Link href={"/auth/register"} className="ml-2">
                                Sign Up
                            </Link>
                        </Flex>
                    </Card>
                </Flex>
            </Container>
        </>
    )
}
