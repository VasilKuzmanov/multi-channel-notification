import React, { useState } from 'react';
 
 
const NotificationDatePicker = () => {
  
  const [selectedDays, setSelectedDays] = useState({
    phoneFromDay: undefined,
    phoneToDay: undefined,
    emailFromDay: undefined,
    emailToDay: undefined,
    appFromDay: undefined,
    appToDay: undefined,
  });
 
 
  const getAllSelectedDays = () => {
    return Object.values(selectedDays).filter(day => day !== undefined);
  };
 
 
  const getValidOptions = (type) => {
    const allSelectedDays = getAllSelectedDays();
    const { emailFromDay, emailToDay, phoneFromDay, phoneToDay } = selectedDays;
  
    switch (type) {
      case 'emailFrom':
        return [2, 3, 4, 5, 6, 7]
          .filter(day => !allSelectedDays.includes(day))
          .filter(day => phoneFromDay ? day < phoneFromDay : true)
          .filter(day => emailToDay ? emailToDay - day >= 2 : true);
  
      case 'emailTo':
        return [4, 5, 6, 7]
          .filter(day => !allSelectedDays.includes(day))
          .filter(day => phoneToDay ? day < phoneToDay : true)
          .filter(day => emailFromDay ? day - emailFromDay >= 2 : true);
  
      case 'phoneFrom':
        return [3, 4, 5, 6, 7]
          .filter(day => !allSelectedDays.includes(day))
          .filter(day => emailFromDay ? day > emailFromDay : true)
          .filter(day => phoneToDay ? phoneToDay - day >= 2 : true);
  
      case 'phoneTo':
        return [5, 6, 7]
          .filter(day => !allSelectedDays.includes(day))
          .filter(day => emailToDay ? day > emailToDay : true)
          .filter(day => phoneFromDay ? day - phoneFromDay >= 2 : true);
  
      default:
        return [2, 3, 4, 5, 6, 7]
    }
  };
 
 
  const handleDayChange = (e) => {
    const { id, value } = e.target;
    setSelectedDays(prevState => ({
      ...prevState,
      [id]: Number(value),
    }));
  };
 
 
  const renderOptions = (type) =>
    getValidOptions(type).map((day) => (
      <option key={type} value={day}>
        Ден {day}
      </option>
    ));
  
 
  return (
    <div>
      <h2>Телефонно обаждане</h2>
      <span>
        <label htmlFor="phoneFromDay">Ден:</label>
        <select id="phoneFromDay" value={selectedDays.phoneFromDay} onChange={handleDayChange}>
          <option value={selectedDays.phoneFromDay}>Избери</option>
          {renderOptions('phoneFrom')}
        </select>
        <input value={selectedDays.phoneFromDay}/>
      </span>
      <span>
        <label htmlFor="phoneToDay">Ден:</label>
        <select id="phoneToDay" value={selectedDays.phoneToDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions('phoneTo')}
        </select>
        <input value={selectedDays.phoneToDay}/>
      </span>
 
      <h2>Известие по имейл</h2>
      <span>
        <label htmlFor="emailFromDay">Ден:</label>
        <select id="emailFromDay" value={selectedDays.emailFromDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions('emailFrom')}
        </select>
        <input value={selectedDays.emailFromDay}/>
      </span>
 
      <span>
        <label htmlFor="emailToDay">Ден:</label>
        <select id="emailToDay" value={selectedDays.emailToDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions('emailTo')}
        </select>
        <input value={selectedDays.emailToDay}/>
      </span>
 
      <h2>Известие в приложението на телефона</h2>
      <span>
        <label htmlFor="appFromDay">Ден:</label>
        <select id="appFromDay" value={selectedDays.appFromDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions('appFrom')}
        </select>
        <input value={selectedDays.appFromDay}/>
      </span>
 
      <span>
        <label htmlFor="appToDay">Ден:</label>
        <select id="appToDay" value={selectedDays.appToDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions('appTwo')}
        </select>
        <input value={selectedDays.appToDay}/>
      </span>
    </div>
  );
};

export default NotificationDatePicker;
