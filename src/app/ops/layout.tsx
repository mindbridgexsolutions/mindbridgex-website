import OpsSidebar from '@/components/ops/OpsSidebar';
import OpsHeader from '@/components/ops/OpsHeader';

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <OpsSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <OpsHeader />
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
