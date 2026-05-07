import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { loginSchema } from "~/lib/schemas/auth";
import { login } from "~/server/auth";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

type LoginValues = { password: string };

function LoginPage() {
  const navigate = useNavigate();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "" },
  });

  async function onSubmit(values: LoginValues) {
    try {
      await login({ data: values });
      toast.success("Signed in");
      navigate({ to: "/admin" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message);
      form.setError("password", { message });
    }
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen items-center justify-center bg-brand-cream px-4"
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-brand-navy">
            <span className="font-display text-lg font-bold text-brand-brass-light">SC</span>
          </div>
          <h1 className="font-display text-xl font-bold text-brand-navy">Admin Login</h1>
          <p className="mt-1 font-body text-sm text-brand-stone">Sullivan County CMS</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-sm border border-brand-surface bg-white p-6 shadow-sm space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
