"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  light?: boolean;
}

export default function ContactForm({ light = false }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  const inputClass = cn(
    "w-full px-4 py-3 rounded-lg text-sm border transition-colors duration-200 outline-none focus:ring-2",
    light
      ? "bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-primary focus:border-primary"
      : "bg-white border-border-soft text-secondary placeholder-muted focus:ring-primary/30 focus:border-primary"
  );

  const labelClass = cn(
    "block text-sm font-medium mb-1.5",
    light ? "text-white/80" : "text-secondary"
  );

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h3 className={cn("font-heading font-semibold text-xl mb-1", light ? "text-white" : "text-secondary")}>
            Gửi thành công!
          </h3>
          <p className={cn("text-sm", light ? "text-white/60" : "text-muted")}>
            Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-primary underline underline-offset-2 cursor-pointer"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Họ và tên <span className="text-primary">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
            className={cn(inputClass, errors.fullName && "border-red-400 focus:ring-red-200")}
          />
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-company" className={labelClass}>
            Công ty
          </label>
          <input
            id="contact-company"
            type="text"
            placeholder="Tên công ty (không bắt buộc)"
            {...register("company")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Số điện thoại <span className="text-primary">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          placeholder="0912 345 678"
          {...register("phone")}
          className={cn(inputClass, errors.phone && "border-red-400 focus:ring-red-200")}
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-content" className={labelClass}>
          Nội dung <span className="text-primary">*</span>
        </label>
        <textarea
          id="contact-content"
          rows={4}
          placeholder="Mô tả nhu cầu vận chuyển của bạn..."
          {...register("content")}
          className={cn(inputClass, "resize-none", errors.content && "border-red-400 focus:ring-red-200")}
        />
        {errors.content && (
          <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Đang gửi...
          </>
        ) : (
          "Gửi yêu cầu tư vấn"
        )}
      </button>
    </form>
  );
}
