
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import { UserCheck } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock user storage - in a real app, this would be replaced with an actual database
const getUsersFromStorage = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    // Get users from localStorage
    const users = getUsersFromStorage();
    
    // Find user with matching email and password
    const user = users.find(
      (user: { email: string; password: string }) => 
      user.email === data.email && user.password === data.password
    );
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (user) {
        // Store current user in localStorage for session management
        localStorage.setItem('currentUser', JSON.stringify({
          name: user.name,
          email: user.email,
          // Don't store password in current user
        }));
        
        toast.success("Login successful!");
        console.log("Login data:", data);
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password. Please check your credentials or sign up.");
      }
    }, 1000); // Simulating network delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-dark p-4">
      <Card className="w-full max-w-md card-gradient">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="bg-app-gray p-3 rounded-full mb-4">
            <UserCheck className="h-6 w-6 text-app-purple" />
          </div>
          <CardTitle className="text-2xl text-center text-white">Welcome back</CardTitle>
          <CardDescription className="text-app-text-gray text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@company.com" 
                        {...field}
                        type="email"
                        className="bg-app-gray border-none text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        {...field}
                        className="bg-app-gray border-none text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full btn-gradient" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-app-text-gray text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-app-purple hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
