import { JsonController, Get, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { StockDataService } from "../services/DsePriceService"; // Adjust the path as necessary
import { apiResponse } from "../utils/helpers";

@JsonController("/v1/price")
@Service()
export class PriceController {
  constructor(private stockDataService: StockDataService) {}

  @Get("/hello")
  getHello() {
    return { message: "Hello World" };
  }

  @Get("/stockdata")
  async getStockData() {
    return apiResponse(await this.stockDataService.getStockData());
  }

  @Get("/dsexdata")
  async getDsexData(@QueryParam("symbol") symbol?: string) {
    return apiResponse(await this.stockDataService.getDsexData(symbol));
  }

  @Get("/histdata")
  async getHistData(
    @QueryParam("start") start: string,
    @QueryParam("end") end: string,
    @QueryParam("code") code: string = "All Instrument"
  ) {
    return apiResponse(
      await this.stockDataService.getHistData(start, end, code)
    );
  }
}
