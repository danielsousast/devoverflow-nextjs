"use client"

import React from "react"

interface ThemeContextInterface {
    themeMode: string,
    toggleTheme: () => void

}

const ThemeContext = React.createContext<ThemeContextInterface>({
    themeMode: "light",
    toggleTheme: () => {}
})

export const ThemeProvider = ({ children }:{children: React.ReactNode}) => {
    const [themeMode, setThemeMode] = React.useState("light")
    
    const toggleTheme = () => {
        const newTheme = themeMode === "light" ? "dark" : "light"
        setThemeMode(newTheme)
        document.documentElement.classList.add(newTheme)
    }
    
    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}