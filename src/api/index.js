import { get, getFromXml } from "./service";

export const getRates = () => get('https://www.cbr-xml-daily.ru/daily_json.js');
export const getRatesEng = () => getFromXml('https://www.cbr-xml-daily.ru/daily_eng_utf8.xml');
