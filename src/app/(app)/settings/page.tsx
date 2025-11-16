
'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useMemoFirebase, useAuth } from '@/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BellRing, Loader2, User, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { FirebaseError } from 'firebase/app';

export default function SettingsPage() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  
  // User Profile State
  const [displayName, setDisplayName] = useState('');
  
  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification State
  const [userData, setUserData] = useState<any>(null);
  const [earthquakeNotif, setEarthquakeNotif] = useState(false);
  const [weatherAlertNotif, setWeatherAlertNotif] = useState(true);

  // General State
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const isPasswordUser = user?.providerData.some(p => p.providerId === 'password');

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;
      
      setDisplayName(user.displayName || '');

      if (userDocRef) {
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setEarthquakeNotif(data.earthquakeNotif ?? false);
            setWeatherAlertNotif(data.weatherAlertNotif ?? true);
          } else {
            const newUserScaffold = {
              id: user?.uid,
              createdAt: serverTimestamp(),
              earthquakeNotif: false,
              weatherAlertNotif: true,
            };
            setUserData(newUserScaffold);
          }
        } catch (error) {
          console.error("Error fetching user settings:", error);
          toast({
            variant: "destructive",
            title: "Gagal memuat pengaturan notifikasi",
            description: "Terjadi kesalahan saat mengambil data notifikasi Anda.",
          });
        }
      }
      setIsLoading(false);
    };

    if (!isUserLoading) {
        fetchSettings();
    }
  }, [user, userDocRef, toast, isUserLoading]);

  const handleProfileSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await updateProfile(user, { displayName });
      toast({
        title: "Profil Disimpan",
        description: "Nama tampilan Anda telah diperbarui.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Gagal Menyimpan Profil",
        description: "Terjadi kesalahan saat memperbarui profil Anda.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!user || !user.email) return;
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Tidak Cocok",
        description: "Password baru dan konfirmasi password tidak sama.",
      });
      return;
    }
    if (newPassword.length < 6) {
        toast({
            variant: "destructive",
            title: "Password Terlalu Pendek",
            description: "Password baru harus terdiri dari minimal 6 karakter.",
        });
        return;
    }

    setIsSaving(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast({
        title: "Password Berhasil Diubah",
        description: "Silakan gunakan password baru Anda saat login berikutnya.",
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error("Error changing password:", error);
      let desc = "Terjadi kesalahan. Silakan coba lagi.";
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrong-password') {
          desc = "Password saat ini yang Anda masukkan salah.";
        }
      }
      toast({
        variant: "destructive",
        title: "Gagal Mengubah Password",
        description: desc,
      });
    } finally {
      setIsSaving(false);
    }
  };


  const handleNotificationSave = async () => {
    if (!userDocRef || !userData) return;
    setIsSaving(true);
    
    const settingsData = { 
      ...userData,
      earthquakeNotif, 
      weatherAlertNotif,
      updatedAt: serverTimestamp()
    };
    if (!settingsData.createdAt) {
      settingsData.createdAt = serverTimestamp();
    }

    setDoc(userDocRef, settingsData, { merge: true })
      .then(() => {
        toast({
          title: "Notifikasi Disimpan",
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
          <CardHeader><Skeleton className="h-7 w-40" /></CardHeader>
          <CardContent className="space-y-4"><Skeleton className="h-20 w-full" /></CardContent>
        </Card>
        <Card>
          <CardHeader><Skeleton className="h-7 w-40" /></CardHeader>
          <CardContent className="space-y-4"><Skeleton className="h-20 w-full" /></CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola profil, keamanan, dan preferensi notifikasi Anda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User /> Profil Pengguna</CardTitle>
          <CardDescription>Kelola informasi profil publik Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Nama Tampilan</Label>
            <Input id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} disabled={isSaving || user?.isAnonymous} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user?.email || 'Login sebagai tamu'} disabled />
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleProfileSave} disabled={isSaving || user?.isAnonymous || displayName === user?.displayName}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Profil
            </Button>
        </CardFooter>
      </Card>
      
      {isPasswordUser && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><KeyRound /> Ubah Password</CardTitle>
                <CardDescription>Ubah password Anda secara berkala untuk menjaga keamanan akun.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Password Saat Ini</Label>
                    <Input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} disabled={isSaving} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">Password Baru</Label>
                    <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} disabled={isSaving} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={isSaving} />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handlePasswordChange} disabled={isSaving || !currentPassword || !newPassword || !confirmPassword}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Ubah Password
                </Button>
            </CardFooter>
        </Card>
      )}

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
        <CardFooter>
            <Button onClick={handleNotificationSave} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Notifikasi
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

    