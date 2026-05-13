"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { jobApplicationSchema, type JobApplicationFormData } from "@/lib/validations";
import { JOBS } from "@/lib/data";
import { cn } from "@/lib/utils";

interface JobApplyFormProps {
  preselectedJob?: string;
}

export default function JobApplyForm({ preselectedJob }: JobApplyFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      jobTitle: preselectedJob ?? "",
    },
  });

  const onSubmit = async (_data: JobApplicationFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg text-sm border border-border-soft bg-white text-secondary placeholder-muted transition-colors duration-200 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-xl text-secondary mb-1">
            Hồ sơ đã được gửi!
          </h3>
          <p className="text-sm text-muted max-w-sm">
            Chúng tôi sẽ xem xét hồ sơ và liên hệ với bạn trong vòng 3-5 ngày
            làm việc.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-primary underline underline-offset-2 cursor-pointer"
        >
          Ứng tuyển vị trí khác
        </button>
      </div>
    );
  }

  return (
    <form
      id="apply-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="job-name" className="block text-sm font-medium text-secondary mb-1.5">
            Họ và tên <span className="text-primary">*</span>
          </label>
          <input
            id="job-name"
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
            className={cn(inputClass, errors.fullName && "border-red-400")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="job-phone" className="block text-sm font-medium text-secondary mb-1.5">
            Số điện thoại <span className="text-primary">*</span>
          </label>
          <input
            id="job-phone"
            type="tel"
            placeholder="0912 345 678"
            {...register("phone")}
            className={cn(inputClass, errors.phone && "border-red-400")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="job-email" className="block text-sm font-medium text-secondary mb-1.5">
          Email <span className="text-primary">*</span>
        </label>
        <input
          id="job-email"
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          className={cn(inputClass, errors.email && "border-red-400")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="job-title" className="block text-sm font-medium text-secondary mb-1.5">
          Vị trí ứng tuyển <span className="text-primary">*</span>
        </label>
        <select
          id="job-title"
          {...register("jobTitle")}
          className={cn(inputClass, errors.jobTitle && "border-red-400")}
        >
          <option value="">Chọn vị trí...</option>
          {JOBS.filter((j) => j.isActive).map((job) => (
            <option key={job.id} value={job.title}>
              {job.title}
            </option>
          ))}
        </select>
        {errors.jobTitle && (
          <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="job-cover" className="block text-sm font-medium text-secondary mb-1.5">
          Thư giới thiệu
        </label>
        <textarea
          id="job-cover"
          rows={4}
          placeholder="Giới thiệu bản thân và lý do bạn muốn gia nhập Benhub... (không bắt buộc)"
          {...register("coverLetter")}
          className={cn(inputClass, "resize-none")}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer text-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Đang gửi hồ sơ...
          </>
        ) : (
          "Nộp hồ sơ ứng tuyển"
        )}
      </button>
    </form>
  );
}
