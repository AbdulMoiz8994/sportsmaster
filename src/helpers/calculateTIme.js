const calculateTimeRemaining=(verificationDate)=> {
    // Parse the given verification date
    const givenDate = new Date(verificationDate);
  
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the difference in milliseconds
    const timeDifference = currentDate - givenDate;
  
    // Convert the time difference to days, hours, minutes, and seconds
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    // Check if the given date is within the last 30 days
    const isWithinLast30Days = daysDifference <= 30;
  
    // Calculate remaining time to 30 days from the given date
    const remainingTime = 30 * 24 * 60 * 60 * 1000 - timeDifference; // 30 days in milliseconds
  
    const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
    return {
      isWithinLast30Days,
      elapsedTime: {
        days: daysDifference,
        hours: hoursDifference,
        minutes: minutesDifference,
        seconds: secondsDifference,
      },
      remainingTime: {
        days: remainingDays,
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      },
    };
};

module.exports=calculateTimeRemaining;