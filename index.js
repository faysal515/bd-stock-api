// import { getDsexData } from "./stock.js";

// import { sendToKafka } from "./kafka.js";

// const INTERVAL_MS = 3000; // 3 seconds

// async function main() {
//   setInterval(async () => {
//     try {
//       console.log("running scraper");
//       const data = await getDsexData();
//       await sendToKafka(data);
//     } catch (error) {
//       console.error("Error in main loop:", error);
//     }
//   }, INTERVAL_MS);
// }

// main();
