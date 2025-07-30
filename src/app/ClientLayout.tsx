'use client';

import { ReactNode, useEffect } from "react";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="fixed top-4 right-4 z-50">
            <Button variant="ghost" onClick={toggleTheme}>
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
        </div>
    );
}

function ClientLayoutContent({
    children,
    fonts
}: {
    children: ReactNode;
    fonts: {
        geistSans: { variable: string };
        geistMono: { variable: string };
    }
}) {
    const { isDarkMode } = useTheme();

    // Apply dark mode class to html element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <Theme appearance={isDarkMode ? "dark" : "light"}>
            <ThemeToggle />
            <Navbar />
            {children}
        </Theme>
    );
}

export default function ClientLayout({
    children,
    fonts
}: {
    children: ReactNode;
    fonts: {
        geistSans: { variable: string };
        geistMono: { variable: string };
    }
}) {
    return (
        <ThemeProvider>
            <SessionProvider>
                <ClientLayoutContent fonts={fonts}>{children}</ClientLayoutContent>
            </SessionProvider>
        </ThemeProvider>
    );
}