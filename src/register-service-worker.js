if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Todo-app/sw.js', {scope: '/Todo-app/'});
  });
}

// if (navigator.serviceWorker) {
//   navigator.serviceWorker.register()
// }