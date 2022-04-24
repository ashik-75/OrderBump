import returnSessionData from "../index.js";

const getSession = async (req, res) => {
  const decode = await returnSessionData(req, res);
  console.log(decode);
  res.send("checking");
};

export default getSession;
