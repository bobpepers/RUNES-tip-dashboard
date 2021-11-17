const toggleTheme = (value) => {
  const rootElement = document.getElementsByTagName('body')[0];
  if (value.theme === 'light' && rootElement) {
    rootElement.classList.remove('dark-theme');
    rootElement.classList.add('light-theme');
  } else if (value.theme === 'dark' && rootElement) {
    rootElement.classList.remove('light-theme');
    rootElement.classList.add('dark-theme');
  }
};

export default toggleTheme;
