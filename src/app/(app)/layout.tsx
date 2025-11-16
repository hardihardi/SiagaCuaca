'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { AppLayout } from "@/components/app-layout";
import { Skeleton } from '@/components/ui/skeleton';
import { Cloud } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
            <Cloud className="h-12 w-12 text-primary animate-pulse" />
            <p className="text-muted-foreground">Memuat sesi Anda...</p>
        </div>
      </div>
    );
  }

  return <AppLayout>{children}</AppLayout>;
}
