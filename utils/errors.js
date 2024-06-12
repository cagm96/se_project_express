const invalid_Data_400 = 400;
// 400 — invalid data passed to the methods for creating an
//item/user or updating an item, or invalid ID passed to the params.

const item_NotFound_404 = 404;
// 404 — there is no user or clothing item with the requested id,
//or the request was sent to a non-existent address.

const default_Error_500 = 500;
// 500 — default error. Accompanied by the message:
// "An error has occurred on the server."

module.exports = {
  invalid_Data_400,
  item_NotFound_404,
  default_Error_500,
};
