'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BellRing, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function SettingsPage() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  
  const [userData, setUserData] = useState<any>(null);
  const [earthquakeNotif, setEarthquakeNotif] = useState(false);
  const [weatherAlertNotif, setWeatherAlertNotif] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!userDocRef) {
        setIsLoading(false);
        return;
      }
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setEarthquakeNotif(data.earthquakeNotif ?? false);
          setWeatherAlertNotif(data.weatherAlertNotif ?? true);
        } else {
          // If the doc doesn't exist, we might be creating it for the first time
          // Set initial state for a new user document
          const newUserScaffold = {
            id: user?.uid,
            clerkId: '', // You might need to populate this if using Clerk
            createdAt: serverTimestamp(), // Will be set on the server
          };
          setUserData(newUserScaffold);
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
        toast({
          variant: "destructive",
          title: "Gagal memuat pengaturan",
          description: "Terjadi kesalahan saat mengambil data pengaturan Anda.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!isUserLoading && user) {
        fetchSettings();
    }
  }, [user, userDocRef, toast, isUserLoading]);


  const handleSaveChanges = async () => {
    if (!userDocRef || !userData) return;
    setIsSaving(true);
    
    const settingsData = { 
      ...userData, // Include existing user data
      earthquakeNotif, 
      weatherAlertNotif,
      updatedAt: serverTimestamp()
    };

    setDoc(userDocRef, settingsData, { merge: true })
      .then(() => {
        toast({
          title: "Pengaturan Disimpan",
          description: "Preferensi notifikasi Anda telah diperbarui.",
        });
      })
      .catch((error) => {
        const contextualError = new FirestorePermissionError({
            path: userDocRef.path,
            operation: 'update',
            requestResourceData: settingsData
        });
        errorEmitter.emit('permission-error', contextualError);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div className="space-y-1">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
        <Skeleton className="h-10 w-36" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola preferensi notifikasi dan akun Anda.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Notifikasi Push</CardTitle>
          <CardDescription>Dapatkan notifikasi real-time untuk gempa bumi dan peringatan cuaca penting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-start gap-4">
                    <BellRing className="h-6 w-6 text-primary mt-1"/>
                    <div className="space-y-0.5">
                        <Label htmlFor="earthquake-notif" className="text-base font-medium">Notifikasi Gempa Bumi</Label>
                        <p className="text-sm text-muted-foreground">
                            Terima notifikasi untuk gempa dengan magnitudo di atas 5.0.
                        </p>
                    </div>
                </div>
                <Switch 
                  id="earthquake-notif" 
                  aria-label="Notifikasi Gempa Bumi"
                  checked={earthquakeNotif}
                  onCheckedChange={setEarthquakeNotif}
                  disabled={isSaving}
                />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-start gap-4">
                    <BellRing className="h-6 w-6 text-accent mt-1"/>
                    <div className="space-y-0.5">
                        <Label htmlFor="weather-alert-notif" className="text-base font-medium">Notifikasi Peringatan Cuaca</Label>
                        <p className="text-sm text-muted-foreground">
                            Terima notifikasi untuk peringatan dini cuaca di lokasi Anda.
                        </p>
                    </div>
                </div>
                <Switch 
                  id="weather-alert-notif" 
                  aria-label="Notifikasi Peringatan Cuaca"
                  checked={weatherAlertNotif}
                  onCheckedChange={setWeatherAlertNotif}
                  disabled={isSaving}
                />
            </div>
        </CardContent>
      </Card>
      <div className="flex justify-start">
        <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </div>
  );
}
