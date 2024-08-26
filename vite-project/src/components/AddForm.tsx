import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// استفاده از `require` برای فراخوانی `moment-jalaali`
// const moment = require('moment-jalaali');
import moment from 'moment-jalaali';
import 'moment/locale/fa';
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

interface IFormInputs {
  title: string;
  desc: string;
  productionDate: Date | null;
  expirationDate: Date | null;
}

const schema = yup.object().shape({
  title: yup.string().required('لطفا فیلد مورد نظر را پر کنید'),
  desc: yup.string().required('لطفا فیلد مورد نظر را پر کنید'),
  productionDate: yup.date().nullable().required('لطفا فیلد مورد نظر را پر کنید'),
  expirationDate: yup.date().nullable().required('لطفا فیلد مورد نظر را پر کنید'),
});

const AddForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInputs>({
    resolver: yupResolver(schema) as any, // اگر مشکل تایپ وجود داشت، `as any` اضافه کنید
  });

  const [productionDate, setProductionDate] = useState<Date | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log({
      ...data,
      productionDate: productionDate ? moment(productionDate).format('jYYYY/jMM/jDD') : null,
      expirationDate: expirationDate ? moment(expirationDate).format('jYYYY/jMM/jDD') : null,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg font-iransans">
      <h2 className="text-2xl font-bold mb-6 text-center">فرم افزودن اطلاعات</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium text-gray-700">عنوان:</label>
          <input 
            type="text" 
            {...register('title')} 
            className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium text-gray-700">جزئیات:</label>
          <input 
            type="text" 
            {...register('desc')} 
            className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.desc ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.desc && <p className="text-red-600 text-sm mt-1">{errors.desc.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium text-gray-700">تاریخ تولید:</label>
          <DatePicker
            selected={productionDate}
            onChange={(date) => {
              setProductionDate(date);
              setValue('productionDate', date);
            }}
            className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.productionDate ? 'border-red-500' : 'border-gray-300'
            }`}
            dateFormat="P"
            calendarStartDay={6}
            placeholderText="تاریخ تولید"
            locale="fa"
          />
          {errors.productionDate && <p className="text-red-600 text-sm mt-1">{errors.productionDate.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium text-gray-700">تاریخ انقضا:</label>
          <DatePicker
            selected={expirationDate}
            onChange={(date) => {
              setExpirationDate(date);
              setValue('expirationDate', date);
            }}
            className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.expirationDate ? 'border-red-500' : 'border-gray-300'
            }`}
            dateFormat="P"
            calendarStartDay={6}
            placeholderText="تاریخ انقضا"
            locale="fa"
          />
          {errors.expirationDate && <p className="text-red-600 text-sm mt-1">{errors.expirationDate.message}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default AddForm;
