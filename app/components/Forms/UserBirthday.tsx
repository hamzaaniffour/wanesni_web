import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface DatePickerProps {
  id: string;
  value: string;
  onChange: (selectedDate: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ id, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const options: any = {
      dateFormat: 'd/m/Y',
      enableTime: false,
      defaultDate: value ? new Date(value) : null,
      onChange: (selectedDates: Date[]) => {
        onChange(selectedDates[0]);
      },
    };
  
    const picker = flatpickr(inputRef.current as HTMLInputElement, options);
    const flatpickrInput = document.querySelector('.flatpickr-input');
    if (flatpickrInput) {
    flatpickrInput.classList.add(
      'border-2',
      'border-blue-gray-200',
      'rounded',
      'p-2',
      'focus:outline-none',
      'focus:border-pink-500'
    );
  }
  
    return () => {
      picker.destroy();
    };
  }, [id, value, onChange]);
  

  return (
    <input
      ref={inputRef}
      placeholder='DD/MM/YYYY'
      id={id}
      type="text"
      className="w-full py-3 font-sans text-sm font-medium mb-3"
    />
  );
};

export default DatePicker;
