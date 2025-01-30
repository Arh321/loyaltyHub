import React, { Dispatch, SetStateAction, useState } from "react";
import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import persianLocale from "@/utils/common-methods/persian-locales";
import locale from "antd/es/locale/fa_IR";

dayjs.extend(jalaliday);

interface PersianDatePickerProps {
  defaultValue: string; // Default Gregorian date (e.g., "2025-01-01")
  setDate: (date: string) => void; // Function to update the selected date in Gregorian
}

const PersianDatePicker: React.FC<PersianDatePickerProps> = ({
  defaultValue,
  setDate,
}) => {
  const [date, setDateState] = useState<dayjs.Dayjs | null>(
    dayjs(defaultValue, "YYYY-MM-DD").calendar("jalali")
  );

  const handleDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      // Update state in Jalali for display
      setDateState(value.calendar("jalali"));

      // Convert to Gregorian for output
      const gregorianDate = value.calendar("gregory").format("YYYY-MM-DD");
      setDate(gregorianDate);
      console.log("Gregorian Output:", gregorianDate);
    } else {
      setDateState(dayjs(defaultValue, "YYYY-MM-DD").calendar("jalali"));
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <DatePicker
        value={date}
        onChange={handleDateChange}
        locale={persianLocale}
        format={(value) => dayjs(value).calendar("jalali").format("YYYY/MM/DD")}
        placeholder="تاریخ انتخاب"
        className="!font-Regular placeholder:!text-secondary !p-1"
        dropdownClassName="!font-Regular"
      />
    </ConfigProvider>
  );
};

export default PersianDatePicker;
