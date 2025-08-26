import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import PublicLayout from "../../layout/PublicLayout";

const NotFoundPage = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <PublicLayout>
            <div className="w-full max-w-lg mx-auto space-y-6 sm:space-y-8 animate-fade-in text-center">
                {/* 404 Number */}
                <div className="space-y-4">
                    <h1 className="text-8xl sm:text-9xl md:text-[10rem] font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 tracking-tight leading-none">
                        404
                    </h1>
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                            Página não encontrada
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                            Oops! A página que você está procurando não existe ou foi movida.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
                    <Button
                        onClick={() => window.history.back()}
                        variant="outline"
                        className="w-full sm:w-auto group transition-all duration-300 hover:scale-105"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Voltar
                    </Button>
                    <Button
                        onClick={() => window.location.href = '/'}
                        className="w-full sm:w-auto group transition-all duration-300 hover:scale-105 bg-gradient-primary hover:opacity-90"
                    >
                        <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                        Página Inicial
                    </Button>
                </div>

                {/* Additional Info */}
                <div className="pt-8 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                        Rota acessada: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
                    </p>
                </div>
            </div>
        </PublicLayout>
    );
};

export default NotFoundPage;