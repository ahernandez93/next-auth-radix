'use client';

import { Container, Card, Flex, Text, Link } from "@radix-ui/themes";
import SignUpForm from "@/components/auth/SignUpForm";
import NavLink from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function RegisterPage() {
    const { isDarkMode } = useTheme();
    
    return (
        <>
            <Container size="1" height="100%" className="p-3 md:p-0">
                <Flex className="h-screen w-full items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <Card className={`w-full p-7 shadow-lg transition-colors duration-300 ${
                            isDarkMode
                                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
                                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'
                        }`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <Flex direction="column" align="center" className="mb-4">
                                    <Image
                                        src="/next.svg"
                                        alt="Logo"
                                        width={80}
                                        height={40}
                                        className="mb-2"
                                    />
                                    <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Create your account
                                    </Text>
                                </Flex>
                            </motion.div>
                            
                            <SignUpForm />
                            
                            <Flex justify="between" my="4">
                                <Text>
                                    Already have an account?
                                </Text>
                                <Link asChild className="hover:underline">
                                    <NavLink href={"/auth/login"} passHref>
                                        Sign In
                                    </NavLink>
                                </Link>
                            </Flex>
                        </Card>
                    </motion.div>
                </Flex>
            </Container>
        </>
    )
}
