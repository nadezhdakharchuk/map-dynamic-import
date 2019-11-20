const Adapter = require('enzyme-adapter-react-16');

require('enzyme').configure({ adapter: new Adapter() });

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
