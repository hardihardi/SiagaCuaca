import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, BookCopy, ShieldQuestion } from "lucide-react";

const preparednessGuide = [
    {
        stage: "Sebelum Gempa",
        icon: "🛡️",
        points: [
            "Kenali lingkungan sekitar Anda. Perhatikan di mana letak pintu keluar, tangga darurat, atau tempat lapang.",
            "Siapkan perabotan (lemari, kabinet, dll.) dengan menempelkannya ke dinding untuk mencegah jatuh saat gempa.",
            "Siapkan tas siaga bencana yang berisi senter, P3K, makanan instan, air minum, dan dokumen penting.",
            "Lakukan latihan evakuasi secara berkala bersama keluarga atau rekan kerja."
        ]
    },
    {
        stage: "Saat Gempa",
        icon: "🚨",
        points: [
            "Jika di dalam ruangan: Berlindung di bawah meja yang kokoh, lindungi kepala dengan bantal atau tangan. Jauhi jendela, kaca, dan benda-benda yang mudah jatuh.",
            "Jika di luar ruangan: Cari area terbuka yang jauh dari gedung, pohon, dan tiang listrik.",
            "Jika di dalam kendaraan: Berhenti di tempat terbuka dan tetap di dalam mobil sampai guncangan berhenti.",
            "Jangan menggunakan lift. Gunakan tangga darurat."
        ]
    },
    {
        stage: "Setelah Gempa",
        icon: "🩹",
        points: [
            "Periksa kondisi diri sendiri dan orang lain di sekitar Anda. Berikan pertolongan pertama jika diperlukan.",
            "Keluarlah dari gedung dengan tertib. Jangan terburu-buru.",
            "Periksa kebocoran gas atau potensi korsleting listrik. Jika tercium bau gas, segera keluar dan jangan menyalakan api.",
            "Dengarkan informasi dari sumber terpercaya (BMKG, BNPB). Jangan mudah percaya pada isu atau hoaks."
        ]
    }
];

const glossaryTerms = [
    {
        term: "Magnitudo (M)",
        definition: "Ukuran kekuatan energi gempa bumi yang dilepaskan di sumbernya. Dinyatakan dalam Skala Richter (SR) atau saat ini lebih sering menggunakan Moment Magnitude (Mw). Skala ini bersifat logaritmik."
    },
    {
        term: "Skala MMI (Modified Mercalli Intensity)",
        definition: "Ukuran dampak atau tingkat guncangan yang dirasakan oleh manusia, serta kerusakan pada bangunan di suatu lokasi. Skala ini terdiri dari I (tidak dirasakan) hingga XII (kehancuran total)."
    },
    {
        term: "Siklon Tropis",
        definition: "Sistem badai besar dengan sirkulasi angin kencang yang berputar di sekitar pusat tekanan rendah. Terbentuk di atas perairan hangat tropis dan dapat menyebabkan hujan sangat lebat, angin kencang, dan gelombang tinggi."
    },
    {
        term: "El Niño & La Niña",
        definition: "Fenomena iklim global yang terjadi di Samudra Pasifik. El Niño biasanya menyebabkan musim kemarau yang lebih kering di Indonesia, sementara La Niña menyebabkan musim hujan yang lebih basah."
    }
]

export default function EducationPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Edukasi & Kesiapsiagaan</h1>
        <p className="text-muted-foreground">Tingkatkan pengetahuan Anda untuk lebih siap menghadapi potensi bencana.</p>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <LifeBuoy className="text-primary"/>
                Panduan Kesiapsiagaan Gempa Bumi
            </CardTitle>
            <CardDescription>Apa yang harus dilakukan sebelum, saat, dan setelah gempa bumi terjadi.</CardDescription>
        </CardHeader>
        <CardContent>
             <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {preparednessGuide.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                            <span className="flex items-center gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                {item.stage}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pl-12">
                            <ul className="list-disc space-y-2 text-muted-foreground">
                                {item.points.map((point, pIndex) => (
                                    <li key={pIndex}>{point}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BookCopy className="text-accent"/>
                Glosarium Istilah
            </CardTitle>
            <CardDescription>Pahami istilah-istilah penting dalam informasi cuaca dan kebencanaan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {glossaryTerms.map((term, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground">{term.term}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{term.definition}</p>
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
