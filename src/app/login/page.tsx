'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import { Cloud } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleAuthError = (error: any) => {
    let title = "Terjadi Kesalahan";
    let description = "Gagal melakukan autentikasi. Silakan coba lagi.";

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/user-not-found':
          title = "Pengguna Tidak Ditemukan";
          description = "Tidak ada akun yang terdaftar dengan email ini.";
          break;
        case 'auth/wrong-password':
          title = "Password Salah";
          description = "Password yang Anda masukkan tidak benar.";
          break;
        case 'auth/email-already-in-use':
          title = "Email Sudah Terdaftar";
          description = "Akun dengan email ini sudah ada. Silakan login.";
          break;
        case 'auth/weak-password':
          title = "Password Lemah";
          description = "Password harus terdiri dari setidaknya 6 karakter.";
          break;
        case 'auth/invalid-email':
            title = "Email Tidak Valid";
            description = "Format email yang Anda masukkan tidak valid.";
            break;
        default:
          description = error.message;
      }
    }

    toast({
      variant: 'destructive',
      title: title,
      description: description,
    });
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await initiateEmailSignIn(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignUp = async () => {
    setLoading(true);
    try {
      await initiateEmailSignUp(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setLoading(true);
    try {
      await initiateAnonymousSignIn(auth);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };
  
  if (isUserLoading || user) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
             <div className="flex flex-col items-center gap-4">
                <Cloud className="h-12 w-12 text-primary animate-pulse" />
                <p className="text-muted-foreground">Mengarahkan ke dashboard...</p>
            </div>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <div className="w-full max-w-md p-4">
        <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 text-primary">
                <Cloud className="h-8 w-8" />
                <span className="text-2xl font-semibold text-foreground">IndoWeatherAlert</span>
            </div>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Daftar</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login ke Akun Anda</CardTitle>
                <CardDescription>Masukkan email dan password untuk melanjutkan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="email@contoh.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button onClick={handleSignIn} disabled={loading || !email || !password} className="w-full">
                  {loading ? 'Memproses...' : 'Login'}
                </Button>
                 <p className="text-xs text-muted-foreground">Atau lanjutkan sebagai tamu</p>
                 <Button onClick={handleAnonymousSignIn} variant="outline" disabled={loading} className="w-full">
                  {loading ? 'Memproses...' : 'Login Anonim'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Buat Akun Baru</CardTitle>
                <CardDescription>Daftar untuk mendapatkan fitur personalisasi.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" placeholder="email@contoh.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSignUp} disabled={loading || !email || !password} className="w-full">
                  {loading ? 'Memproses...' : 'Daftar'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
