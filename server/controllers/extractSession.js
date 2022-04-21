import jwt from "jsonwebtoken";

// TODO: Extract data from session
function extractShopUrl(req) {
  const token = req.headers?.authorization?.split(" ")[1];
  const decode = jwt.decode(token, process.env?.SHOPIFY_API_SECRET);
  const shopUrl = decode?.dest.split("//")[1];

  return shopUrl;
}

export default extractShopUrl;
