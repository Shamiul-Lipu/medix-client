"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldX, ArrowLeft } from "lucide-react";

const BannedPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md px-4">
        <Card className="border-red-200 shadow-xl">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldX className="w-8 h-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl text-red-600">
                Account Suspended
              </CardTitle>
              <CardDescription className="text-base text-gray-700">
                Access to your account has been restricted.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-gray-700">
                Unfortunately, your account has been suspended due to a
                violation of our terms of service. If you believe this is a
                mistake, please contact our support team.
              </AlertDescription>
            </Alert>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-gray-600">
                  We appreciate your understanding.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button
              onClick={() => router.push("/login")}
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center mt-6 text-sm text-gray-500">
          This action was taken to protect our community. We appreciate your
          understanding.
        </p>
      </div>
    </div>
  );
};

export default BannedPage;
