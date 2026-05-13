"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { partnerSchema, type PartnerFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

const VEHICLE_TYPES = [
  { value: "", label: "Chọn loại xe..." },
  { value: "500kg", label: "Xe 500kg" },
  { value: "1T", label: "Xe 1 tấn" },
  { value: "2.5T", label: "Xe 2.5 tấn" },
  { value: "5T", label: "Xe 5 tấn" },
  { value: "10T", label: "Xe 10 tấn" },
  { value: "15T", label: "Xe 15 tấn" },
];

export default function PartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
  });

  const onSubmit = async (_data: PartnerFormData) => {
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
            Đăng ký thành công!
          </h3>
          <p className="text-sm text-muted">
            Hồ sơ của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ trong vòng 24
            giờ để xác nhận.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-primary underline underline-offset-2 cursor-pointer"
        >
          Đăng ký tài xế khác
        </button>
      </div>
    );
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="partner-name" className="block text-sm font-medium text-secondary mb-1.5">
            Họ và tên <span className="text-primary">*</span>
          </label>
          <input
            id="partner-name"
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
            className={cn(inputClass, errors.fullName && "border-red-400 focus:ring-red-200")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="partner-phone" className="block text-sm font-medium text-secondary mb-1.5">
            Số điện thoại <span className="text-primary">*</span>
          </label>
          <input
            id="partner-phone"
            type="tel"
            placeholder="0912 345 678"
            {...register("phone")}
            className={cn(inputClass, errors.phone && "border-red-400 focus:ring-red-200")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="partner-vehicle" className="block text-sm font-medium text-secondary mb-1.5">
          Loại xe <span className="text-primary">*</span>
        </label>
        <select
          id="partner-vehicle"
          {...register("vehicleType")}
          className={cn(inputClass, errors.vehicleType && "border-red-400 focus:ring-red-200")}
        >
          {VEHICLE_TYPES.map((v) => (
            <option key={v.value} value={v.value} disabled={v.value === ""}>
              {v.label}
            </option>
          ))}
        </select>
        {errors.vehicleType && (
          <p className="text-red-500 text-xs mt-1">{errors.vehicleType.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="partner-area" className="block text-sm font-medium text-secondary mb-1.5">
          Khu vực hoạt động <span className="text-primary">*</span>
        </label>
        <input
          id="partner-area"
          type="text"
          placeholder="VD: Hà Nội, Bắc Ninh, Hưng Yên..."
          {...register("area")}
          className={cn(inputClass, errors.area && "border-red-400 focus:ring-red-200")}
        />
        {errors.area && (
          <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="partner-note" className="block text-sm font-medium text-secondary mb-1.5">
          Ghi chú thêm
        </label>
        <textarea
          id="partner-note"
          rows={3}
          placeholder="Thông tin thêm về xe, kinh nghiệm... (không bắt buộc)"
          {...register("note")}
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
            Đang xử lý...
          </>
        ) : (
          "Đăng ký trở thành đối tác"
        )}
      </button>

      <p className="text-xs text-muted text-center">
        Bằng cách đăng ký, bạn đồng ý với{" "}
        <span className="text-primary">Điều khoản dịch vụ</span> của Benhub.
      </p>
    </form>
  );
}
