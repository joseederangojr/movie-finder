"use client";
import type React from "react";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<QueryClientProvider client={queryClient}>
					<NuqsAdapter>
						<Suspense>
							{children}
							<Analytics />
						</Suspense>
					</NuqsAdapter>
				</QueryClientProvider>
			</body>
		</html>
	);
}
