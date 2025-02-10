/**
 * src\services\counter.ts
 * Cunter:\
 *  - Increases the counter by 1 when user will be open first page and else plus 1 when open else of some pages.\
 *  - Reduses the counter by 1 when user will be closing  every one of pages. \
 * And when the user will be closed on the last our service  heard an event and will send message to the server. \
 * Here, we say to the server what user was logout
 *
 */
//Unique key for save a count of the tabs/pages
const hostKey = 'tabCountForHost';

// Increases the count
function incrementTabCount() {
  let count: number | string = localStorage.getItem(hostKey) || '0';
  count = parseInt(count) + 1;
  localStorage.setItem(hostKey, String(count));
}

// Reduses the count
function decrementTabCount() {
  let count: number | string = localStorage.getItem(hostKey) || '0';
  count = parseInt(count) - 1;
  localStorage.setItem(hostKey, String(count));

  // Если счётчик равен нулю, значит, последняя вкладка закрыта
  if (count === 0) {
    console.log('Последняя вкладка для этого хоста закрыта.');
    // Здесь можно выполнить дополнительные действия
  }
}

// Run the counter function on load of the page
incrementTabCount();

// Run the counter if close the tab/page.
window.addEventListener('beforeunload', () => {
  decrementTabCount();
});
