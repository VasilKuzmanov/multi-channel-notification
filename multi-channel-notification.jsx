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

    if (type === 'email') {
      const phoneFromDay = selectedDays.phoneFromDay;
      const phoneToDay = selectedDays.phoneToDay;
      return [1, 2, 3, 4, 5, 6, 7]
        .filter(day => !allSelectedDays.includes(day))
        .filter(day => phoneFromDay ? day < phoneFromDay : true)
        .filter(day => phoneToDay ? day < phoneToDay : true);
    }


    if (type === 'phone') {
      const emailFromDay = selectedDays.emailFromDay;
      const emailToDay = selectedDays.emailToDay;
      return [1, 2, 3, 4, 5, 6, 7]
        .filter(day => !allSelectedDays.includes(day))
        .filter(day => emailFromDay ? day > emailFromDay : true)
        .filter(day => emailToDay ? day > emailToDay : true);
    }

    return [1, 2, 3, 4, 5, 6, 7]
      .filter(day => !allSelectedDays.includes(day));
  };


  const handleDayChange = (e) => {
    const { id, value } = e.target;
    setSelectedDays(prevState => ({
      ...prevState,
      [id]: value === "" ? undefined : Number(value),
    }));
  };


  const renderOptions = (type) => {
    return getValidOptions(type).map((day, index) => {
      return (
        <option key={day} value={day}>
          Ден {day}
        </option>
      );
    });
  };
  

  return (
    <div>
      <h2>Телефонно обаждане</h2>
      <span>
        <label htmlFor="phoneFromDay">Ден:</label>
        <select id="phoneFromDay" value={selectedDays.phoneFromDay} onChange={handleDayChange}>
          <option value={selectedDays.phoneFromDay}>Избери</option>
          {renderOptions('phone')}
        </select>
        <input value={selectedDays.phoneFromDay}/>
      </span>
      <span>
        <label htmlFor="phoneToDay">Ден:</label>
        <select id="phoneToDay" value={selectedDays.phoneToDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions('phone')}
        </select>
        <input value={selectedDays.phoneToDay}/>
      </span>

      <h2>Известие по имейл</h2>
      <span>
        <label htmlFor="emailFromDay">Ден:</label>
        <select id="emailFromDay" value={selectedDays.emailFromDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions('email')}
        </select>
        <input value={selectedDays.emailFromDay}/>
      </span>

      <span>
        <label htmlFor="emailToDay">Ден:</label>
        <select id="emailToDay" value={selectedDays.emailToDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions('email')}
        </select>
        <input value={selectedDays.emailToDay}/>
      </span>

      <h2>Известие в приложението на телефона</h2>
      <span>
        <label htmlFor="appFromDay">Ден:</label>
        <select id="appFromDay" value={selectedDays.appFromDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions()}
        </select>
        <input value={selectedDays.appFromDay}/>
      </span>

      <span>
        <label htmlFor="appToDay">Ден:</label>
        <select id="appToDay" value={selectedDays.appToDay} onChange={handleDayChange}>
          <option value="">Избери</option>
          {renderOptions()}
        </select>
        <input value={selectedDays.appToDay}/>
      </span>
    </div>
  );
};

export default NotificationDatePicker;
