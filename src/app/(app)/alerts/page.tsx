
import { getAlertsData } from "@/lib/data";
import type { AlertData } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, Clock, MapPin } from "lucide-react";

export default async function AlertsPage() {
  const alertsData = await getAlertsData();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Peringatan Dini Cuaca</h1>
        <p className="text-muted-foreground">Daftar lengkap semua peringatan dini cuaca yang aktif dari BMKG.</p>
      </div>
      
      {alertsData.length > 0 ? (
        <Card>
          <CardContent className="p-0 md:p-0">
            <Accordion type="single" collapsible className="w-full">
              {alertsData.map((alert: AlertData) => (
                <AccordionItem value={alert.id} key={alert.id}>
                  <AccordionTrigger className="hover:no-underline p-4 md:p-6">
                    <div className="flex items-start gap-4 text-left">
                        <div className="mt-1">
                            <AlertTriangle className="h-5 w-5 text-accent"/>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold">{alert.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-1">
                                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5"/>{alert.area}</span>
                                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5"/>{alert.time}</span>
                            </p>
                        </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 md:pb-6 px-4 md:px-6 pl-12 md:pl-16">
                    <p className="text-muted-foreground">{alert.details}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center py-20">
          <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <AlertTriangle className="h-12 w-12 text-primary"/>
              </div>
            <CardTitle className="mt-4">Tidak Ada Peringatan</CardTitle>
            <CardDescription>Saat ini tidak ada peringatan dini cuaca yang aktif.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Semua kondisi cuaca terpantau aman. Kami akan segera memperbarui halaman ini jika ada peringatan baru.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
