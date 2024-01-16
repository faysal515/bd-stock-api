import axios from "../utils/axiosConfig";
import { CheerioAPI, load as CheerioLoad } from "cheerio";
import { DHAKA_STOCK_URLS } from "../env";
import { Service } from "typedi";

interface Quote {
  // Define the properties of Quote based on your data structure
  // For example:
  symbol: string;
  ltp: string;
  high: string;
  low: string;
  close: string;
  ycp: string;
  change: string;
  trade: string;
  value: string;
  volume: string;
  // Add other properties as needed
}

interface HistData {
  // Define the properties for historical data
  number: string;
  date: string;
  tradingCode: string;
  ltp: string;
  high: string;
  low: string;
  openp: string;
  closep: string;
  ycp: string;
  trade: string;
  value: string;
  volume: string;
}

@Service()
export class StockDataService {
  private async fetchAndParseHtml(
    url: string,
    params: any = {}
  ): Promise<CheerioAPI> {
    try {
      const response = await axios.get(url, { params });
      if (response.status !== 200) {
        throw new Error(`Failed to fetch data: Status Code ${response.status}`);
      }
      return CheerioLoad(response.data);
    } catch (error) {
      console.error("Error in fetchAndParseHtml:", error);
      throw error;
    }
  }

  private getCurrentTradingCodes($: CheerioAPI): string[] {
    const headers: string[] = [];
    $("table.table.table-bordered tr")
      .first()
      .find("th")
      .each((_, th) => {
        headers.push($(th).text().trim());
      });
    return headers;
  }

  async parseTableRows<T extends Record<string, any>>(
    $: CheerioAPI,
    selector: string,
    skipFirstRow: boolean = true
  ): Promise<T[]> {
    const headers = this.getCurrentTradingCodes($);
    const data: T[] = [];

    $(selector).each((index, element) => {
      if (index === 0 && skipFirstRow) return;

      const tds = $(element).find("td");
      let rowData: T = {} as T;

      headers.forEach((header, idx) => {
        // @ts-ignore
        rowData[header] = $(tds[idx]).text().trim().replace(",", "") as any;
      });

      data.push(rowData);
    });

    return data;
  }
  async getStockData(): Promise<any[]> {
    const url = DHAKA_STOCK_URLS.LATEST_DATA;
    const $ = await this.fetchAndParseHtml(url);
    return this.parseTableRows<any>($, "table.table-bordered tr");
  }

  async getDsexData(symbol: string | undefined): Promise<any[]> {
    const url = DHAKA_STOCK_URLS.DSEX;

    try {
      const $ = await this.fetchAndParseHtml(url);
      let data = await this.parseTableRows<any>($, "table.table-bordered tr");
      if (symbol) {
        data = data.filter(
          (d) =>
            d["Symbol"] && d["Symbol"].toUpperCase() === symbol.toUpperCase()
        );
      }
      return data;
    } catch (error) {
      console.error("Error fetching DSEX data:", error);
      return [];
    }
  }

  async getTop30(): Promise<any[]> {
    const url = DHAKA_STOCK_URLS.TOP_30;

    try {
      const $ = await this.fetchAndParseHtml(url);
      let data = await this.parseTableRows<any>($, "table.table-bordered tr");

      return data;
    } catch (error) {
      console.error("Error fetching DSEX data:", error);
      return [];
    }
  }
  async getHistData(
    start: string,
    end: string,
    code = "All Instrument"
  ): Promise<any[]> {
    const url = DHAKA_STOCK_URLS.HISTORIACAL_DATA;
    const params = {
      startDate: start,
      endDate: end,
      inst: code,
      archive: "data",
    };
    const fullUrl = `${url}?${new URLSearchParams(params).toString()}`;

    const $ = await this.fetchAndParseHtml(fullUrl);
    return this.parseTableRows<any>($, "table.table-bordered tbody tr", false);
  }
}
