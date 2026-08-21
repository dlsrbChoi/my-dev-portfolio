import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { locales, type Locale } from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 정적으로 생성할 로케일 목록 (ko, en)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 정적 렌더링을 위한 요청 로케일 설정
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* 다크모드를 기본값으로 설정 (defaultTheme="dark"), 클릭으로 light/system 전환 가능 */}
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <div className={`${geistSans.variable} ${geistMono.variable} h-full antialiased min-h-full flex flex-col bg-background text-foreground`}>
            <Header />
            <main className="flex-1">
              <Container>{children}</Container>
            </main>
            <Footer />
            {/* useSearchParams 사용으로 인해 Suspense 경계 필요 */}
            <Suspense fallback={null}>
              <GoogleAnalytics />
            </Suspense>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
