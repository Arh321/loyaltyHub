import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Radio, RadioChangeEvent } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";

import PersianDatePicker from "./persian-date-picker";
// Define the shape of the form data

interface ProfileFormValues {
  profilePhoto?: string;
  lastNameEn?: string;
  firstNameEn?: string;
  email?: string;
  nationalCode?: string;
  marriage?: boolean;
  spouseBirthdate?: string;
  educationTitle?: string;
  jobTitle?: string;
}

interface ProfileEditAdditionalFormProps {
  headerTitle: string;
  additional: ProfileFormValues;
  style: {
    readonly [key: string]: string;
  };
}

const validateNationalCode = (value: string | undefined): boolean => {
  if (!value) return false;

  // Step 1: Validate length and digits with regex
  const nationalCodePattern = /^\d{10}$/;
  if (!nationalCodePattern.test(value)) {
    return false;
  }

  // Step 2: Checksum validation for Persian national code
  const digits = value.split("").map(Number); // Convert code to array of digits
  const checkDigit = digits[9]; // 10th digit (check digit)

  // Calculate the sum for the first 9 digits
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  const remainder = sum % 11;

  // Step 3: Check if the checksum is valid
  return (
    (remainder < 2 && checkDigit === remainder) ||
    (remainder >= 2 && checkDigit === 11 - remainder)
  );
};

const validationSchema = yup.object().shape({
  profilePhoto: yup.string().nullable(),
  lastNameEn: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z\s]*$/, "نام خانوادگی باید فقط شامل حروف انگلیسی باشد"),
  firstNameEn: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z\s]*$/, "نام باید فقط شامل حروف انگلیسی باشد"),
  email: yup.string().email("ایمیل معتبر نیست").nullable(),
  nationalCode: yup
    .string()
    .required("کد ملی الزامی است")
    .test("is-valid-national-code", "کد ملی وارد شده معتبر نیست", (value) =>
      validateNationalCode(value)
    ),
  marriage: yup.boolean().nullable(),
  spouseBirthdate: yup
    .string()
    .nullable()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "تاریخ تولد همسر باید به فرمت YYYY-MM-DD باشد"
    ),
  educationTitle: yup.string().nullable(),
  jobTitle: yup.string().nullable(),
});

const ProfileEditAdditionalForm: React.FC<ProfileEditAdditionalFormProps> = ({
  headerTitle,
  additional,

  style,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<ProfileFormValues>({
    defaultValues: additional,
    resolver: yupResolver(validationSchema),
    mode: "all",
  });
  const [selectedDate, setSelectedDate] = useState<string>("2025-01-01");
  // Reset form values when `mandatory` changes
  useEffect(() => {
    reset(additional);
  }, [additional, reset]);

  const onChangeGender = (e: RadioChangeEvent) => {
    setValue("marriage", e.target.value);
  };
  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log(data);
  };
  const options = [
    {
      value: false,
      label: (
        <span
          dir="rtl"
          className="w-full justify-center flex items-center gap-2 font-Medium text-lg  "
        >
          <span>مجرد</span>
        </span>
      ),
    },
    {
      value: true,
      label: (
        <span
          dir="rtl"
          className="w-full justify-center flex items-center gap-2 font-Medium text-lg  "
        >
          <span>متاهل</span>
        </span>
      ),
    },
  ];
  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-[15px] p-[4px]"
    >
      <h3 className="text-Secondary2 text-lg font-Medium mb-[10px]">
        {headerTitle}
      </h3>
      <div className="w-full grid grid-cols-2 gap-2">
        {/* First Name Input */}
        <div
          className={clsx(
            "col-span-1 relative w-full flex",
            style["input-wrapper"]
          )}
        >
          <label
            htmlFor="nationalCode"
            className={clsx(
              "absolute text-secondary1 bottom-1/2 translate-y-1/2 right-2 transition-all cursor-text"
            )}
          >
            کد ملی
          </label>
          <Controller
            name="nationalCode"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="کدملی"
                type="text"
                className="!font-Medium placeholder:!text-secondary !p-[6px]"
              />
            )}
          />
          {errors.nationalCode && (
            <span className="text-red-500 text-xs absolute top-full right-0 !font-Light">
              {errors.nationalCode.message}
            </span>
          )}
        </div>

        {/* Last Name Input */}
        <div
          className={clsx(
            "col-span-1 relative w-full flex",
            style["input-wrapper"]
          )}
        >
          <label
            htmlFor="email"
            className={clsx(
              "absolute text-secondary1 bottom-1/2 translate-y-1/2 right-2 transition-all cursor-text"
            )}
          >
            ایمیل
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="example@gmail.com..."
                type="email"
                className="!font-Medium placeholder:!text-secondary !p-[6px]"
              />
            )}
          />
          {errors.email && (
            <span className="text-red-500 text-xs absolute top-full right-0 !font-Light">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        {/* First Name Input */}
        <div
          className={clsx(
            "col-span-1 relative w-full flex",
            style["input-wrapper"]
          )}
        >
          <label
            htmlFor="educationTitle"
            className={clsx(
              "absolute text-secondary1 bottom-1/2 translate-y-1/2 right-2 transition-all cursor-text"
            )}
          >
            تحصیلات
          </label>
          <Controller
            name="educationTitle"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="تحصیلات"
                className="!font-Medium placeholder:!text-secondary !p-[6px]"
              />
            )}
          />
          {errors.educationTitle && (
            <span className="text-red-500 text-xs absolute top-full right-0 !font-Light">
              {errors.educationTitle.message}
            </span>
          )}
        </div>

        {/* Last Name Input */}
        <div
          className={clsx(
            "col-span-1 relative w-full flex",
            style["input-wrapper"]
          )}
        >
          <label
            htmlFor="jobTitle"
            className={clsx(
              "absolute text-secondary1 bottom-1/2 translate-y-1/2 right-2 transition-all cursor-text"
            )}
          >
            شغل
          </label>
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="شغل"
                className="!font-Medium placeholder:!text-secondary !p-[6px]"
              />
            )}
          />
          {errors.jobTitle && (
            <span className="text-red-500 text-xs absolute top-full right-0 !font-Light">
              {errors.jobTitle.message}
            </span>
          )}
        </div>
      </div>
      <div className="w-full relative  flex border border-gray-300 rounded-[6px]">
        <Radio.Group
          onChange={onChangeGender}
          defaultValue={additional.marriage}
          buttonStyle="solid"
          className="!w-full !flex !items-center gap-[10px]  [&_.ant-radio-button-wrapper-checked]:!bg-Secondary2 [&_.ant-radio-button-wrapper]:text-Secondary2"
        >
          {options.map((option, index) => {
            return (
              <Radio.Button
                className="!w-full !border-none !shadow-none before:!hidden !rounded-[6px] !p-1 !h-auto "
                key={index}
                value={option.value}
              >
                {option.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>
      <hr className="border border-gradient-secondary" />
      {/* Submit Button */}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="font-Medium bg-Secondary2  disabled:opacity-70 text-Highlighter py-2 w-full text-lg rounded-lg"
        >
          ثبت اطلاعات
        </button>
      </div>
    </form>
  );
};

export default ProfileEditAdditionalForm;
