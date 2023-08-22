import { BookManager } from './modules/BookManager.js';
import { DateTime } from './luxon.js';

const bookManagerDisplay = new BookManager();
bookManagerDisplay.displayBooks();

// UTC +1 program time zone!

const dateAndTime = () => {
    const now = DateTime.local();
    const formattedDateTime = now.toFormat('LLLL dd, yyyy HH:mm:ss');
    document.getElementById('date-time').textContent = formattedDateTime;
  };
  
  dateAndTime();
  setInterval(dateAndTime, 1000);