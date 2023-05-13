import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getOffers(query) {
  await fakeNetwork(`getOffers:${query}`);
  console.log("getting offers")
  let offers = await localforage.getItem("offers");
  if (!offers) offers = [];
  if (query) {
    offers = matchSorter(ofers, query, { keys: ["title", "description"] });
  }
  return offers.sort(sortBy("title", "createdAt"));
}

export async function createOffer() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let offer = { 
    id, 
    title: "Offer Title " +  getRandom() , 
    description: "Offer Description " +  getRandom() , 
    createdAt: Date.now() 
  };
  let offers = await getOffers();
  offers.unshift(offer);
  await set(offers);
  console.log("created offer " + offer.id)
  return offer;
}

export async function getOffer(id) {
  console.log("getting offer " + id)
  await fakeNetwork(`offer:${id}`);
  let offers = await localforage.getItem("offers");
  let offer = offers.find(offer => offer.id === id);
  return offer ?? null;
}

export async function updateOffer(id, updates) {
  await fakeNetwork();
  let offers = await localforage.getItem("offers");
  let offer = offers.find(offer => offer.id === id);
  if (!offer) throw new Error("No offer found for", id);
  Object.assign(offer, updates);
  await set(offers);
  return offer;
}

export async function deleteOffer(id) {
  let offers = await localforage.getItem("offers");
  let offer = offers.find(offer => offer.id === id);
  if (index > -1) {
    offer.splice(index, 1);
    await set(offers);
    return true;
  }
  return false;
}

function set(offers) {
  return localforage.setItem("offers", offers);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}

function getRandom(){
  return Math.floor(Math.random()*10000*100)
}