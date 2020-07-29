const render = $ => {
  $('#purehtml-container').html('Hello, render with jQuery');
  return Promise.resolve();
};

(global => {
  global['pureHTMLWithEntry'] = {
    bootstrap: () => {
      console.log('pureHTMLWithEntry bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('pureHTMLWithEntry mount');
      return render($);
    },
    unmount: () => {
      console.log('pureHTMLWithEntry unmount');
      return Promise.resolve();
    },
  };
})(window);
