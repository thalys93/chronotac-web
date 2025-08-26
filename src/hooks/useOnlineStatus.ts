import { useState, useEffect } from 'react';

type ConnectionStatus = 'online' | 'slow' | 'offline';

export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('online');
    const [wasOffline, setWasOffline] = useState(false);

    const testConnectionSpeed = async (): Promise<boolean> => {
        if (!navigator.onLine) return false;
        
        try {
            const startTime = Date.now();
            const response = await fetch('/favicon.ico?t=' + Date.now(), {
                method: 'HEAD',
                cache: 'no-cache'
            });
            const endTime = Date.now();
            const duration = endTime - startTime;

            return duration < 2000;
        } catch {
            return false;
        }
    };

    const checkConnectionStatus = async () => {
        if (!navigator.onLine) {
            setConnectionStatus('offline');
            return;
        }

        const isFast = await testConnectionSpeed();
        setConnectionStatus(isFast ? 'online' : 'slow');
    };

    useEffect(() => {
        const handleOnline = async () => {
            setIsOnline(true);
            await checkConnectionStatus();
            
            if (wasOffline) {                
                if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
                    navigator.serviceWorker.ready.then((registration) => {
                        return (registration as any).sync.register('background-sync');
                    });
                }
                setWasOffline(false);
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
            setConnectionStatus('offline');
            setWasOffline(true);
        };
        
        checkConnectionStatus();
        
        const speedTestInterval = setInterval(checkConnectionStatus, 30000);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(speedTestInterval);
        };
    }, [wasOffline]);

    return { isOnline, connectionStatus, wasOffline };
}