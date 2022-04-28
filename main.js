import fetch from 'node-fetch';

const ucla = [
  "Ernest Abers",
  "Paulo Alves",
  "Katsushi Arisaka",
  "Michalis Bachtis",
  "Eric Becklin",
  "Zvi Bern",
  "Dolores Bozovic",
  "Stuart Brown",
  "Robijn Bruinsma",
  "Charles Buchanan",
  "Wes Campbell",
  "Troy Carter",
  "Sudip Chakravarty",
  "W. Gilbert Clark",
  "John Cornwall",
  "Ferdinand Coroniti",
  "Robert Cousins",
  "Eric D'Hoker",
  "Tuan Do",
  "Thomas Dumitrescu",
  "Sergio Ferrara",
  "Michael Fitzgerald",
  "Christian Fronsdal",
  "Steven Furlanetto",
  "Walter Gekelman",
  "Graciela Gelmini",
  "Andrea Ghez",
  "George Grüner",
  "Christopher Gutiérrez",
  "Michael Gutperle",
  "Paul Hamilton",
  "Brad Hansen",
  "Jay Hauser",
  "Karoly Holczer",
  "Huan Huang",
  "Eric Hudson",
  "Hongwen Jiang",
  "Alvine Kamaha",
  "Zhongbo Kang",
  "Anshul Kogar",
  "Per Kraus",
  "Alexander Kusenko | He/Him/His",
  "James Larkin",
  "Alexander Levine",
  "Matthew Malkan",
  "Ian McLean",
  "Mayank Mehta",
  "Jianwei (John) Miao ",
  "George Morales",
  "Warren Mori",
  "Mark Morris",
  "Pietro Musumeci",
  "Smadar Naoz | She/Her",
  "William Newman",
  "Ni Ni",
  "Christoph Niemann",
  "Rene Ong",
  "C. Kumar Patel",
  "Claudio Pellegrini",
  "Erik Petigura",
  "Seth Putterman",
  "B.C. Regan",
  "James Rosenzweig",
  "Rahul Roy",
  "Joseph Rudnick",
  "David Saltzberg | He/Him",
  "Joshua Samani",
  "Alice Shapley",
  "Qianhui Shi",
  "Mikhail Solon ",
  "Reiner Stenzel",
  "Terry Tomboulis",
  "Tommaso Treu",
  "Yaroslav Tserkovnyak",
  "Jean Turner",
  "Slava Turyshev",
  "Roger Ulrich",
  "Vladimir Vassiliev",
  "Shenshen Wang",
  "Gary Williams",
  "Chun Wa Wong",
  "Alfred Wong",
  "Edward Wright",
  "Giovanni Zocchi",
  "Benjamin Zuckerman",
  "Andrea Ghez"
];

const madison = [
  "Yang Bai",
  "A. B. Balantekin",
  "Vernon Barger",
  "Keith Bechtol",
  "Uwe Bergmann",
  "Kevin Black",
  "Stanislav Boldyrev",
  "Tulika Bose",
  "Victor Brar",
  "Duncan Carlsmith",
  "Daniel J Chung",
  "Sridhara Dasu",
  "Jan Egedal",
  "Mark A Eriksson",
  "Lisa L Everett",
  "Ke Fang",
  "Cary Forest",
  "Pupa Gilbert",
  "Francis L Halzen",
  "Kael D Hanson",
  "Akikazu Hashimoto",
  "Matthew F Herndon",
  "Robert J Joynt",
  "Albrecht Karle",
  "Shimon Kolkowitz",
  "James E Lawler",
  "Alex Levchenko",
  "Lu Lu",
  "Dan McCammon",
  "Robert F McDermott",
  "Moritz Münchmeyer",
  "Marshall F Onellion",
  "Yibin Pan",
  "Brian Rebel",
  "Mark Rzchowski",
  "Mark Saffman",
  "John Sarff",
  "Gary Shiu",
  "Paul W Terry",
  "Peter T Timbie",
  "Justin Vandenbroucke",
  "Maxim G Vavilov",
  "Thad G Walker",
  "Sau Lan Yu Wu",
  "Deniz Yavuz",
  "Ellen G Zweibel"
];

async function pause() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 250);
  })
}

async function results(school, name) {
  const results = [];
  let src = `${school} ${name} education`;
  console.log("searching", src)
  try {
    const url = `https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyAvocCXaYui0-5DFF6_o6dxW2SMkrv3kLs&cx=9225e55ffdd814304&q=${school}%20${name}%20education`;
    console.log("url", url);
    let res = await (await fetch(url)).json();
    if (res && res.items) {
      for (let link of res.items) {
        results.push(`${school}, ${name}, ${link.title}, ${link.link}, ${link.snippet}`)
      }
    } else {
      console.log("not iterable", JSON.stringify(res, null, 2));
    }
  } catch (err) {
    console.error(err);
  }
  return results;
}

async function compile() {
  let csv = [];

  for (let name of ucla) {
    csv = [csv, ...await results("ucla", name)];
    await pause();
  }
  
  for (let name of madison) {
    csv = [csv, ...await results("madison", name)];
    await pause();
  }
  
  console.log("csv", JSON.stringify(csv, null, 2));
}

compile();