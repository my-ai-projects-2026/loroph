import { Header, Footer } from "@/components/shared";
import NavigateProvider from "@/components/shared/NavigateProvider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigateProvider>
      <div id="home-root" className="min-h-screen text-(--color-on-surface)">
        <Header />
        <main className="pt-16 min-h-screen flex flex-col">{children}</main>
        <Footer />
      </div>
    </NavigateProvider>
  );
};

export default MainLayout;
