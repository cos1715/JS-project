if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Todo-app/sw.js', {scope: '/Todo-app/'});
  });
}