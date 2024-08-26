import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-jalaali';
import 'moment/locale/fa';
import { v4 as uuidv4 } from 'uuid'; // وارد کردن تابع uuid

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false }); // استفاده از اعداد انگلیسی

interface AddFormProps {
  modal: boolean;        
  setModal: (open: boolean) => void;
}

interface IFormInputs {
  title: string;
  details: string;
  productionDate: string; 
  expirationDate: string; 
}

const schema = yup.object().shape({
  title: yup.string().required('لطفا فیلد مورد نظر را پر کنید'),
  details: yup.string().required('لطفا فیلد مورد نظر را پر کنید'),
  productionDate: yup.string().required('لطفا فیلد مورد نظر را پر کنید'),
  expirationDate: yup.string().required('لطفا فیلد مورد نظر را پر کنید'),
});

const AddForm: React.FC<AddFormProps> = ({ modal, setModal }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInputs>({
    resolver: yupResolver(schema) as any,
  });

  const [productionDate, setProductionDate] = useState<Date | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    return moment(date).format('jYYYY/jMM/jDD');
  };

  const saveToLocalStorage = (data: IFormInputs) => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const newNote = {
      id: uuidv4(), // تولید شناسه یونیک
      ...data,
      productionDate: formatDate(productionDate),
      expirationDate: formatDate(expirationDate),
    };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    saveToLocalStorage(data);
    setModal(false);
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg font-iransans h-full">
      <h2 className="text-2xl font-bold mb-1 text-center">فرم افزودن اطلاعات</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">عنوان:</label>
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
            {...register('details')} 
            className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.details ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.details && <p className="text-red-600 text-sm mt-1">{errors.details.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium text-gray-700">تاریخ تولید:</label>
          <DatePicker
            selected={productionDate}
            onChange={(date) => {
              setProductionDate(date);
              setValue('productionDate', formatDate(date)); 
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
              setValue('expirationDate', formatDate(date)); 
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
