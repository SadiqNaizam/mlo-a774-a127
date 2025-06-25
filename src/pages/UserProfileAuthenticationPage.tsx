import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

const UserProfileAuthenticationPage = () => {
  console.log('UserProfileAuthenticationPage loaded');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // A simple handler to simulate a login action
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Simulating login...");
    setIsLoggedIn(true);
  };
  
  // A simple handler to simulate a logout action
  const handleLogout = () => {
    console.log("Simulating logout...");
    setIsLoggedIn(false);
  };

  const AuthForms = () => (
    <Tabs defaultValue="login" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Link to="#" className="text-sm font-medium text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                <Input id="login-password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Login</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
           <form onSubmit={handleLogin}> {/* Also logs in on sign up for simulation */}
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Join us to start ordering your favorite food.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input id="signup-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Create Account</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );

  const UserDashboard = () => (
     <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Account</h1>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Manage your personal details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="dash-name">Full Name</Label>
                            <Input id="dash-name" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dash-email">Email</Label>
                            <Input id="dash-email" type="email" defaultValue="m@example.com" disabled />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="addresses">
                 <Card>
                    <CardHeader>
                        <CardTitle>Saved Addresses</CardTitle>
                        <CardDescription>Manage your delivery locations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">You have no saved addresses.</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary">Add New Address</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="payment">
                 <Card>
                    <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your saved cards.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">You have no saved payment methods.</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary">Add New Card</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
     </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-12">
        {isLoggedIn ? <UserDashboard /> : <AuthForms />}
      </main>
      <Footer />
    </div>
  );
};

export default UserProfileAuthenticationPage;