import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
async function getStockData() {
  try {
    const response = await axios.get(
      "https://dsebd.org/latest_share_price_scroll_l.php"
    );
    const html = response.data;
    const $ = cheerio.load(html);
    const stockData: any[] = [];

    $("table.table-bordered")
      .find("tr")
      .each((index, element) => {
        if (index === 0) return; // Skip table header

        const tds = $(element).find("td");
        const stock = {
          symbol: $(tds[1]).text().trim().replace(",", ""),
          ltp: $(tds[2]).text().trim().replace(",", ""),
          high: $(tds[3]).text().trim().replace(",", ""),
          low: $(tds[4]).text().trim().replace(",", ""),
          close: $(tds[5]).text().trim().replace(",", ""),
          ycp: $(tds[6]).text().trim().replace(",", ""),
          change: $(tds[7]).text().trim().replace("--", "0"),
          trade: $(tds[8]).text().trim().replace(",", ""),
          value: $(tds[9]).text().trim().replace(",", ""),
          volume: $(tds[10]).text().trim().replace(",", ""),
        };
        stockData.push(stock);
      });

    return stockData;
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
}

async function getDsexData(symbol: string, retryCount = 1, pause = 1) {
  for (let i = 0; i < retryCount; i++) {
    try {
      await new Promise((resolve) => setTimeout(resolve, pause));
      const response = await axios.get("https://dsebd.org/dseX_share.php");
      if (response.status !== 200) {
        continue;
      }

      const $ = cheerio.load(response.data);
      const quotes: any[] = [];
      $("table.table-bordered")
        .find("tr")
        .each((index, element) => {
          if (index === 0) return; // Skip header row

          const cols = $(element).find("td");
          const quote = {
            symbol: $(cols[1]).text().trim().replace(",", ""),
            ltp: $(cols[2]).text().trim().replace(",", ""),
            high: $(cols[3]).text().trim().replace(",", ""),
            low: $(cols[4]).text().trim().replace(",", ""),
            close: $(cols[5]).text().trim().replace(",", ""),
            ycp: $(cols[6]).text().trim().replace(",", ""),
            change: $(cols[7]).text().trim().replace("--", "0"),
            trade: $(cols[8]).text().trim().replace(",", ""),
            value: $(cols[9]).text().trim().replace(",", ""),
            volume: $(cols[10]).text().trim().replace(",", ""),
          };
          quotes.push(quote);
        });

      if (symbol) {
        return quotes.filter(
          (q) => q.symbol.toUpperCase() === symbol.toUpperCase()
        );
      }
      return quotes;
    } catch (error) {
      console.error("Error fetching DSEX data:", error);
    }
  }
  return [];
}

async function getHistData(
  start: string,
  end: string,
  code = "All Instrument"
) {
  const data = {
    startDate: start,
    endDate: end,
    inst: code,
    archive: "data",
  };

  try {
    let response = await axios.get("https://dsebd.org/day_end_archive.php", {
      params: data,
    });
    // if (response.status !== 200) {
    //   response = await axios.get("https://dsebd.com.bd/day_end_archive.php", {
    //     params: data,
    //   });
    // }

    // fs.writeFileSync("raw.html", response.data);
    console.log("data", data);

    const $ = cheerio.load(response.data);
    const quotes: any[] = [];
    $("table.table-bordered")
      .find("tbody tr")
      .each((index, element) => {
        const cols = $(element).find("td");
        const quote = {
          number: $(cols[0]).text().trim(),
          date: $(cols[1]).text().trim(),
          tradingCode: $(cols[2]).text().trim(),
          ltp: $(cols[3]).text().trim(),
          high: $(cols[4]).text().trim(),
          low: $(cols[5]).text().trim(),
          openp: $(cols[6]).text().trim(),
          closep: $(cols[7]).text().trim(),
          ycp: $(cols[8]).text().trim(),
          trade: $(cols[9]).text().trim(),
          value: $(cols[10]).text().trim(),
          volume: $(cols[11]).text().trim(),
        };
        quotes.push(quote);
      });

    return quotes;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
}

// Usage example
getHistData("2024-01-01", "2024-01-05", "GP").then((data) => {
  console.log(data);
  fs.writeFileSync("history.json", JSON.stringify(data, undefined, 2));
});

// getDsexData().then((r) => console.log(r));
