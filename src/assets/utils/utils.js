export const throttle = (callback, ms) => {
  let args, _this;

  return function () {
    if (args === void 0) {
      args = arguments;
      _this = this;

      setTimeout(function () {
        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }

        args = void 0;
      }, ms);
    }
  }
};

export const CustomeSetting = {
  get () {

  },
  set () {

  }
};
