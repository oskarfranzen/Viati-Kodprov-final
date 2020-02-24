import React from 'react'
import DatePicker from 'react-datepicker';

interface IStartDatePickerProps {
    startDate: Date,
    onUpdateStartDate: (date: Date) => void
    className?: string
};

export const StartDatePicker: React.FunctionComponent<IStartDatePickerProps> = ({ startDate, onUpdateStartDate, className }: IStartDatePickerProps) => {
    return (
        <DatePicker
            className={className}
            selected={startDate} onChange={(date) => {
                var newDate = date || new Date();
                onUpdateStartDate(newDate);
            }} />
    );
};