"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactInquirySchema, type InsertContactInquiry } from "@/lib/schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";

export default function Contact() {
	const ref = useRef(null);
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
		onError: (error: any) => {
			toast({
				title: "Submission Failed",
				description: error.message || "An error occurred while submitting your inquiry. Please try again.",
				variant: "destructive",
			});
		},
	});

	const onSubmit = (data: InsertContactInquiry) => {
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
			<div className="site-container">
				<motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8 }}>
					<div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
						<span className="text-sm font-semibold text-white tracking-wider uppercase">Request Demo</span>
					</div>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 text-white" style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
						Ready to Transform Your Classroom?
					</h2>
					<p className="text-lg md:text-xl leading-relaxed text-blue-100 max-w-4xl mx-auto" style={{ lineHeight: 1.6 }}>
						Schedule a personalized demonstration, explore pricing options, or start your complimentary two-week trial. Our education specialists are here to help you succeed.
					</p>
				</motion.div>

				<motion.div className="grid lg:grid-cols-2 gap-12 items-start" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: 0.2 }}>
					{/* Contact Form */}
					<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="contactName"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-white">Contact Name *</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Your full name" className="bg-white/10 border-white/30 text-white placeholder-blue-200 focus:ring-sky-500 focus:border-sky-500" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="jobTitle"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-white">Job Title</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Head Teacher, SEN Coordinator, etc." className="bg-white/10 border-white/30 text-white placeholder-blue-200 focus:ring-sky-500 focus:border-sky-500" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="schoolName"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-white">School Name *</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Your school name" className="bg-white/10 border-white/30 text-white placeholder-blue-200 focus:ring-sky-500 focus:border-sky-500" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="location"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-white">Location *</FormLabel>
												<FormControl>
													<Input {...field} placeholder="City, County" className="bg-white/10 border-white/30 text-white placeholder-blue-200 focus:ring-sky-500 focus:border-sky-500" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-white">Email Address *</FormLabel>
												<FormControl>
													<Input {...field} type="email" placeholder="your.email@school.edu" className="bg-white/10 border-white/30 text-white placeholder-blue-200 focus:ring-sky-500 focus:border-sky-500" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-white">Phone Number</FormLabel>
												<FormControl>
													<Input {...field} type="tel" placeholder="Your phone number" className="bg-white/10 border-white/30 text-white placeholder-blue-200 focus:ring-sky-500 focus:border-sky-500" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="inquiryType"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-white">Inquiry Type *</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className="bg-white/10 border-white/30 text-white focus:ring-sky-500 focus:border-sky-500">
														<SelectValue placeholder="Select an option" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="demo">Request demonstration</SelectItem>
													<SelectItem value="pricing">Pricing information</SelectItem>
													<SelectItem value="trial">Two week trial</SelectItem>
													<SelectItem value="support">Technical support</SelectItem>
													<SelectItem value="other">Other inquiry</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-white">Additional Information</FormLabel>
											<FormControl>
												<Textarea {...field} rows={4} placeholder="Tell us about your specific needs, number of students, or any questions you have..." className="bg-white/10 border-white/30 text-white placeholder-blue-200 focus:ring-sky-500 focus:border-sky-500 resize-none" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit" disabled={submitMutation.isPending} className="w-full bg-gradient-to-r from-pink-400 to-amber-400 text-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg py-6">
									{submitMutation.isPending ? (
										<>
											<Loader2 className="w-5 h-5 mr-2 animate-spin" />
											Sending...
										</>
									) : (
										"Send Inquiry"
									)}
								</Button>
							</form>
						</Form>
					</div>

					{/* Contact Information */}
					<div className="space-y-8">
						<div>
							<h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
							<p className="text-blue-100 leading-relaxed">We&rsquo;d be delighted to hear from you and help transform learning in your school. Our team provides personalized support to ensure Duo Flip meets your specific educational needs.</p>
						</div>

						<div className="space-y-6">
							{contactInfo.map((info, index) => (
								<motion.div key={index} className="flex items-start space-x-4" initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}>
									<div className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
										<info.icon className="w-6 h-6 text-white" />
									</div>
									<div>
										<h4 className="font-semibold mb-1">{info.title}</h4>
										<p className="text-blue-100 whitespace-pre-line">{info.content}</p>
										{info.subtext && <p className="text-sm text-blue-200 mt-1">{info.subtext}</p>}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
