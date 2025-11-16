'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn, initiateGoogleSignIn } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import { Cloud, Loader2 } from 'lucide-react';

const GoogleIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.36 1.67-4.06 1.67-3.4 0-6.17-2.83-6.17-6.23s2.77-6.23 6.17-6.23c1.87 0 3.13.67 4.02 1.52l2.6-2.6C16.83 2.05 14.83 1 12.48 1 7.02 1 3 5.02 3 10.5s4.02 9.5 9.48 9.5c2.7 0 4.9-1 6.53-2.63 1.84-1.84 2.48-4.48 2.48-7.13 0-.66-.05-1.32-.15-1.98H12.48z" fill="#4285F4" />
    </svg>
);

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
        case 'auth/popup-closed-by-user':
            title = "Login Dibatalkan";
            description = "Anda menutup jendela login sebelum proses selesai.";
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
  
  const handleAuthAction = async (action: () => Promise<void>) => {
    setLoading(true);
    try {
      await action();
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSignIn = () => handleAuthAction(() => initiateEmailSignIn(auth, email, password));
  const handleSignUp = () => handleAuthAction(() => initiateEmailSignUp(auth, email, password));
  const handleAnonymousSignIn = () => handleAuthAction(() => initiateAnonymousSignIn(auth));
  const handleGoogleSignIn = () => handleAuthAction(() => initiateGoogleSignIn(auth));
  
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
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
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
                  {loading && <Loader2 className="animate-spin" />}
                  Login
                </Button>
                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            Atau lanjutkan dengan
                        </span>
                    </div>
                </div>
                 <Button onClick={handleGoogleSignIn} variant="outline" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="animate-spin" /> : <><GoogleIcon /> Masuk dengan Google</>}
                </Button>
                 <Button onClick={handleAnonymousSignIn} variant="secondary" disabled={loading} className="w-full">
                  {loading && <Loader2 className="animate-spin" />}
                  Lanjutkan sebagai Tamu
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
              <CardFooter className="flex-col gap-4">
                <Button onClick={handleSignUp} disabled={loading || !email || !password} className="w-full">
                  {loading && <Loader2 className="animate-spin" />}
                  Daftar
                </Button>
                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            Atau daftar dengan
                        </span>
                    </div>
                </div>
                <Button onClick={handleGoogleSignIn} variant="outline" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="animate-spin" /> : <><GoogleIcon /> Daftar dengan Google</>}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
