"use strict";

var deleteText = document.querySelectorAll('.fa-trash');
var thumbText = document.querySelectorAll('.fa-thumbs-up');
var updateText = document.querySelectorAll('.fas fa-pencil-alt');
Array.from(deleteText).forEach(function (element) {
  element.addEventListener('click', deleteRapper);
});
Array.from(thumbText).forEach(function (element) {
  element.addEventListener('click', addLike);
}); // updateText.addEventListener('click', (_) => {
// 	fetch('/updateRapper', {
// 		method: 'put',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({
// 			stageNameS: sName,
// 			birthNameS: bName,
// 		}),
// 	})
// })

function deleteRapper() {
  var sName, bName, response, data;
  return regeneratorRuntime.async(function deleteRapper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sName = this.parentNode.childNodes[1].innerText;
          bName = this.parentNode.childNodes[3].innerText;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch('deleteRapper', {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              stageNameS: sName,
              birthNameS: bName
            })
          }));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          console.log(data);
          location.reload();
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, this, [[2, 13]]);
}

function addLike() {
  var sName, bName, tLikes, response, data;
  return regeneratorRuntime.async(function addLike$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sName = this.parentNode.childNodes[1].innerText;
          bName = this.parentNode.childNodes[3].innerText;
          tLikes = Number(this.parentNode.childNodes[5].innerText);
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch('addOneLike', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              stageNameS: sName,
              birthNameS: bName,
              likesS: tLikes
            })
          }));

        case 6:
          response = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context2.sent;
          console.log(data);
          location.reload();
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this, [[3, 14]]);
}