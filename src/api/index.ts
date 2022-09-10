import { Rates } from "types";
import { get, getFromXml } from "./service";

export const getRates = () => get('https://www.cbr-xml-daily.ru/daily_json.js');
export const getRatesEng = (): Promise<Rates> => getFromXml('https://www.cbr-xml-daily.ru/daily_eng_utf8.xml');
// export const getRatesEng = () => getFromXml('http://www.cbr.ru/scripts/XML_daily.asp');
// export const getRatesEng = () => getFromXml('https://www.cbr.ru/scripts/XML_daily_eng.asp');
