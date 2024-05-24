import Header from "../ui/main/Header";
export default function DashboardLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
