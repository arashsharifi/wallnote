import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker, { DateObject, Calendar, Locale as DatePickerLocale } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "moment-jalaali";
import { v4 as uuidv4 } from 'uuid';

interface IFormInputs {
  title: string;
  details: string;
  productionDate: string;
  productionTime: string;
  expirationDate: string;
  expirationTime: string;
}

interface AddFormV2Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  addId: string;
}

const schema = yup.object().shape({
  title: yup.string().required("لطفا عنوان را وارد کنید"),
  details: yup.string().required("لطفا جزئیات را وارد کنید"),
  productionDate: yup.string().required("لطفا تاریخ تولید را وارد کنید"),
  productionTime: yup.string().required("لطفا ساعت تولید را وارد کنید"),
  expirationDate: yup.string().required("لطفا تاریخ انقضا را وارد کنید"),
  expirationTime: yup.string().required("لطفا ساعت انقضا را وارد کنید"),
});

const AddFormV2: React.FC<AddFormV2Props> = ({ setModal, modal, addId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const [productionDate, setProductionDate] = useState<DateObject | null>(null);
  const [productionTime, setProductionTime] = useState<DateObject | null>(null);
  const [expirationDate, setExpirationDate] = useState<DateObject | null>(null);
  const [expirationTime, setExpirationTime] = useState<DateObject | null>(null);

  useEffect(() => {
    if (addId) {
      const notes = JSON.parse(localStorage.getItem('notes') || '[]');
      const existingNote = notes.find((note: any) => note.id === addId);

      if (existingNote) {
        setValue('title', existingNote.title);
        setValue('details', existingNote.details);
        setProductionDate(moment(existingNote.productionDate, 'jYYYY/jMM/jDD').toDate());
        setProductionTime(moment(existingNote.productionTime, 'HH:mm').toDate());
        setExpirationDate(moment(existingNote.expirationDate, 'jYYYY/jMM/jDD').toDate());
        setExpirationTime(moment(existingNote.expirationTime, 'HH:mm').toDate());
      }
    }
  }, [addId, setValue]);

  const formatDate = (date: DateObject | null): string => {
    return date
      ? moment(date.toDate())
          .format("jYYYY/jMM/jDD")
          .replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
      : "";
  };

  const formatTime = (date: DateObject | null): string => {
    return date
      ? moment(date.toDate())
          .format("HH:mm")
          .replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
      : "";
  };

  const saveToLocalStorage = (data: IFormInputs) => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    if (addId) {
      const updatedNotes = notes.map((note: any) =>
        note.id === addId
          ? {
              ...note,
              ...data,
              productionDate: formatDate(productionDate),
              expirationDate: formatDate(expirationDate),
              productionTime: formatTime(productionTime),
              expirationTime: formatTime(expirationTime),
            }
          : note
      );
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    } else {
      const newNote = {
        id: uuidv4(),
        ...data,
        productionDate: formatDate(productionDate),
        expirationDate: formatDate(expirationDate),
        productionTime: formatTime(productionTime),
        expirationTime: formatTime(expirationTime),
      };
      notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    saveToLocalStorage(data);
    setModal(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg font-iransans">
      <h2 className="text-2xl font-bold text-center mb-6">
        فرم انتخاب تاریخ و زمان
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Title Field */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">عنوان:</label>
            <input
              type="text"
              {...register("title")}
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Details Field */}
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-medium text-gray-700">
              جزئیات:
            </label>
            <textarea
              {...register("details")}
              className={`p-3 h-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.details ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.details && (
              <p className="text-red-600 text-sm mt-1">
                {errors.details.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
                تاریخ تولید:
              </label>
              <DatePicker
                value={productionDate}
                onChange={(date) => {
                  setProductionDate(date);
                  setValue("productionDate", formatDate(date));
                }}
                calendar={persian as unknown as Calendar}
                locale={persian_fa as DatePickerLocale}
                placeholder="انتخاب تاریخ تولید"
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.productionDate ? "border-red-500" : "border-gray-300"
                }`}
                calendarPosition="bottom-right"
              />
              {errors.productionDate && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.productionDate.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
                ساعت تولید:
              </label>
              <DatePicker
                value={productionTime}
                onChange={(date) => {
                  setProductionTime(date);
                  setValue("productionTime", formatTime(date));
                }}
                disableDayPicker
                format="HH:mm"
                plugins={[<TimePicker key="time-picker" hideSeconds />]}
                calendar={false}
                locale={persian_fa as DatePickerLocale}
                placeholder="انتخاب ساعت تولید"
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.productionTime ? "border-red-500" : "border-gray-300"
                }`}
                calendarPosition="bottom-right"
              />
              {errors.productionTime && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.productionTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
                تاریخ انقضا:
              </label>
              <DatePicker
                value={expirationDate}
                onChange={(date) => {
                  setExpirationDate(date);
                  setValue("expirationDate", formatDate(date));
                }}
                calendar={persian as unknown as Calendar}
                locale={persian_fa as DatePickerLocale}
                placeholder="انتخاب تاریخ انقضا"
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.expirationDate ? "border-red-500" : "border-gray-300"
                }`}
                calendarPosition="bottom-right"
              />
              {errors.expirationDate && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.expirationDate.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
                ساعت انقضا:
              </label>
              <DatePicker
                value={expirationTime}
                onChange={(date) => {
                  setExpirationTime(date);
                  setValue("expirationTime", formatTime(date));
                }}
                disableDayPicker
                format="HH:mm"
                plugins={[<TimePicker key="time-picker" hideSeconds />]}
                calendar={false}
                locale={persian_fa as DatePickerLocale}
                placeholder="انتخاب ساعت انقضا"
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.expirationTime ? "border-red-500" : "border-gray-300"
                }`}
                calendarPosition="bottom-right"
              />
              {errors.expirationTime && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.expirationTime.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {addId ? "ویرایش" : "ارسال"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFormV2;
