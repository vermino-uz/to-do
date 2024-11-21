import { AuthProvider } from '@/components/auth/AuthProvider';
import { AuthForm } from '@/components/auth/AuthForm';
import { Header } from '@/components/layout/Header';
import { TodoList } from '@/components/todo/TodoList';
import { useAuth } from '@/components/auth/AuthProvider';
import { Toaster } from '@/components/ui/toaster';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8">
        {user ? <TodoList /> : (
          <div className="flex justify-center items-center">
            <AuthForm />
          </div>
        )}
      </main>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}