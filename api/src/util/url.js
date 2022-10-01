const generateUrl = (url) => {
  return url.replace(/ /g, "_");
};
const ungenerateUrl = (url) => {
  return url.replace(/_/g, " ");
};
module.exports = { generateUrl, ungenerateUrl };
