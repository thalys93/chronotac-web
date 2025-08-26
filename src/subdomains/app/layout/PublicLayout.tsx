import OptionsMenu from '@/components/OptionsMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import React, { ReactNode } from 'react';

function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4 relative overflow-hidden">            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />                        
            <OptionsMenu/>
            
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}

export default PublicLayout;