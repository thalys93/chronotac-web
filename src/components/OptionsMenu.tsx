import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Menu, Sun, Moon, ExternalLink, User, Palette } from 'lucide-react';

function OptionsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handlePortfolioClick = () => {
        window.open('https://portifolio-luis-thalys.web.app/', '_blank');
    };

    if (!mounted) {
        return null;
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 hover:border-primary/70 group rounded-full"
                >
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-90" />
                    <span className="sr-only">Abrir menu de opções</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56 bg-background/95 backdrop-blur-sm border-border/50 shadow-xl animate-in slide-in-from-top-2 duration-300"
                sideOffset={8}
            >
                <DropdownMenuLabel className="text-sm font-medium text-muted-foreground px-3 py-2 select-none">
                    Opções
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-border/50" />

                <DropdownMenuItem
                    onClick={handleThemeToggle}
                    className="px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors duration-200 group"
                    onSelect={(e) => e.preventDefault()}
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <Palette className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                            <span className="text-sm font-medium">Tema</span>
                        </div>
                        <div className="relative overflow-hidden w-4 h-4">
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground group-hover:text-accent-foreground" />
                            <Moon className="absolute top-0 left-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground group-hover:text-accent-foreground" />
                        </div>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem
                    onClick={handlePortfolioClick}
                    className="px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors duration-200 group"
                    onSelect={(e) => e.preventDefault()}
                >
                    <div className="flex items-center gap-3 w-full">
                        <User className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                        <span className="text-sm font-medium">Portfólio</span>
                        <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground group-hover:text-accent-foreground transition-all duration-200 group-hover:translate-x-0.5" />
                    </div>
                </DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default OptionsMenu;