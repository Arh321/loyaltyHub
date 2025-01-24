import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import "./get-phone-styles.css";
import { Input } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
const phoneValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^(0\d{10}|9\d{9})$/, "شماره موبایل به فرمت صحیح وارد نشده است")
    .required("شماره موبایل الزامی است")
    .test("maxLength", "شماره موبایل نباید بیشتر از حد مجاز باشد", (value) =>
      value?.startsWith("0") ? value.length <= 11 : value.length <= 10
    ),
});

interface PhoneFormProps {
  onGetOtpCode: (phone: string) => void;
  setPhone: Dispatch<SetStateAction<string>>;
  phone: string;
  loading: boolean;
}

const GetPhoneNumberComponent: React.FC<PhoneFormProps> = ({
  onGetOtpCode,
  phone,
  setPhone,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(phoneValidationSchema),
    mode: "onChange",
  });

  const handleInputChange = (value: string) => {
    const newValue = value.startsWith("0")
      ? value.slice(0, 11)
      : value.slice(0, 10);
    setPhone(newValue);
    setValue("phone", newValue, { shouldValidate: true });
  };

  const onSubmit = (data: { phone: string }) => {
    onGetOtpCode(data.phone);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center gap-4 admin-panel"
      dir="rtl"
    >
      <div className="relative w-full flex input-wrapper mt-[4vh]">
        <Input
          style={{ direction: "ltr" }}
          value={phone}
          type="number"
          inputMode="numeric"
          placeholder="مثال: ********09"
          className="w-full !font-Medium !p-3 !border !min-w-[320px] !border-Focus !rounded-lg focus:outline-none focus:border-primary transition-all duration-300 placeholder-gray-400 pr-2 py-4 admin-panel hover:bg-highlighter-hover"
          autoComplete="off"
          id="userName"
          autoFocus
          {...register("phone", { required: true })}
          onChange={(e) => handleInputChange(e.target.value)}
          onPaste={(e) => {
            e.preventDefault();
            handleInputChange(e.clipboardData.getData("Text"));
          }}
          disabled={loading}
        />
        <label
          htmlFor="userName"
          className="absolute !text-secondary1 bottom-1/2 translate-y-1/2 right-2 transition-all cursor-text"
        >
          شماره تلفن
        </label>
      </div>
      {errors.phone && (
        <p className="text-red-500 mt-2 text-alert font-regular">
          {errors.phone.message as string}
        </p>
      )}

      <button
        type="submit"
        className={clsx(
          "font-Medium bg-Secondary2 disabled:opacity-70 text-Highlighter py-3 w-2/3 text-lg rounded-lg fixed bottom-8 right-0 left-0 mx-auto max-w-[250px]",
          {
            "opacity-70 text-highlighter": !isValid,
            " hover:bg-cta-hover text-highliter": isValid,
          }
        )}
        disabled={!isValid || loading}
      >
        دریافت کد
        {loading && <LoadingOutlined />}
      </button>
    </form>
  );
};

export default GetPhoneNumberComponent;
