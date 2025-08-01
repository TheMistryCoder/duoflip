"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactInquirySchema, type InsertContactInquiry } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";

export default function Contact() {
	const ref = useRef<HTMLElement | null>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const { toast } = useToast();

	const form = useForm<InsertContactInquiry>({
		resolver: zodResolver(insertContactInquirySchema),
		defaultValues: {
			contactName: "",
			jobTitle: "",
			schoolName: "",
			location: "",
			email: "",
			phone: "",
			inquiryType: "",
			message: "",
		},
	});

	const submitMutation = useMutation({
		mutationFn: async (data: InsertContactInquiry) => {
			const response = await apiRequest("POST", "/api/contact", data);
			return response.json();
		},
		onSuccess: (data) => {
			toast({
				title: "Inquiry Submitted Successfully",
				description: data.message,
			});
			form.reset();
		},
		onError: (error: unknown) => {
			const message = error instanceof Error ? error.message : "An unknown error occurred";
			toast({
				title: "Submission Failed",
				description: message,
				variant: "destructive",
			});
		},
	});

	const onSubmit = (data: InsertContactInquiry): void => {
		submitMutation.mutate(data);
	};

	const contactInfo = [
		{
			icon: Phone,
			title: "Phone",
			content: "0845 095 3600",
			subtext: "Available 24/7, 365 days",
			gradient: "from-sky-500 to-emerald-400",
		},
		{
			icon: Mail,
			title: "Email",
			content: "info@efficient-is.co.uk",
			subtext: "",
			gradient: "from-emerald-400 to-purple-400",
		},
		{
			icon: MapPin,
			title: "Visit Our Demo Suite",
			content: "41 Fairfield Place\nEast Kilbride, Glasgow\nG74 5LP, Scotland",
			subtext: "Working hours: 8:30am - 5:30pm",
			gradient: "from-purple-400 to-pink-400",
		},
		{
			icon: Clock,
			title: "Two Week Trial",
			content: "Experience Duo Flip in your school with our complimentary two-week on-site trial program.",
			subtext: "",
			gradient: "from-pink-400 to-amber-400",
		},
	];

	return (
		<section id="contact" className="scroll-mt-20 py-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white" ref={ref}>
			<div className="site-container">{/* no layout or JSX content changed — you can paste the remaining JSX as-is from your working version */}</div>
		</section>
	);
}
