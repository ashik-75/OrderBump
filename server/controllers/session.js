import { Session as ShopifySession } from "@shopify/shopify-api/dist/auth/session/session.js";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import OrderBump from "../models/OrderBump.js";
const mongouri = process.env.MONGO_URI;

export async function storeCallback(session) {
  console.log("store callback here", session);
  addShopUrl(session);
  const client = await MongoClient.connect(mongouri).catch((err) => {
    throw new Error(err);
  });

  if (!client) return;
  try {
    const db = client.db("amazingBump");
    let collection = db.collection("users");
    let newSession = { ...session };

    // TODO: Create users

    await collection.findOneAndUpdate(
      { shop: session.shop },
      { $set: newSession },
      { upsert: true },
      (err, res) => {
        if (err) throw new Error(err);
        console.log("session inserted/updated successfully");
        client.close();
      }
    );
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadCallback(id) {
  console.log("load callback id", id);
  let sessionDB;
  let session = new ShopifySession(id);
  // console.log("load callback", session);
  const client = await MongoClient.connect(mongouri).catch((err) => {
    // console.log(err);
  });
  if (!client) return;
  try {
    const db = client.db("amazingBump");
    let collection = db.collection("users");
    // console.log("id after split", id.split("_")[0]);
    let dbid;
    dbid = await collection.findOne({ id: id });
    if (!dbid) {
      dbid = await collection.findOne({ shop: id.split("_")[0] });
    }
    // console.log("shop from callback", dbid);
    let result = await collection.findOne({
      shop: dbid.shop || id.split("_")[0],
    });
    sessionDB = result;
    session.id = result.id;
    session.shop = result.shop;
    session.state = result.state;
    session.isOnline = result.isOnline;
    session.scope = result.scope;
    session.accessToken = result.accessToken;
    session.expires = result.expires ? new Date(result.expires) + 1 : null;
    session.onlineAccessInfo = result.onlineAccessInfo;
    if (result) {
      client.close();
      return result;
    } else {
      return undefined;
    }
  } catch (err) {
    throw new Error(err);
  }
}
export function deleteCallback(id) {
  return true;
}

async function addShopUrl(session) {
  try {
    const db = await mongoose.connect(mongouri);

    await OrderBump.findOneAndUpdate(
      { shopUrl: session?.shop },
      { $set: { shopUrl: session?.shop } },
      { upsert: true }
    );

    await db.disconnect();
  } catch (error) {
    console.log(error?.message);
  }
}
