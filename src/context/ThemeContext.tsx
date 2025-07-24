'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check user preference on client side
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            localStorage.setItem('theme', newValue ? 'dark' : 'light');

            if (newValue) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            return newValue;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);