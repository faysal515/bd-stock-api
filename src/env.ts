const url = process.env.DSE_BASE_URL;

export const DHAKA_STOCK_URLS = {
  LATEST_DATA: `${url}/latest_share_price_scroll_l.php`,
  TOP_30: `${url}/dse30_share.php`,
  DSEX: `${url}/dseX_share.php`,
  HISTORIACAL_DATA: `${url}/day_end_archive.php`,
};
