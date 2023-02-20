"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchQuery = fetchQuery;

function fetchQuery(_ref) {
  var data, url, service, _ref$qa, qa, formData, optionService, key, response;

  return regeneratorRuntime.async(function fetchQuery$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = _ref.data, url = _ref.url, service = _ref.service, _ref$qa = _ref.qa, qa = _ref$qa === void 0 ? false : _ref$qa;
          _context.prev = 1;
          formData = new FormData(); //tratamos segun sea objeto o array
          // console.log(typeof data)

          optionService = false;

          if (!Array.isArray(data)) {
            optionService = data.optionService && data.optionService;

            for (key in data) {
              formData.append(key, data[key]);
            }
          } else {
            data.forEach(function (item) {
              formData.append(item[0], item[1]);
              if (item[0] === "optionService") optionService = item[1];
            });
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(fetch( //Lo enviamos a la url y servicio seleccionado
          //cuando activamos qa, coloca una bandera para identificar en caso de que sea un solo service
          url + service + (qa && optionService ? "?" + optionService : ""), {
            method: "POST",
            body: formData
          }));

        case 7:
          response = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          return _context.abrupt("return", _context.sent);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          //Imprimimos el error, y retornamos array vacio
          console.error("Error:", _context.t0);
          return _context.abrupt("return", []);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
}