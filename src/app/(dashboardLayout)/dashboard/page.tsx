import { getUser } from "@/actions/user.action";
import { AdminDashboardComponent } from "@/components/layouts/dashboard/AdminDashboardComponent";
import { CustomerDashboardComponent } from "@/components/layouts/dashboard/CustomerDashboardComponent";
import { SellerDashboardComponent } from "@/components/layouts/dashboard/SellerDashboardComponent";

export default async function DashboardPage() {
  const { data, error } = await getUser();

  if (error || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Failed to load dashboard</p>
      </main>
    );
  }

  const { user, dashboard } = data.data;

  const renderDashboard = () => {
    switch (user.role) {
      case "CUSTOMER":
        return <CustomerDashboardComponent user={user} dashboard={dashboard} />;

      case "SELLER":
        return <SellerDashboardComponent user={user} dashboard={dashboard} />;

      case "ADMIN":
        return <AdminDashboardComponent user={user} dashboard={dashboard} />;

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">{renderDashboard()}</div>
    </main>
  );
}
