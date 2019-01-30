import { Injectable } from '@angular/core';
import { IPantoneToHex } from './interfaces/i-pantone-to-hex';

@Injectable({
  providedIn: 'root'
})
export class PantoneToHexService {

  constructor() { }

  colorToRGBA(pantoneColor: IPantoneToHex, opacity: number = 0.5): string {
    return `rgba(${pantoneColor.r}, ${pantoneColor.g}, ${pantoneColor.b}, ${opacity})`;
  }

  getColor(pantoneName: string):IPantoneToHex {
    return this.getColorIdx(pantoneName)>=0 ? this.pantoneToHexDb[this.getColorIdx(pantoneName)] : null;
  }


  getNextColor(baseColor: string): IPantoneToHex {
    const actIdx = this.getColorIdx(baseColor);
    if(actIdx<0) {return; }
    return (actIdx< this.pantoneToHexDb.length) ? this.pantoneToHexDb[actIdx+1] : null;
  }

  getNextPaletteColors(baseColor: string, noOfColors?: number, step?: number): IPantoneToHex[] {
    let res: IPantoneToHex[] = [];
    noOfColors = noOfColors? noOfColors: 1;
    step = step ? step : 1;
    noOfColors =  noOfColors * step;

    const idx = this.getColorIdx(baseColor);
    if(idx<0) {return []}

    for(let i = idx; i < (idx + noOfColors); i+= step) {
      if(i <= this.pantoneToHexDb.length-1) {
        res.push(this.pantoneToHexDb[i]);
      }
    }
    return res;
  }

  getPrevColor(baseColor: string): IPantoneToHex {
    const actIdx = this.getColorIdx(baseColor);
    if(actIdx<0) { return; }
    return (actIdx-1)>=0 ? this.pantoneToHexDb[actIdx-1] : null;
  }


  private getColorIdx(srccolor: string): number {
    const isHex = srccolor.indexOf('#')>=0 ? true : false;
    const actColor: IPantoneToHex = this.pantoneToHexDb.find(f=>srccolor.toUpperCase()== (isHex ? f.hex : f.pantone));
    if(!actColor) {
      throw(`PANTONE_TO_HEX_SERVICE: [getColorIdx] nie znaleziono koloru ${srccolor}`);
    }
    return actColor ? this.pantoneToHexDb.indexOf(actColor) : -1;
  }
  

  private pantoneToHexDb: IPantoneToHex[] = [
    {
      pantone: "100",
      r: 244,
      g: 237,
      b: 124,
      hex: "#F4ED7C"
    },
    {
      pantone: "101",
      r: 244,
      g: 237,
      b: 71,
      hex: "#F4ED47"
    },
    {
      pantone: "102",
      r: 249,
      g: 232,
      b: 20,
      hex: "#F9E814"
    },
    {
      pantone: "103",
      r: 198,
      g: 173,
      b: 15,
      hex: "#C6AD0F"
    },
    {
      pantone: "104",
      r: 173,
      g: 155,
      b: 12,
      hex: "#AD9B0C"
    },
    {
      pantone: "105",
      r: 130,
      g: 117,
      b: 15,
      hex: "#82750F"
    },
    {
      pantone: "106",
      r: 247,
      g: 232,
      b: 89,
      hex: "#F7E859"
    },
    {
      pantone: "107",
      r: 249,
      g: 229,
      b: 38,
      hex: "#F9E526"
    },
    {
      pantone: "108",
      r: 249,
      g: 221,
      b: 22,
      hex: "#F9DD16"
    },
    {
      pantone: "109",
      r: 249,
      g: 214,
      b: 22,
      hex: "#F9D616"
    },
    {
      pantone: "110",
      r: 216,
      g: 181,
      b: 17,
      hex: "#D8B511"
    },
    {
      pantone: "111",
      r: 170,
      g: 147,
      b: 10,
      hex: "#AA930A"
    },
    {
      pantone: "112",
      r: 153,
      g: 132,
      b: 10,
      hex: "#99840A"
    },
    {
      pantone: "113",
      r: 249,
      g: 229,
      b: 91,
      hex: "#F9E55B"
    },
    {
      pantone: "114",
      r: 249,
      g: 226,
      b: 76,
      hex: "#F9E24C"
    },
    {
      pantone: "115",
      r: 249,
      g: 224,
      b: 76,
      hex: "#F9E04C"
    },
    {
      pantone: "116",
      r: 252,
      g: 209,
      b: 22,
      hex: "#FCD116"
    },
    {
      pantone: "116 2x",
      r: 247,
      g: 181,
      b: 12,
      hex: "#F7B50C"
    },
    {
      pantone: "117",
      r: 198,
      g: 160,
      b: 12,
      hex: "#C6A00C"
    },
    {
      pantone: "118",
      r: 170,
      g: 142,
      b: 10,
      hex: "#AA8E0A"
    },
    {
      pantone: "119",
      r: 137,
      g: 119,
      b: 25,
      hex: "#897719"
    },
    {
      pantone: "120",
      r: 249,
      g: 226,
      b: 127,
      hex: "#F9E27F"
    },
    {
      pantone: "1205",
      r: 247,
      g: 232,
      b: 170,
      hex: "#F7E8AA"
    },
    {
      pantone: "121",
      r: 249,
      g: 224,
      b: 112,
      hex: "#F9E070"
    },
    {
      pantone: "1215",
      r: 249,
      g: 224,
      b: 140,
      hex: "#F9E08C"
    },
    {
      pantone: "122",
      r: 252,
      g: 216,
      b: 86,
      hex: "#FCD856"
    },
    {
      pantone: "1225",
      r: 255,
      g: 204,
      b: 73,
      hex: "#FFCC49"
    },
    {
      pantone: "123",
      r: 255,
      g: 198,
      b: 30,
      hex: "#FFC61E"
    },
    {
      pantone: "1235",
      r: 252,
      g: 181,
      b: 20,
      hex: "#FCB514"
    },
    {
      pantone: "124",
      r: 224,
      g: 170,
      b: 15,
      hex: "#E0AA0F"
    },
    {
      pantone: "1245",
      r: 191,
      g: 145,
      b: 12,
      hex: "#BF910C"
    },
    {
      pantone: "125",
      r: 181,
      g: 140,
      b: 10,
      hex: "#B58C0A"
    },
    {
      pantone: "1255",
      r: 163,
      g: 127,
      b: 20,
      hex: "#A37F14"
    },
    {
      pantone: "126",
      r: 163,
      g: 130,
      b: 5,
      hex: "#A38205"
    },
    {
      pantone: "1265",
      r: 124,
      g: 99,
      b: 22,
      hex: "#7C6316"
    },
    {
      pantone: "127",
      r: 244,
      g: 226,
      b: 135,
      hex: "#F4E287"
    },
    {
      pantone: "128",
      r: 244,
      g: 219,
      b: 96,
      hex: "#F4DB60"
    },
    {
      pantone: "129",
      r: 242,
      g: 209,
      b: 61,
      hex: "#F2D13D"
    },
    {
      pantone: "130",
      r: 234,
      g: 175,
      b: 15,
      hex: "#EAAF0F"
    },
    {
      pantone: "130 2x",
      r: 226,
      g: 145,
      b: 0,
      hex: "#E29100"
    },
    {
      pantone: "131",
      r: 198,
      g: 147,
      b: 10,
      hex: "#C6930A"
    },
    {
      pantone: "132",
      r: 158,
      g: 124,
      b: 10,
      hex: "#9E7C0A"
    },
    {
      pantone: "133",
      r: 112,
      g: 91,
      b: 10,
      hex: "#705B0A"
    },
    {
      pantone: "134",
      r: 255,
      g: 216,
      b: 127,
      hex: "#FFD87F"
    },
    {
      pantone: "1345",
      r: 255,
      g: 214,
      b: 145,
      hex: "#FFD691"
    },
    {
      pantone: "135",
      r: 252,
      g: 201,
      b: 99,
      hex: "#FCC963"
    },
    {
      pantone: "1355",
      r: 252,
      g: 206,
      b: 135,
      hex: "#FCCE87"
    },
    {
      pantone: "136",
      r: 252,
      g: 191,
      b: 73,
      hex: "#FCBF49"
    },
    {
      pantone: "1365",
      r: 252,
      g: 186,
      b: 94,
      hex: "#FCBA5E"
    },
    {
      pantone: "137",
      r: 252,
      g: 163,
      b: 17,
      hex: "#FCA311"
    },
    {
      pantone: "1375",
      r: 249,
      g: 155,
      b: 12,
      hex: "#F99B0C"
    },
    {
      pantone: "138",
      r: 216,
      g: 140,
      b: 2,
      hex: "#D88C02"
    },
    {
      pantone: "1385",
      r: 204,
      g: 122,
      b: 2,
      hex: "#CC7A02"
    },
    {
      pantone: "139",
      r: 175,
      g: 117,
      b: 5,
      hex: "#AF7505"
    },
    {
      pantone: "1395",
      r: 153,
      g: 96,
      b: 7,
      hex: "#996007"
    },
    {
      pantone: "140",
      r: 122,
      g: 91,
      b: 17,
      hex: "#7A5B11"
    },
    {
      pantone: "1405",
      r: 107,
      g: 71,
      b: 20,
      hex: "#6B4714"
    },
    {
      pantone: "141",
      r: 242,
      g: 206,
      b: 104,
      hex: "#F2CE68"
    },
    {
      pantone: "142",
      r: 242,
      g: 191,
      b: 73,
      hex: "#F2BF49"
    },
    {
      pantone: "143",
      r: 239,
      g: 178,
      b: 45,
      hex: "#EFB22D"
    },
    {
      pantone: "144",
      r: 226,
      g: 140,
      b: 5,
      hex: "#E28C05"
    },
    {
      pantone: "145",
      r: 198,
      g: 127,
      b: 7,
      hex: "#C67F07"
    },
    {
      pantone: "146",
      r: 158,
      g: 107,
      b: 5,
      hex: "#9E6B05"
    },
    {
      pantone: "147",
      r: 114,
      g: 94,
      b: 38,
      hex: "#725E26"
    },
    {
      pantone: "148",
      r: 255,
      g: 214,
      b: 155,
      hex: "#FFD69B"
    },
    {
      pantone: "1485",
      r: 255,
      g: 183,
      b: 119,
      hex: "#FFB777"
    },
    {
      pantone: "149",
      r: 252,
      g: 204,
      b: 147,
      hex: "#FCCC93"
    },
    {
      pantone: "1495",
      r: 255,
      g: 153,
      b: 63,
      hex: "#FF993F"
    },
    {
      pantone: "150",
      r: 252,
      g: 173,
      b: 86,
      hex: "#FCAD56"
    },
    {
      pantone: "1505",
      r: 244,
      g: 124,
      b: 0,
      hex: "#F47C00"
    },
    {
      pantone: "151",
      r: 247,
      g: 127,
      b: 0,
      hex: "#F77F00"
    },
    {
      pantone: "152",
      r: 221,
      g: 117,
      b: 0,
      hex: "#DD7500"
    },
    {
      pantone: "1525",
      r: 181,
      g: 84,
      b: 0,
      hex: "#B55400"
    },
    {
      pantone: "153",
      r: 188,
      g: 109,
      b: 10,
      hex: "#BC6D0A"
    },
    {
      pantone: "1535",
      r: 140,
      g: 68,
      b: 0,
      hex: "#8C4400"
    },
    {
      pantone: "154",
      r: 153,
      g: 89,
      b: 5,
      hex: "#995905"
    },
    {
      pantone: "1545",
      r: 71,
      g: 34,
      b: 0,
      hex: "#472200"
    },
    {
      pantone: "155",
      r: 244,
      g: 219,
      b: 170,
      hex: "#F4DBAA"
    },
    {
      pantone: "1555",
      r: 249,
      g: 191,
      b: 158,
      hex: "#F9BF9E"
    },
    {
      pantone: "156",
      r: 242,
      g: 198,
      b: 140,
      hex: "#F2C68C"
    },
    {
      pantone: "1565",
      r: 252,
      g: 165,
      b: 119,
      hex: "#FCA577"
    },
    {
      pantone: "157",
      r: 237,
      g: 160,
      b: 79,
      hex: "#EDA04F"
    },
    {
      pantone: "1575",
      r: 252,
      g: 135,
      b: 68,
      hex: "#FC8744"
    },
    {
      pantone: "158",
      r: 232,
      g: 117,
      b: 17,
      hex: "#E87511"
    },
    {
      pantone: "1585",
      r: 249,
      g: 107,
      b: 7,
      hex: "#F96B07"
    },
    {
      pantone: "159",
      r: 198,
      g: 96,
      b: 5,
      hex: "#C66005"
    },
    {
      pantone: "1595",
      r: 209,
      g: 91,
      b: 5,
      hex: "#D15B05"
    },
    {
      pantone: "160",
      r: 158,
      g: 84,
      b: 10,
      hex: "#9E540A"
    },
    {
      pantone: "1605",
      r: 160,
      g: 79,
      b: 17,
      hex: "#A04F11"
    },
    {
      pantone: "161",
      r: 99,
      g: 58,
      b: 17,
      hex: "#633A11"
    },
    {
      pantone: "1615",
      r: 132,
      g: 63,
      b: 15,
      hex: "#843F0F"
    },
    {
      pantone: "162",
      r: 249,
      g: 198,
      b: 170,
      hex: "#F9C6AA"
    },
    {
      pantone: "1625",
      r: 249,
      g: 165,
      b: 140,
      hex: "#F9A58C"
    },
    {
      pantone: "163",
      r: 252,
      g: 158,
      b: 112,
      hex: "#FC9E70"
    },
    {
      pantone: "1635",
      r: 249,
      g: 142,
      b: 109,
      hex: "#F98E6D"
    },
    {
      pantone: "164",
      r: 252,
      g: 127,
      b: 63,
      hex: "#FC7F3F"
    },
    {
      pantone: "1645",
      r: 249,
      g: 114,
      b: 66,
      hex: "#F97242"
    },
    {
      pantone: "165",
      r: 249,
      g: 99,
      b: 2,
      hex: "#F96302"
    },
    {
      pantone: "165 2x",
      r: 234,
      g: 79,
      b: 0,
      hex: "#EA4F00"
    },
    {
      pantone: "1655",
      r: 249,
      g: 86,
      b: 2,
      hex: "#F95602"
    },
    {
      pantone: "166",
      r: 221,
      g: 89,
      b: 0,
      hex: "#DD5900"
    },
    {
      pantone: "1665",
      r: 221,
      g: 79,
      b: 5,
      hex: "#DD4F05"
    },
    {
      pantone: "167",
      r: 188,
      g: 79,
      b: 7,
      hex: "#BC4F07"
    },
    {
      pantone: "1675",
      r: 165,
      g: 63,
      b: 15,
      hex: "#A53F0F"
    },
    {
      pantone: "168",
      r: 109,
      g: 48,
      b: 17,
      hex: "#6D3011"
    },
    {
      pantone: "1685",
      r: 132,
      g: 53,
      b: 17,
      hex: "#843511"
    },
    {
      pantone: "169",
      r: 249,
      g: 186,
      b: 170,
      hex: "#F9BAAA"
    },
    {
      pantone: "170",
      r: 249,
      g: 137,
      b: 114,
      hex: "#F98972"
    },
    {
      pantone: "171",
      r: 249,
      g: 96,
      b: 58,
      hex: "#F9603A"
    },
    {
      pantone: "172",
      r: 247,
      g: 73,
      b: 2,
      hex: "#F74902"
    },
    {
      pantone: "173",
      r: 209,
      g: 68,
      b: 20,
      hex: "#D14414"
    },
    {
      pantone: "174",
      r: 147,
      g: 51,
      b: 17,
      hex: "#933311"
    },
    {
      pantone: "175",
      r: 109,
      g: 51,
      b: 33,
      hex: "#6D3321"
    },
    {
      pantone: "176",
      r: 249,
      g: 175,
      b: 173,
      hex: "#F9AFAD"
    },
    {
      pantone: "1765",
      r: 249,
      g: 158,
      b: 163,
      hex: "#F99EA3"
    },
    {
      pantone: "1767",
      r: 249,
      g: 178,
      b: 183,
      hex: "#F9B2B7"
    },
    {
      pantone: "177",
      r: 249,
      g: 130,
      b: 127,
      hex: "#F9827F"
    },
    {
      pantone: "1775",
      r: 249,
      g: 132,
      b: 142,
      hex: "#F9848E"
    },
    {
      pantone: "1777",
      r: 252,
      g: 102,
      b: 117,
      hex: "#FC6675"
    },
    {
      pantone: "178",
      r: 249,
      g: 94,
      b: 89,
      hex: "#F95E59"
    },
    {
      pantone: "1785",
      r: 252,
      g: 79,
      b: 89,
      hex: "#FC4F59"
    },
    {
      pantone: "1787",
      r: 244,
      g: 63,
      b: 79,
      hex: "#F43F4F"
    },
    {
      pantone: "1788",
      r: 239,
      g: 43,
      b: 45,
      hex: "#EF2B2D"
    },
    {
      pantone: "1788 2x",
      r: 214,
      g: 33,
      b: 0,
      hex: "#D62100"
    },
    {
      pantone: "179",
      r: 226,
      g: 61,
      b: 40,
      hex: "#E23D28"
    },
    {
      pantone: "1795",
      r: 214,
      g: 40,
      b: 40,
      hex: "#D62828"
    },
    {
      pantone: "1797",
      r: 204,
      g: 45,
      b: 48,
      hex: "#CC2D30"
    },
    {
      pantone: "180",
      r: 193,
      g: 56,
      b: 40,
      hex: "#C13828"
    },
    {
      pantone: "1805",
      r: 175,
      g: 38,
      b: 38,
      hex: "#AF2626"
    },
    {
      pantone: "1807",
      r: 160,
      g: 48,
      b: 51,
      hex: "#A03033"
    },
    {
      pantone: "181",
      r: 124,
      g: 45,
      b: 35,
      hex: "#7C2D23"
    },
    {
      pantone: "1810",
      r: 124,
      g: 33,
      b: 30,
      hex: "#7C211E"
    },
    {
      pantone: "1817",
      r: 91,
      g: 45,
      b: 40,
      hex: "#5B2D28"
    },
    {
      pantone: "182",
      r: 249,
      g: 191,
      b: 193,
      hex: "#F9BFC1"
    },
    {
      pantone: "183",
      r: 252,
      g: 140,
      b: 153,
      hex: "#FC8C99"
    },
    {
      pantone: "184",
      r: 252,
      g: 94,
      b: 114,
      hex: "#FC5E72"
    },
    {
      pantone: "185",
      r: 232,
      g: 17,
      b: 45,
      hex: "#E8112D"
    },
    {
      pantone: "185 2x",
      r: 209,
      g: 22,
      b: 0,
      hex: "#D11600"
    },
    {
      pantone: "186",
      r: 206,
      g: 17,
      b: 38,
      hex: "#CE1126"
    },
    {
      pantone: "187",
      r: 175,
      g: 30,
      b: 45,
      hex: "#AF1E2D"
    },
    {
      pantone: "188",
      r: 124,
      g: 33,
      b: 40,
      hex: "#7C2128"
    },
    {
      pantone: "189",
      r: 255,
      g: 163,
      b: 178,
      hex: "#FFA3B2"
    },
    {
      pantone: "1895",
      r: 252,
      g: 191,
      b: 201,
      hex: "#FCBFC9"
    },
    {
      pantone: "190",
      r: 252,
      g: 117,
      b: 142,
      hex: "#FC758E"
    },
    {
      pantone: "1905",
      r: 252,
      g: 155,
      b: 178,
      hex: "#FC9BB2"
    },
    {
      pantone: "191",
      r: 244,
      g: 71,
      b: 107,
      hex: "#F4476B"
    },
    {
      pantone: "1915",
      r: 244,
      g: 84,
      b: 124,
      hex: "#F4547C"
    },
    {
      pantone: "192",
      r: 229,
      g: 5,
      b: 58,
      hex: "#E5053A"
    },
    {
      pantone: "1925",
      r: 224,
      g: 7,
      b: 71,
      hex: "#E00747"
    },
    {
      pantone: "193",
      r: 196,
      g: 0,
      b: 67,
      hex: "#C40043"
    },
    {
      pantone: "1935",
      r: 193,
      g: 5,
      b: 56,
      hex: "#C10538"
    },
    {
      pantone: "194",
      r: 153,
      g: 33,
      b: 53,
      hex: "#992135"
    },
    {
      pantone: "1945",
      r: 168,
      g: 12,
      b: 53,
      hex: "#A80C35"
    },
    {
      pantone: "1955",
      r: 147,
      g: 22,
      b: 56,
      hex: "#931638"
    },
    {
      pantone: "196",
      r: 250,
      g: 213,
      b: 225,
      hex: "#FAD5E1"
    },
    {
      pantone: "197",
      r: 246,
      g: 165,
      b: 190,
      hex: "#F6A5BE"
    },
    {
      pantone: "198",
      r: 239,
      g: 91,
      b: 132,
      hex: "#EF5B84"
    },
    {
      pantone: "199",
      r: 160,
      g: 39,
      b: 75,
      hex: "#A0274B"
    },
    {
      pantone: "200",
      r: 196,
      g: 30,
      b: 58,
      hex: "#C41E3A"
    },
    {
      pantone: "201",
      r: 163,
      g: 38,
      b: 56,
      hex: "#A32638"
    },
    {
      pantone: "202",
      r: 140,
      g: 38,
      b: 51,
      hex: "#8C2633"
    },
    {
      pantone: "203",
      r: 242,
      g: 175,
      b: 193,
      hex: "#F2AFC1"
    },
    {
      pantone: "204",
      r: 237,
      g: 122,
      b: 158,
      hex: "#ED7A9E"
    },
    {
      pantone: "205",
      r: 229,
      g: 76,
      b: 124,
      hex: "#E54C7C"
    },
    {
      pantone: "206",
      r: 211,
      g: 5,
      b: 71,
      hex: "#D30547"
    },
    {
      pantone: "207",
      r: 192,
      g: 0,
      b: 78,
      hex: "#C0004E"
    },
    {
      pantone: "208",
      r: 142,
      g: 35,
      b: 68,
      hex: "#8E2344"
    },
    {
      pantone: "209",
      r: 117,
      g: 38,
      b: 61,
      hex: "#75263D"
    },
    {
      pantone: "210",
      r: 255,
      g: 160,
      b: 191,
      hex: "#FFA0BF"
    },
    {
      pantone: "211",
      r: 255,
      g: 119,
      b: 168,
      hex: "#FF77A8"
    },
    {
      pantone: "212",
      r: 249,
      g: 79,
      b: 142,
      hex: "#F94F8E"
    },
    {
      pantone: "213",
      r: 234,
      g: 15,
      b: 107,
      hex: "#EA0F6B"
    },
    {
      pantone: "214",
      r: 204,
      g: 2,
      b: 86,
      hex: "#CC0256"
    },
    {
      pantone: "215",
      r: 165,
      g: 5,
      b: 68,
      hex: "#A50544"
    },
    {
      pantone: "216",
      r: 124,
      g: 30,
      b: 63,
      hex: "#7C1E3F"
    },
    {
      pantone: "217",
      r: 244,
      g: 191,
      b: 209,
      hex: "#F4BFD1"
    },
    {
      pantone: "218",
      r: 237,
      g: 114,
      b: 170,
      hex: "#ED72AA"
    },
    {
      pantone: "219",
      r: 226,
      g: 40,
      b: 130,
      hex: "#E22882"
    },
    {
      pantone: "220",
      r: 170,
      g: 0,
      b: 79,
      hex: "#AA004F"
    },
    {
      pantone: "221",
      r: 147,
      g: 0,
      b: 66,
      hex: "#930042"
    },
    {
      pantone: "222",
      r: 112,
      g: 25,
      b: 61,
      hex: "#70193D"
    },
    {
      pantone: "223",
      r: 249,
      g: 147,
      b: 196,
      hex: "#F993C4"
    },
    {
      pantone: "224",
      r: 244,
      g: 107,
      b: 175,
      hex: "#F46BAF"
    },
    {
      pantone: "225",
      r: 237,
      g: 40,
      b: 147,
      hex: "#ED2893"
    },
    {
      pantone: "226",
      r: 214,
      g: 2,
      b: 112,
      hex: "#D60270"
    },
    {
      pantone: "227",
      r: 173,
      g: 0,
      b: 91,
      hex: "#AD005B"
    },
    {
      pantone: "228",
      r: 140,
      g: 0,
      b: 76,
      hex: "#8C004C"
    },
    {
      pantone: "229",
      r: 109,
      g: 33,
      b: 63,
      hex: "#6D213F"
    },
    {
      pantone: "230",
      r: 255,
      g: 160,
      b: 204,
      hex: "#FFA0CC"
    },
    {
      pantone: "231",
      r: 252,
      g: 112,
      b: 186,
      hex: "#FC70BA"
    },
    {
      pantone: "232",
      r: 244,
      g: 63,
      b: 165,
      hex: "#F43FA5"
    },
    {
      pantone: "233",
      r: 206,
      g: 0,
      b: 124,
      hex: "#CE007C"
    },
    {
      pantone: "234",
      r: 170,
      g: 0,
      b: 102,
      hex: "#AA0066"
    },
    {
      pantone: "235",
      r: 142,
      g: 5,
      b: 84,
      hex: "#8E0554"
    },
    {
      pantone: "236",
      r: 249,
      g: 175,
      b: 211,
      hex: "#F9AFD3"
    },
    {
      pantone: "2365",
      r: 247,
      g: 196,
      b: 216,
      hex: "#F7C4D8"
    },
    {
      pantone: "237",
      r: 244,
      g: 132,
      b: 196,
      hex: "#F484C4"
    },
    {
      pantone: "2375",
      r: 234,
      g: 107,
      b: 191,
      hex: "#EA6BBF"
    },
    {
      pantone: "238",
      r: 237,
      g: 79,
      b: 175,
      hex: "#ED4FAF"
    },
    {
      pantone: "2385",
      r: 219,
      g: 40,
      b: 165,
      hex: "#DB28A5"
    },
    {
      pantone: "239",
      r: 224,
      g: 33,
      b: 158,
      hex: "#E0219E"
    },
    {
      pantone: "2395",
      r: 196,
      g: 0,
      b: 140,
      hex: "#C4008C"
    },
    {
      pantone: "240",
      r: 196,
      g: 15,
      b: 137,
      hex: "#C40F89"
    },
    {
      pantone: "2405",
      r: 168,
      g: 0,
      b: 122,
      hex: "#A8007A"
    },
    {
      pantone: "241",
      r: 173,
      g: 0,
      b: 117,
      hex: "#AD0075"
    },
    {
      pantone: "2415",
      r: 155,
      g: 0,
      b: 112,
      hex: "#9B0070"
    },
    {
      pantone: "242",
      r: 124,
      g: 28,
      b: 81,
      hex: "#7C1C51"
    },
    {
      pantone: "2425",
      r: 135,
      g: 0,
      b: 91,
      hex: "#87005B"
    },
    {
      pantone: "243",
      r: 242,
      g: 186,
      b: 216,
      hex: "#F2BAD8"
    },
    {
      pantone: "244",
      r: 237,
      g: 160,
      b: 211,
      hex: "#EDA0D3"
    },
    {
      pantone: "245",
      r: 232,
      g: 127,
      b: 201,
      hex: "#E87FC9"
    },
    {
      pantone: "246",
      r: 204,
      g: 0,
      b: 160,
      hex: "#CC00A0"
    },
    {
      pantone: "247",
      r: 183,
      g: 0,
      b: 142,
      hex: "#B7008E"
    },
    {
      pantone: "248",
      r: 163,
      g: 5,
      b: 127,
      hex: "#A3057F"
    },
    {
      pantone: "249",
      r: 127,
      g: 40,
      b: 96,
      hex: "#7F2860"
    },
    {
      pantone: "250",
      r: 237,
      g: 196,
      b: 221,
      hex: "#EDC4DD"
    },
    {
      pantone: "251",
      r: 226,
      g: 158,
      b: 214,
      hex: "#E29ED6"
    },
    {
      pantone: "252",
      r: 211,
      g: 107,
      b: 198,
      hex: "#D36BC6"
    },
    {
      pantone: "253",
      r: 175,
      g: 35,
      b: 165,
      hex: "#AF23A5"
    },
    {
      pantone: "254",
      r: 160,
      g: 45,
      b: 150,
      hex: "#A02D96"
    },
    {
      pantone: "255",
      r: 119,
      g: 45,
      b: 107,
      hex: "#772D6B"
    },
    {
      pantone: "256",
      r: 229,
      g: 196,
      b: 214,
      hex: "#E5C4D6"
    },
    {
      pantone: "2562",
      r: 216,
      g: 168,
      b: 216,
      hex: "#D8A8D8"
    },
    {
      pantone: "2563",
      r: 209,
      g: 160,
      b: 204,
      hex: "#D1A0CC"
    },
    {
      pantone: "2567",
      r: 191,
      g: 147,
      b: 204,
      hex: "#BF93CC"
    },
    {
      pantone: "257",
      r: 211,
      g: 165,
      b: 201,
      hex: "#D3A5C9"
    },
    {
      pantone: "2572",
      r: 198,
      g: 135,
      b: 209,
      hex: "#C687D1"
    },
    {
      pantone: "2573",
      r: 186,
      g: 124,
      b: 188,
      hex: "#BA7CBC"
    },
    {
      pantone: "2577",
      r: 170,
      g: 114,
      b: 191,
      hex: "#AA72BF"
    },
    {
      pantone: "258",
      r: 155,
      g: 79,
      b: 150,
      hex: "#9B4F96"
    },
    {
      pantone: "2582",
      r: 170,
      g: 71,
      b: 186,
      hex: "#AA47BA"
    },
    {
      pantone: "2583",
      r: 158,
      g: 79,
      b: 165,
      hex: "#9E4FA5"
    },
    {
      pantone: "2587",
      r: 142,
      g: 71,
      b: 173,
      hex: "#8E47AD"
    },
    {
      pantone: "259",
      r: 114,
      g: 22,
      b: 107,
      hex: "#72166B"
    },
    {
      pantone: "2592",
      r: 147,
      g: 15,
      b: 165,
      hex: "#930FA5"
    },
    {
      pantone: "2593",
      r: 135,
      g: 43,
      b: 147,
      hex: "#872B93"
    },
    {
      pantone: "2597",
      r: 102,
      g: 0,
      b: 140,
      hex: "#66008C"
    },
    {
      pantone: "260",
      r: 104,
      g: 30,
      b: 91,
      hex: "#681E5B"
    },
    {
      pantone: "2602",
      r: 130,
      g: 12,
      b: 142,
      hex: "#820C8E"
    },
    {
      pantone: "2603",
      r: 112,
      g: 20,
      b: 122,
      hex: "#70147A"
    },
    {
      pantone: "2607",
      r: 91,
      g: 2,
      b: 122,
      hex: "#5B027A"
    },
    {
      pantone: "261",
      r: 94,
      g: 33,
      b: 84,
      hex: "#5E2154"
    },
    {
      pantone: "2612",
      r: 112,
      g: 30,
      b: 114,
      hex: "#701E72"
    },
    {
      pantone: "2613",
      r: 102,
      g: 17,
      b: 109,
      hex: "#66116D"
    },
    {
      pantone: "2617",
      r: 86,
      g: 12,
      b: 112,
      hex: "#560C70"
    },
    {
      pantone: "262",
      r: 84,
      g: 35,
      b: 68,
      hex: "#542344"
    },
    {
      pantone: "2622",
      r: 96,
      g: 45,
      b: 89,
      hex: "#602D59"
    },
    {
      pantone: "2623",
      r: 91,
      g: 25,
      b: 94,
      hex: "#5B195E"
    },
    {
      pantone: "2627",
      r: 76,
      g: 20,
      b: 94,
      hex: "#4C145E"
    },
    {
      pantone: "263",
      r: 224,
      g: 206,
      b: 224,
      hex: "#E0CEE0"
    },
    {
      pantone: "2635",
      r: 201,
      g: 173,
      b: 216,
      hex: "#C9ADD8"
    },
    {
      pantone: "264",
      r: 198,
      g: 170,
      b: 219,
      hex: "#C6AADB"
    },
    {
      pantone: "2645",
      r: 181,
      g: 145,
      b: 209,
      hex: "#B591D1"
    },
    {
      pantone: "265",
      r: 150,
      g: 99,
      b: 196,
      hex: "#9663C4"
    },
    {
      pantone: "2655",
      r: 155,
      g: 109,
      b: 198,
      hex: "#9B6DC6"
    },
    {
      pantone: "266",
      r: 109,
      g: 40,
      b: 170,
      hex: "#6D28AA"
    },
    {
      pantone: "2665",
      r: 137,
      g: 79,
      b: 191,
      hex: "#894FBF"
    },
    {
      pantone: "267",
      r: 89,
      g: 17,
      b: 142,
      hex: "#59118E"
    },
    {
      pantone: "268",
      r: 79,
      g: 33,
      b: 112,
      hex: "#4F2170"
    },
    {
      pantone: "2685",
      r: 86,
      g: 0,
      b: 140,
      hex: "#56008C"
    },
    {
      pantone: "269",
      r: 68,
      g: 35,
      b: 89,
      hex: "#442359"
    },
    {
      pantone: "2695",
      r: 68,
      g: 35,
      b: 94,
      hex: "#44235E"
    },
    {
      pantone: "270",
      r: 186,
      g: 175,
      b: 211,
      hex: "#BAAFD3"
    },
    {
      pantone: "2705",
      r: 173,
      g: 158,
      b: 211,
      hex: "#AD9ED3"
    },
    {
      pantone: "2706",
      r: 209,
      g: 206,
      b: 221,
      hex: "#D1CEDD"
    },
    {
      pantone: "2707",
      r: 191,
      g: 209,
      b: 229,
      hex: "#BFD1E5"
    },
    {
      pantone: "2708",
      r: 175,
      g: 188,
      b: 219,
      hex: "#AFBCDB"
    },
    {
      pantone: "271",
      r: 158,
      g: 145,
      b: 198,
      hex: "#9E91C6"
    },
    {
      pantone: "2715",
      r: 147,
      g: 122,
      b: 204,
      hex: "#937ACC"
    },
    {
      pantone: "2716",
      r: 165,
      g: 160,
      b: 214,
      hex: "#A5A0D6"
    },
    {
      pantone: "2717",
      r: 165,
      g: 186,
      b: 224,
      hex: "#A5BAE0"
    },
    {
      pantone: "2718",
      r: 91,
      g: 119,
      b: 204,
      hex: "#5B77CC"
    },
    {
      pantone: "272",
      r: 137,
      g: 119,
      b: 186,
      hex: "#8977BA"
    },
    {
      pantone: "2725",
      r: 114,
      g: 81,
      b: 188,
      hex: "#7251BC"
    },
    {
      pantone: "2726",
      r: 102,
      g: 86,
      b: 188,
      hex: "#6656BC"
    },
    {
      pantone: "2727",
      r: 94,
      g: 104,
      b: 196,
      hex: "#5E68C4"
    },
    {
      pantone: "2728",
      r: 48,
      g: 68,
      b: 181,
      hex: "#3044B5"
    },
    {
      pantone: "273",
      r: 56,
      g: 25,
      b: 122,
      hex: "#38197A"
    },
    {
      pantone: "2735",
      r: 79,
      g: 0,
      b: 147,
      hex: "#4F0093"
    },
    {
      pantone: "2736",
      r: 73,
      g: 48,
      b: 173,
      hex: "#4930AD"
    },
    {
      pantone: "2738",
      r: 45,
      g: 0,
      b: 142,
      hex: "#2D008E"
    },
    {
      pantone: "274",
      r: 43,
      g: 17,
      b: 102,
      hex: "#2B1166"
    },
    {
      pantone: "2745",
      r: 63,
      g: 0,
      b: 119,
      hex: "#3F0077"
    },
    {
      pantone: "2746",
      r: 63,
      g: 40,
      b: 147,
      hex: "#3F2893"
    },
    {
      pantone: "2747",
      r: 28,
      g: 20,
      b: 107,
      hex: "#1C146B"
    },
    {
      pantone: "2748",
      r: 30,
      g: 28,
      b: 119,
      hex: "#1E1C77"
    },
    {
      pantone: "275",
      r: 38,
      g: 15,
      b: 84,
      hex: "#260F54"
    },
    {
      pantone: "2755",
      r: 53,
      g: 0,
      b: 109,
      hex: "#35006D"
    },
    {
      pantone: "2756",
      r: 51,
      g: 40,
      b: 117,
      hex: "#332875"
    },
    {
      pantone: "2757",
      r: 20,
      g: 22,
      b: 84,
      hex: "#141654"
    },
    {
      pantone: "2758",
      r: 25,
      g: 33,
      b: 104,
      hex: "#192168"
    },
    {
      pantone: "276",
      r: 43,
      g: 33,
      b: 71,
      hex: "#2B2147"
    },
    {
      pantone: "2765",
      r: 43,
      g: 12,
      b: 86,
      hex: "#2B0C56"
    },
    {
      pantone: "2766",
      r: 43,
      g: 38,
      b: 91,
      hex: "#2B265B"
    },
    {
      pantone: "2767",
      r: 20,
      g: 33,
      b: 61,
      hex: "#14213D"
    },
    {
      pantone: "2768",
      r: 17,
      g: 33,
      b: 81,
      hex: "#112151"
    },
    {
      pantone: "277",
      r: 181,
      g: 209,
      b: 232,
      hex: "#B5D1E8"
    },
    {
      pantone: "278",
      r: 153,
      g: 186,
      b: 221,
      hex: "#99BADD"
    },
    {
      pantone: "279",
      r: 102,
      g: 137,
      b: 204,
      hex: "#6689CC"
    },
    {
      pantone: "280",
      r: 0,
      g: 43,
      b: 127,
      hex: "#002B7F"
    },
    {
      pantone: "281",
      r: 0,
      g: 40,
      b: 104,
      hex: "#002868"
    },
    {
      pantone: "282",
      r: 0,
      g: 38,
      b: 84,
      hex: "#002654"
    },
    {
      pantone: "283",
      r: 155,
      g: 196,
      b: 226,
      hex: "#9BC4E2"
    },
    {
      pantone: "284",
      r: 117,
      g: 170,
      b: 219,
      hex: "#75AADB"
    },
    {
      pantone: "285",
      r: 58,
      g: 117,
      b: 196,
      hex: "#3A75C4"
    },
    {
      pantone: "286",
      r: 0,
      g: 56,
      b: 168,
      hex: "#0038A8"
    },
    {
      pantone: "287",
      r: 0,
      g: 56,
      b: 147,
      hex: "#003893"
    },
    {
      pantone: "288",
      r: 0,
      g: 51,
      b: 127,
      hex: "#00337F"
    },
    {
      pantone: "289",
      r: 0,
      g: 38,
      b: 73,
      hex: "#002649"
    },
    {
      pantone: "290",
      r: 196,
      g: 216,
      b: 226,
      hex: "#C4D8E2"
    },
    {
      pantone: "2905",
      r: 147,
      g: 198,
      b: 224,
      hex: "#93C6E0"
    },
    {
      pantone: "291",
      r: 168,
      g: 206,
      b: 226,
      hex: "#A8CEE2"
    },
    {
      pantone: "2915",
      r: 96,
      g: 175,
      b: 221,
      hex: "#60AFDD"
    },
    {
      pantone: "292",
      r: 117,
      g: 178,
      b: 221,
      hex: "#75B2DD"
    },
    {
      pantone: "2925",
      r: 0,
      g: 142,
      b: 214,
      hex: "#008ED6"
    },
    {
      pantone: "293",
      r: 0,
      g: 81,
      b: 186,
      hex: "#0051BA"
    },
    {
      pantone: "2935",
      r: 0,
      g: 91,
      b: 191,
      hex: "#005BBF"
    },
    {
      pantone: "294",
      r: 0,
      g: 63,
      b: 135,
      hex: "#003F87"
    },
    {
      pantone: "2945",
      r: 0,
      g: 84,
      b: 160,
      hex: "#0054A0"
    },
    {
      pantone: "295",
      r: 0,
      g: 56,
      b: 107,
      hex: "#00386B"
    },
    {
      pantone: "2955",
      r: 0,
      g: 61,
      b: 107,
      hex: "#003D6B"
    },
    {
      pantone: "296",
      r: 0,
      g: 45,
      b: 71,
      hex: "#002D47"
    },
    {
      pantone: "2965",
      r: 0,
      g: 51,
      b: 76,
      hex: "#00334C"
    },
    {
      pantone: "297",
      r: 130,
      g: 198,
      b: 226,
      hex: "#82C6E2"
    },
    {
      pantone: "2975",
      r: 186,
      g: 224,
      b: 226,
      hex: "#BAE0E2"
    },
    {
      pantone: "298",
      r: 81,
      g: 181,
      b: 224,
      hex: "#51B5E0"
    },
    {
      pantone: "2985",
      r: 81,
      g: 191,
      b: 226,
      hex: "#51BFE2"
    },
    {
      pantone: "299",
      r: 0,
      g: 163,
      b: 221,
      hex: "#00A3DD"
    },
    {
      pantone: "2995",
      r: 0,
      g: 165,
      b: 219,
      hex: "#00A5DB"
    },
    {
      pantone: "300",
      r: 0,
      g: 114,
      b: 198,
      hex: "#0072C6"
    },
    {
      pantone: "3005",
      r: 0,
      g: 132,
      b: 201,
      hex: "#0084C9"
    },
    {
      pantone: "301",
      r: 0,
      g: 91,
      b: 153,
      hex: "#005B99"
    },
    {
      pantone: "3015",
      r: 0,
      g: 112,
      b: 158,
      hex: "#00709E"
    },
    {
      pantone: "302",
      r: 0,
      g: 79,
      b: 109,
      hex: "#004F6D"
    },
    {
      pantone: "3025",
      r: 0,
      g: 84,
      b: 107,
      hex: "#00546B"
    },
    {
      pantone: "303",
      r: 0,
      g: 63,
      b: 84,
      hex: "#003F54"
    },
    {
      pantone: "3035",
      r: 0,
      g: 68,
      b: 84,
      hex: "#004454"
    },
    {
      pantone: "304",
      r: 165,
      g: 221,
      b: 226,
      hex: "#A5DDE2"
    },
    {
      pantone: "305",
      r: 112,
      g: 206,
      b: 226,
      hex: "#70CEE2"
    },
    {
      pantone: "306",
      r: 0,
      g: 188,
      b: 226,
      hex: "#00BCE2"
    },
    {
      pantone: "306 2x",
      r: 0,
      g: 163,
      b: 209,
      hex: "#00A3D1"
    },
    {
      pantone: "307",
      r: 0,
      g: 122,
      b: 165,
      hex: "#007AA5"
    },
    {
      pantone: "308",
      r: 0,
      g: 96,
      b: 124,
      hex: "#00607C"
    },
    {
      pantone: "309",
      r: 0,
      g: 63,
      b: 73,
      hex: "#003F49"
    },
    {
      pantone: "310",
      r: 114,
      g: 209,
      b: 221,
      hex: "#72D1DD"
    },
    {
      pantone: "3105",
      r: 127,
      g: 214,
      b: 219,
      hex: "#7FD6DB"
    },
    {
      pantone: "311",
      r: 40,
      g: 196,
      b: 216,
      hex: "#28C4D8"
    },
    {
      pantone: "3115",
      r: 45,
      g: 198,
      b: 214,
      hex: "#2DC6D6"
    },
    {
      pantone: "312",
      r: 0,
      g: 173,
      b: 198,
      hex: "#00ADC6"
    },
    {
      pantone: "3125",
      r: 0,
      g: 183,
      b: 198,
      hex: "#00B7C6"
    },
    {
      pantone: "313",
      r: 0,
      g: 153,
      b: 181,
      hex: "#0099B5"
    },
    {
      pantone: "3135",
      r: 0,
      g: 155,
      b: 170,
      hex: "#009BAA"
    },
    {
      pantone: "314",
      r: 0,
      g: 130,
      b: 155,
      hex: "#00829B"
    },
    {
      pantone: "3145",
      r: 0,
      g: 132,
      b: 142,
      hex: "#00848E"
    },
    {
      pantone: "315",
      r: 0,
      g: 107,
      b: 119,
      hex: "#006B77"
    },
    {
      pantone: "3155",
      r: 0,
      g: 109,
      b: 117,
      hex: "#006D75"
    },
    {
      pantone: "316",
      r: 0,
      g: 73,
      b: 79,
      hex: "#00494F"
    },
    {
      pantone: "3165",
      r: 0,
      g: 86,
      b: 91,
      hex: "#00565B"
    },
    {
      pantone: "317",
      r: 201,
      g: 232,
      b: 221,
      hex: "#C9E8DD"
    },
    {
      pantone: "318",
      r: 147,
      g: 221,
      b: 219,
      hex: "#93DDDB"
    },
    {
      pantone: "319",
      r: 76,
      g: 206,
      b: 209,
      hex: "#4CCED1"
    },
    {
      pantone: "320",
      r: 0,
      g: 158,
      b: 160,
      hex: "#009EA0"
    },
    {
      pantone: "320",
      r: 0,
      g: 127,
      b: 130,
      hex: "#007F82"
    },
    {
      pantone: "321",
      r: 0,
      g: 135,
      b: 137,
      hex: "#008789"
    },
    {
      pantone: "322",
      r: 0,
      g: 114,
      b: 114,
      hex: "#007272"
    },
    {
      pantone: "323",
      r: 0,
      g: 102,
      b: 99,
      hex: "#006663"
    },
    {
      pantone: "324",
      r: 170,
      g: 221,
      b: 214,
      hex: "#AADDD6"
    },
    {
      pantone: "3242",
      r: 135,
      g: 221,
      b: 209,
      hex: "#87DDD1"
    },
    {
      pantone: "3245",
      r: 140,
      g: 224,
      b: 209,
      hex: "#8CE0D1"
    },
    {
      pantone: "3248",
      r: 122,
      g: 211,
      b: 193,
      hex: "#7AD3C1"
    },
    {
      pantone: "325",
      r: 86,
      g: 201,
      b: 193,
      hex: "#56C9C1"
    },
    {
      pantone: "3252",
      r: 86,
      g: 214,
      b: 201,
      hex: "#56D6C9"
    },
    {
      pantone: "3255",
      r: 71,
      g: 214,
      b: 193,
      hex: "#47D6C1"
    },
    {
      pantone: "3258",
      r: 53,
      g: 196,
      b: 175,
      hex: "#35C4AF"
    },
    {
      pantone: "326",
      r: 0,
      g: 178,
      b: 170,
      hex: "#00B2AA"
    },
    {
      pantone: "3262",
      r: 0,
      g: 193,
      b: 181,
      hex: "#00C1B5"
    },
    {
      pantone: "3265",
      r: 0,
      g: 198,
      b: 178,
      hex: "#00C6B2"
    },
    {
      pantone: "3268",
      r: 0,
      g: 175,
      b: 153,
      hex: "#00AF99"
    },
    {
      pantone: "327",
      r: 0,
      g: 140,
      b: 130,
      hex: "#008C82"
    },
    {
      pantone: "327 2x",
      r: 0,
      g: 137,
      b: 119,
      hex: "#008977"
    },
    {
      pantone: "3272",
      r: 0,
      g: 170,
      b: 158,
      hex: "#00AA9E"
    },
    {
      pantone: "3275",
      r: 0,
      g: 178,
      b: 160,
      hex: "#00B2A0"
    },
    {
      pantone: "3278",
      r: 0,
      g: 155,
      b: 132,
      hex: "#009B84"
    },
    {
      pantone: "328",
      r: 0,
      g: 119,
      b: 112,
      hex: "#007770"
    },
    {
      pantone: "3282",
      r: 0,
      g: 140,
      b: 130,
      hex: "#008C82"
    },
    {
      pantone: "3285",
      r: 0,
      g: 153,
      b: 135,
      hex: "#009987"
    },
    {
      pantone: "3288",
      r: 0,
      g: 130,
      b: 112,
      hex: "#008270"
    },
    {
      pantone: "329",
      r: 0,
      g: 109,
      b: 102,
      hex: "#006D66"
    },
    {
      pantone: "3292",
      r: 0,
      g: 96,
      b: 86,
      hex: "#006056"
    },
    {
      pantone: "3295",
      r: 0,
      g: 130,
      b: 114,
      hex: "#008272"
    },
    {
      pantone: "3298",
      r: 0,
      g: 107,
      b: 91,
      hex: "#006B5B"
    },
    {
      pantone: "330",
      r: 0,
      g: 89,
      b: 81,
      hex: "#005951"
    },
    {
      pantone: "3302",
      r: 0,
      g: 73,
      b: 63,
      hex: "#00493F"
    },
    {
      pantone: "3305",
      r: 0,
      g: 79,
      b: 66,
      hex: "#004F42"
    },
    {
      pantone: "3308",
      r: 0,
      g: 68,
      b: 56,
      hex: "#004438"
    },
    {
      pantone: "331",
      r: 186,
      g: 234,
      b: 214,
      hex: "#BAEAD6"
    },
    {
      pantone: "332",
      r: 160,
      g: 229,
      b: 206,
      hex: "#A0E5CE"
    },
    {
      pantone: "333",
      r: 94,
      g: 221,
      b: 193,
      hex: "#5EDDC1"
    },
    {
      pantone: "334",
      r: 0,
      g: 153,
      b: 124,
      hex: "#00997C"
    },
    {
      pantone: "335",
      r: 0,
      g: 124,
      b: 102,
      hex: "#007C66"
    },
    {
      pantone: "336",
      r: 0,
      g: 104,
      b: 84,
      hex: "#006854"
    },
    {
      pantone: "337",
      r: 155,
      g: 219,
      b: 193,
      hex: "#9BDBC1"
    },
    {
      pantone: "3375",
      r: 142,
      g: 226,
      b: 188,
      hex: "#8EE2BC"
    },
    {
      pantone: "338",
      r: 122,
      g: 209,
      b: 181,
      hex: "#7AD1B5"
    },
    {
      pantone: "3385",
      r: 84,
      g: 216,
      b: 168,
      hex: "#54D8A8"
    },
    {
      pantone: "339",
      r: 0,
      g: 178,
      b: 140,
      hex: "#00B28C"
    },
    {
      pantone: "3395",
      r: 0,
      g: 201,
      b: 147,
      hex: "#00C993"
    },
    {
      pantone: "340",
      r: 0,
      g: 153,
      b: 119,
      hex: "#009977"
    },
    {
      pantone: "3405",
      r: 0,
      g: 178,
      b: 122,
      hex: "#00B27A"
    },
    {
      pantone: "341",
      r: 0,
      g: 122,
      b: 94,
      hex: "#007A5E"
    },
    {
      pantone: "3415",
      r: 0,
      g: 124,
      b: 89,
      hex: "#007C59"
    },
    {
      pantone: "342",
      r: 0,
      g: 107,
      b: 84,
      hex: "#006B54"
    },
    {
      pantone: "3425",
      r: 0,
      g: 104,
      b: 71,
      hex: "#006847"
    },
    {
      pantone: "343",
      r: 0,
      g: 86,
      b: 63,
      hex: "#00563F"
    },
    {
      pantone: "3435",
      r: 2,
      g: 73,
      b: 48,
      hex: "#024930"
    },
    {
      pantone: "344",
      r: 181,
      g: 226,
      b: 191,
      hex: "#B5E2BF"
    },
    {
      pantone: "345",
      r: 150,
      g: 216,
      b: 175,
      hex: "#96D8AF"
    },
    {
      pantone: "346",
      r: 112,
      g: 206,
      b: 155,
      hex: "#70CE9B"
    },
    {
      pantone: "347",
      r: 0,
      g: 158,
      b: 96,
      hex: "#009E60"
    },
    {
      pantone: "348",
      r: 0,
      g: 135,
      b: 81,
      hex: "#008751"
    },
    {
      pantone: "349",
      r: 0,
      g: 107,
      b: 63,
      hex: "#006B3F"
    },
    {
      pantone: "350",
      r: 35,
      g: 79,
      b: 51,
      hex: "#234F33"
    },
    {
      pantone: "351",
      r: 181,
      g: 232,
      b: 191,
      hex: "#B5E8BF"
    },
    {
      pantone: "352",
      r: 153,
      g: 229,
      b: 178,
      hex: "#99E5B2"
    },
    {
      pantone: "353",
      r: 132,
      g: 226,
      b: 168,
      hex: "#84E2A8"
    },
    {
      pantone: "354",
      r: 0,
      g: 183,
      b: 96,
      hex: "#00B760"
    },
    {
      pantone: "355",
      r: 0,
      g: 158,
      b: 73,
      hex: "#009E49"
    },
    {
      pantone: "356",
      r: 0,
      g: 122,
      b: 61,
      hex: "#007A3D"
    },
    {
      pantone: "357",
      r: 33,
      g: 91,
      b: 51,
      hex: "#215B33"
    },
    {
      pantone: "358",
      r: 170,
      g: 221,
      b: 150,
      hex: "#AADD96"
    },
    {
      pantone: "359",
      r: 160,
      g: 219,
      b: 142,
      hex: "#A0DB8E"
    },
    {
      pantone: "360",
      r: 96,
      g: 198,
      b: 89,
      hex: "#60C659"
    },
    {
      pantone: "361",
      r: 30,
      g: 181,
      b: 58,
      hex: "#1EB53A"
    },
    {
      pantone: "362",
      r: 51,
      g: 158,
      b: 53,
      hex: "#339E35"
    },
    {
      pantone: "363",
      r: 61,
      g: 142,
      b: 51,
      hex: "#3D8E33"
    },
    {
      pantone: "364",
      r: 58,
      g: 119,
      b: 40,
      hex: "#3A7728"
    },
    {
      pantone: "365",
      r: 211,
      g: 232,
      b: 163,
      hex: "#D3E8A3"
    },
    {
      pantone: "366",
      r: 196,
      g: 229,
      b: 142,
      hex: "#C4E58E"
    },
    {
      pantone: "367",
      r: 170,
      g: 221,
      b: 109,
      hex: "#AADD6D"
    },
    {
      pantone: "368",
      r: 91,
      g: 191,
      b: 33,
      hex: "#5BBF21"
    },
    {
      pantone: "368 2x",
      r: 0,
      g: 158,
      b: 15,
      hex: "#009E0F"
    },
    {
      pantone: "369",
      r: 86,
      g: 170,
      b: 28,
      hex: "#56AA1C"
    },
    {
      pantone: "370",
      r: 86,
      g: 142,
      b: 20,
      hex: "#568E14"
    },
    {
      pantone: "371",
      r: 86,
      g: 107,
      b: 33,
      hex: "#566B21"
    },
    {
      pantone: "372",
      r: 216,
      g: 237,
      b: 150,
      hex: "#D8ED96"
    },
    {
      pantone: "373",
      r: 206,
      g: 234,
      b: 130,
      hex: "#CEEA82"
    },
    {
      pantone: "374",
      r: 186,
      g: 232,
      b: 96,
      hex: "#BAE860"
    },
    {
      pantone: "375",
      r: 140,
      g: 214,
      b: 0,
      hex: "#8CD600"
    },
    {
      pantone: "375 2x",
      r: 84,
      g: 188,
      b: 0,
      hex: "#54BC00"
    },
    {
      pantone: "376",
      r: 127,
      g: 186,
      b: 0,
      hex: "#7FBA00"
    },
    {
      pantone: "377",
      r: 112,
      g: 147,
      b: 2,
      hex: "#709302"
    },
    {
      pantone: "378",
      r: 86,
      g: 99,
      b: 20,
      hex: "#566314"
    },
    {
      pantone: "379",
      r: 224,
      g: 234,
      b: 104,
      hex: "#E0EA68"
    },
    {
      pantone: "380",
      r: 214,
      g: 229,
      b: 66,
      hex: "#D6E542"
    },
    {
      pantone: "381",
      r: 204,
      g: 226,
      b: 38,
      hex: "#CCE226"
    },
    {
      pantone: "382",
      r: 186,
      g: 216,
      b: 10,
      hex: "#BAD80A"
    },
    {
      pantone: "382 2x",
      r: 158,
      g: 196,
      b: 0,
      hex: "0 #9EC400"
    },
    {
      pantone: "383",
      r: 163,
      g: 175,
      b: 7,
      hex: "#A3AF07"
    },
    {
      pantone: "384",
      r: 147,
      g: 153,
      b: 5,
      hex: "#939905"
    },
    {
      pantone: "385",
      r: 112,
      g: 112,
      b: 20,
      hex: "#707014"
    },
    {
      pantone: "386",
      r: 232,
      g: 237,
      b: 96,
      hex: "#E8ED60"
    },
    {
      pantone: "387",
      r: 224,
      g: 237,
      b: 68,
      hex: "#E0ED44"
    },
    {
      pantone: "388",
      r: 214,
      g: 232,
      b: 15,
      hex: "#D6E80F"
    },
    {
      pantone: "389",
      r: 206,
      g: 224,
      b: 7,
      hex: "#CEE007"
    },
    {
      pantone: "390",
      r: 186,
      g: 196,
      b: 5,
      hex: "#BAC405"
    },
    {
      pantone: "391",
      r: 158,
      g: 158,
      b: 7,
      hex: "#9E9E07"
    },
    {
      pantone: "392",
      r: 132,
      g: 130,
      b: 5,
      hex: "#848205"
    },
    {
      pantone: "393",
      r: 242,
      g: 239,
      b: 135,
      hex: "#F2EF87"
    },
    {
      pantone: "3935",
      r: 242,
      g: 237,
      b: 109,
      hex: "#F2ED6D"
    },
    {
      pantone: "394",
      r: 234,
      g: 237,
      b: 53,
      hex: "#EAED35"
    },
    {
      pantone: "3945",
      r: 239,
      g: 234,
      b: 7,
      hex: "#EFEA07"
    },
    {
      pantone: "395",
      r: 229,
      g: 232,
      b: 17,
      hex: "#E5E811"
    },
    {
      pantone: "3955",
      r: 237,
      g: 226,
      b: 17,
      hex: "#EDE211"
    },
    {
      pantone: "396",
      r: 224,
      g: 226,
      b: 12,
      hex: "#E0E20C"
    },
    {
      pantone: "3965",
      r: 232,
      g: 221,
      b: 17,
      hex: "#E8DD11"
    },
    {
      pantone: "397",
      r: 193,
      g: 191,
      b: 10,
      hex: "#C1BF0A"
    },
    {
      pantone: "3975",
      r: 181,
      g: 168,
      b: 12,
      hex: "#B5A80C"
    },
    {
      pantone: "398",
      r: 175,
      g: 168,
      b: 10,
      hex: "#AFA80A"
    },
    {
      pantone: "3985",
      r: 153,
      g: 140,
      b: 10,
      hex: "#998C0A"
    },
    {
      pantone: "399",
      r: 153,
      g: 142,
      b: 7,
      hex: "#998E07"
    },
    {
      pantone: "3995",
      r: 109,
      g: 96,
      b: 2,
      hex: "#6D6002"
    },
    {
      pantone: "400",
      r: 209,
      g: 198,
      b: 181,
      hex: "#D1C6B5"
    },
    {
      pantone: "401",
      r: 193,
      g: 181,
      b: 165,
      hex: "#C1B5A5"
    },
    {
      pantone: "402",
      r: 175,
      g: 165,
      b: 147,
      hex: "#AFA593"
    },
    {
      pantone: "403",
      r: 153,
      g: 140,
      b: 124,
      hex: "#998C7C"
    },
    {
      pantone: "404",
      r: 130,
      g: 117,
      b: 102,
      hex: "#827566"
    },
    {
      pantone: "405",
      r: 107,
      g: 94,
      b: 79,
      hex: "#6B5E4F"
    },
    {
      pantone: "406",
      r: 206,
      g: 193,
      b: 181,
      hex: "#CEC1B5"
    },
    {
      pantone: "408",
      r: 168,
      g: 153,
      b: 140,
      hex: "#A8998C"
    },
    {
      pantone: "409",
      r: 153,
      g: 137,
      b: 124,
      hex: "#99897C"
    },
    {
      pantone: "410",
      r: 124,
      g: 109,
      b: 99,
      hex: "#7C6D63"
    },
    {
      pantone: "411",
      r: 102,
      g: 89,
      b: 76,
      hex: "#66594C"
    },
    {
      pantone: "412",
      r: 61,
      g: 48,
      b: 40,
      hex: "#3D3028"
    },
    {
      pantone: "413",
      r: 198,
      g: 193,
      b: 178,
      hex: "#C6C1B2"
    },
    {
      pantone: "414",
      r: 181,
      g: 175,
      b: 160,
      hex: "#B5AFA0"
    },
    {
      pantone: "415",
      r: 163,
      g: 158,
      b: 140,
      hex: "#A39E8C"
    },
    {
      pantone: "416",
      r: 142,
      g: 140,
      b: 122,
      hex: "#8E8C7A"
    },
    {
      pantone: "417",
      r: 119,
      g: 114,
      b: 99,
      hex: "#777263"
    },
    {
      pantone: "418",
      r: 96,
      g: 94,
      b: 79,
      hex: "#605E4F"
    },
    {
      pantone: "419",
      r: 40,
      g: 40,
      b: 33,
      hex: "#282821"
    },
    {
      pantone: "420",
      r: 209,
      g: 204,
      b: 191,
      hex: "#D1CCBF"
    },
    {
      pantone: "421",
      r: 191,
      g: 186,
      b: 175,
      hex: "#BFBAAF"
    },
    {
      pantone: "422",
      r: 175,
      g: 170,
      b: 163,
      hex: "#AFAAA3"
    },
    {
      pantone: "423",
      r: 150,
      g: 147,
      b: 142,
      hex: "#96938E"
    },
    {
      pantone: "424",
      r: 130,
      g: 127,
      b: 119,
      hex: "#827F77"
    },
    {
      pantone: "425",
      r: 96,
      g: 96,
      b: 91,
      hex: "#60605B"
    },
    {
      pantone: "426",
      r: 43,
      g: 43,
      b: 40,
      hex: "#2B2B28"
    },
    {
      pantone: "427",
      r: 221,
      g: 219,
      b: 209,
      hex: "#DDDBD1"
    },
    {
      pantone: "428",
      r: 209,
      g: 206,
      b: 198,
      hex: "#D1CEC6"
    },
    {
      pantone: "429",
      r: 173,
      g: 175,
      b: 170,
      hex: "#ADAFAA"
    },
    {
      pantone: "430",
      r: 145,
      g: 150,
      b: 147,
      hex: "#919693"
    },
    {
      pantone: "431",
      r: 102,
      g: 109,
      b: 112,
      hex: "#666D70"
    },
    {
      pantone: "432",
      r: 68,
      g: 79,
      b: 81,
      hex: "#444F51"
    },
    {
      pantone: "433",
      r: 48,
      g: 56,
      b: 58,
      hex: "#30383A"
    },
    {
      pantone: "433 2x",
      r: 10,
      g: 12,
      b: 17,
      hex: "#0A0C11"
    },
    {
      pantone: "434",
      r: 224,
      g: 209,
      b: 198,
      hex: "#E0D1C6"
    },
    {
      pantone: "435",
      r: 211,
      g: 191,
      b: 183,
      hex: "#D3BFB7"
    },
    {
      pantone: "436",
      r: 188,
      g: 165,
      b: 158,
      hex: "#BCA59E"
    },
    {
      pantone: "437",
      r: 140,
      g: 112,
      b: 107,
      hex: "#8C706B"
    },
    {
      pantone: "438",
      r: 89,
      g: 63,
      b: 61,
      hex: "#593F3D"
    },
    {
      pantone: "439",
      r: 73,
      g: 53,
      b: 51,
      hex: "#493533"
    },
    {
      pantone: "440",
      r: 63,
      g: 48,
      b: 43,
      hex: "#3F302B"
    },
    {
      pantone: "441",
      r: 209,
      g: 209,
      b: 198,
      hex: "#D1D1C6"
    },
    {
      pantone: "442",
      r: 186,
      g: 191,
      b: 183,
      hex: "#BABFB7"
    },
    {
      pantone: "443",
      r: 163,
      g: 168,
      b: 163,
      hex: "#A3A8A3"
    },
    {
      pantone: "444",
      r: 137,
      g: 142,
      b: 140,
      hex: "#898E8C"
    },
    {
      pantone: "445",
      r: 86,
      g: 89,
      b: 89,
      hex: "#565959"
    },
    {
      pantone: "446",
      r: 73,
      g: 76,
      b: 73,
      hex: "#494C49"
    },
    {
      pantone: "447",
      r: 63,
      g: 63,
      b: 56,
      hex: "#3F3F38"
    },
    {
      pantone: "448",
      r: 84,
      g: 71,
      b: 45,
      hex: "#54472D"
    },
    {
      pantone: "4485",
      r: 96,
      g: 76,
      b: 17,
      hex: "#604C11"
    },
    {
      pantone: "449",
      r: 84,
      g: 71,
      b: 38,
      hex: "#544726"
    },
    {
      pantone: "4495",
      r: 135,
      g: 117,
      b: 48,
      hex: "#877530"
    },
    {
      pantone: "450",
      r: 96,
      g: 84,
      b: 43,
      hex: "#60542B"
    },
    {
      pantone: "4505",
      r: 160,
      g: 145,
      b: 81,
      hex: "#A09151"
    },
    {
      pantone: "451",
      r: 173,
      g: 160,
      b: 122,
      hex: "#ADA07A"
    },
    {
      pantone: "4515",
      r: 188,
      g: 173,
      b: 117,
      hex: "#BCAD75"
    },
    {
      pantone: "452",
      r: 196,
      g: 183,
      b: 150,
      hex: "#C4B796"
    },
    {
      pantone: "4525",
      r: 204,
      g: 191,
      b: 142,
      hex: "#CCBF8E"
    },
    {
      pantone: "453",
      r: 214,
      g: 204,
      b: 175,
      hex: "#D6CCAF"
    },
    {
      pantone: "4535",
      r: 219,
      g: 206,
      b: 165,
      hex: "#DBCEA5"
    },
    {
      pantone: "454",
      r: 226,
      g: 216,
      b: 191,
      hex: "#E2D8BF"
    },
    {
      pantone: "4545",
      r: 229,
      g: 219,
      b: 186,
      hex: "#E5DBBA"
    },
    {
      pantone: "455",
      r: 102,
      g: 86,
      b: 20,
      hex: "#665614"
    },
    {
      pantone: "456",
      r: 153,
      g: 135,
      b: 20,
      hex: "#998714"
    },
    {
      pantone: "457",
      r: 181,
      g: 155,
      b: 12,
      hex: "#B59B0C"
    },
    {
      pantone: "458",
      r: 221,
      g: 204,
      b: 107,
      hex: "#DDCC6B"
    },
    {
      pantone: "459",
      r: 226,
      g: 214,
      b: 124,
      hex: "#E2D67C"
    },
    {
      pantone: "460",
      r: 234,
      g: 221,
      b: 150,
      hex: "#EADD96"
    },
    {
      pantone: "461",
      r: 237,
      g: 229,
      b: 173,
      hex: "#EDE5AD"
    },
    {
      pantone: "462",
      r: 91,
      g: 71,
      b: 35,
      hex: "#5B4723"
    },
    {
      pantone: "4625",
      r: 71,
      g: 35,
      b: 17,
      hex: "#472311"
    },
    {
      pantone: "463",
      r: 117,
      g: 84,
      b: 38,
      hex: "#755426"
    },
    {
      pantone: "4635",
      r: 140,
      g: 89,
      b: 51,
      hex: "#8C5933"
    },
    {
      pantone: "464",
      r: 135,
      g: 96,
      b: 40,
      hex: "#876028"
    },
    {
      pantone: "464 2x",
      r: 112,
      g: 66,
      b: 20,
      hex: "#704214"
    },
    {
      pantone: "4645",
      r: 178,
      g: 130,
      b: 96,
      hex: "#B28260"
    },
    {
      pantone: "465",
      r: 193,
      g: 168,
      b: 117,
      hex: "#C1A875"
    },
    {
      pantone: "4655",
      r: 196,
      g: 153,
      b: 119,
      hex: "#C49977"
    },
    {
      pantone: "466",
      r: 209,
      g: 191,
      b: 145,
      hex: "#D1BF91"
    },
    {
      pantone: "4665",
      r: 216,
      g: 181,
      b: 150,
      hex: "#D8B596"
    },
    {
      pantone: "467",
      r: 221,
      g: 204,
      b: 165,
      hex: "#DDCCA5"
    },
    {
      pantone: "4675",
      r: 229,
      g: 198,
      b: 170,
      hex: "#E5C6AA"
    },
    {
      pantone: "468",
      r: 226,
      g: 214,
      b: 181,
      hex: "#E2D6B5"
    },
    {
      pantone: "4685",
      r: 237,
      g: 211,
      b: 188,
      hex: "#EDD3BC"
    },
    {
      pantone: "469",
      r: 96,
      g: 51,
      b: 17,
      hex: "#603311"
    },
    {
      pantone: "4695",
      r: 81,
      g: 38,
      b: 28,
      hex: "#51261C"
    },
    {
      pantone: "470",
      r: 155,
      g: 79,
      b: 25,
      hex: "#9B4F19"
    },
    {
      pantone: "4705",
      r: 124,
      g: 81,
      b: 61,
      hex: "#7C513D"
    },
    {
      pantone: "471",
      r: 188,
      g: 94,
      b: 30,
      hex: "#BC5E1E"
    },
    {
      pantone: "471 2x",
      r: 163,
      g: 68,
      b: 2,
      hex: "#A34402"
    },
    {
      pantone: "4715",
      r: 153,
      g: 112,
      b: 91,
      hex: "#99705B"
    },
    {
      pantone: "472",
      r: 234,
      g: 170,
      b: 122,
      hex: "#EAAA7A"
    },
    {
      pantone: "4725",
      r: 181,
      g: 145,
      b: 124,
      hex: "#B5917C"
    },
    {
      pantone: "473",
      r: 244,
      g: 196,
      b: 160,
      hex: "#F4C4A0"
    },
    {
      pantone: "4735",
      r: 204,
      g: 175,
      b: 155,
      hex: "#CCAF9B"
    },
    {
      pantone: "474",
      r: 244,
      g: 204,
      b: 170,
      hex: "#F4CCAA"
    },
    {
      pantone: "4745",
      r: 216,
      g: 191,
      b: 170,
      hex: "#D8BFAA"
    },
    {
      pantone: "475",
      r: 247,
      g: 211,
      b: 181,
      hex: "#F7D3B5"
    },
    {
      pantone: "4755",
      r: 226,
      g: 204,
      b: 186,
      hex: "#E2CCBA"
    },
    {
      pantone: "476",
      r: 89,
      g: 61,
      b: 43,
      hex: "#593D2B"
    },
    {
      pantone: "477",
      r: 99,
      g: 56,
      b: 38,
      hex: "#633826"
    },
    {
      pantone: "478",
      r: 122,
      g: 63,
      b: 40,
      hex: "#7A3F28"
    },
    {
      pantone: "479",
      r: 175,
      g: 137,
      b: 112,
      hex: "#AF8970"
    },
    {
      pantone: "480",
      r: 211,
      g: 183,
      b: 163,
      hex: "#D3B7A3"
    },
    {
      pantone: "481",
      r: 224,
      g: 204,
      b: 186,
      hex: "#E0CCBA"
    },
    {
      pantone: "482",
      r: 229,
      g: 211,
      b: 193,
      hex: "#E5D3C1"
    },
    {
      pantone: "483",
      r: 107,
      g: 48,
      b: 33,
      hex: "#6B3021"
    },
    {
      pantone: "484",
      r: 155,
      g: 48,
      b: 28,
      hex: "#9B301C"
    },
    {
      pantone: "485",
      r: 216,
      g: 30,
      b: 5,
      hex: "#D81E05"
    },
    {
      pantone: "485 2x",
      r: 204,
      g: 12,
      b: 0,
      hex: "#CC0C00"
    },
    {
      pantone: "486",
      r: 237,
      g: 158,
      b: 132,
      hex: "#ED9E84"
    },
    {
      pantone: "487",
      r: 239,
      g: 181,
      b: 160,
      hex: "#EFB5A0"
    },
    {
      pantone: "488",
      r: 242,
      g: 196,
      b: 175,
      hex: "#F2C4AF"
    },
    {
      pantone: "489",
      r: 242,
      g: 209,
      b: 191,
      hex: "#F2D1BF"
    },
    {
      pantone: "490",
      r: 91,
      g: 38,
      b: 38,
      hex: "#5B2626"
    },
    {
      pantone: "491",
      r: 117,
      g: 40,
      b: 40,
      hex: "#752828"
    },
    {
      pantone: "492",
      r: 145,
      g: 51,
      b: 56,
      hex: "#913338"
    },
    {
      pantone: "494",
      r: 242,
      g: 173,
      b: 178,
      hex: "#F2ADB2"
    },
    {
      pantone: "495",
      r: 244,
      g: 188,
      b: 191,
      hex: "#F4BCBF"
    },
    {
      pantone: "496",
      r: 247,
      g: 201,
      b: 198,
      hex: "#F7C9C6"
    },
    {
      pantone: "497",
      r: 81,
      g: 40,
      b: 38,
      hex: "#512826"
    },
    {
      pantone: "4975",
      r: 68,
      g: 30,
      b: 28,
      hex: "#441E1C"
    },
    {
      pantone: "498",
      r: 109,
      g: 51,
      b: 43,
      hex: "#6D332B"
    },
    {
      pantone: "4985",
      r: 132,
      g: 73,
      b: 73,
      hex: "#844949"
    },
    {
      pantone: "499",
      r: 122,
      g: 56,
      b: 45,
      hex: "#7A382D"
    },
    {
      pantone: "4995",
      r: 165,
      g: 107,
      b: 109,
      hex: "#A56B6D"
    },
    {
      pantone: "500",
      r: 206,
      g: 137,
      b: 140,
      hex: "#CE898C"
    },
    {
      pantone: "5005",
      r: 188,
      g: 135,
      b: 135,
      hex: "#BC8787"
    },
    {
      pantone: "501",
      r: 234,
      g: 178,
      b: 178,
      hex: "#EAB2B2"
    },
    {
      pantone: "5015",
      r: 216,
      g: 173,
      b: 168,
      hex: "#D8ADA8"
    },
    {
      pantone: "502",
      r: 242,
      g: 198,
      b: 196,
      hex: "#F2C6C4"
    },
    {
      pantone: "5025",
      r: 226,
      g: 188,
      b: 183,
      hex: "#E2BCB7"
    },
    {
      pantone: "503",
      r: 244,
      g: 209,
      b: 204,
      hex: "#F4D1CC"
    },
    {
      pantone: "5035",
      r: 237,
      g: 206,
      b: 198,
      hex: "#EDCEC6"
    },
    {
      pantone: "504",
      r: 81,
      g: 30,
      b: 38,
      hex: "#511E26"
    },
    {
      pantone: "505",
      r: 102,
      g: 30,
      b: 43,
      hex: "#661E2B"
    },
    {
      pantone: "506",
      r: 122,
      g: 38,
      b: 56,
      hex: "#7A2638"
    },
    {
      pantone: "507",
      r: 216,
      g: 137,
      b: 155,
      hex: "#D8899B"
    },
    {
      pantone: "508",
      r: 232,
      g: 165,
      b: 175,
      hex: "#E8A5AF"
    },
    {
      pantone: "509",
      r: 242,
      g: 186,
      b: 191,
      hex: "#F2BABF"
    },
    {
      pantone: "510",
      r: 244,
      g: 198,
      b: 201,
      hex: "#F4C6C9"
    },
    {
      pantone: "511",
      r: 96,
      g: 33,
      b: 68,
      hex: "#602144"
    },
    {
      pantone: "5115",
      r: 79,
      g: 33,
      b: 58,
      hex: "#4F213A"
    },
    {
      pantone: "512",
      r: 132,
      g: 33,
      b: 107,
      hex: "#84216B"
    },
    {
      pantone: "5125",
      r: 117,
      g: 71,
      b: 96,
      hex: "#754760"
    },
    {
      pantone: "513",
      r: 158,
      g: 35,
      b: 135,
      hex: "#9E2387"
    },
    {
      pantone: "5135",
      r: 147,
      g: 107,
      b: 127,
      hex: "#936B7F"
    },
    {
      pantone: "514",
      r: 216,
      g: 132,
      b: 188,
      hex: "#D884BC"
    },
    {
      pantone: "5145",
      r: 173,
      g: 135,
      b: 153,
      hex: "#AD8799"
    },
    {
      pantone: "515",
      r: 232,
      g: 163,
      b: 201,
      hex: "#E8A3C9"
    },
    {
      pantone: "5155",
      r: 204,
      g: 175,
      b: 183,
      hex: "#CCAFB7"
    },
    {
      pantone: "516",
      r: 242,
      g: 186,
      b: 211,
      hex: "#F2BAD3"
    },
    {
      pantone: "5165",
      r: 224,
      g: 201,
      b: 204,
      hex: "#E0C9CC"
    },
    {
      pantone: "517",
      r: 244,
      g: 204,
      b: 216,
      hex: "#F4CCD8"
    },
    {
      pantone: "5175",
      r: 232,
      g: 214,
      b: 209,
      hex: "#E8D6D1"
    },
    {
      pantone: "518",
      r: 81,
      g: 45,
      b: 68,
      hex: "#512D44"
    },
    {
      pantone: "5185",
      r: 71,
      g: 40,
      b: 53,
      hex: "#472835"
    },
    {
      pantone: "519",
      r: 99,
      g: 48,
      b: 94,
      hex: "#63305E"
    },
    {
      pantone: "5195",
      r: 89,
      g: 51,
      b: 68,
      hex: "#593344"
    },
    {
      pantone: "520",
      r: 112,
      g: 53,
      b: 114,
      hex: "#703572"
    },
    {
      pantone: "5205",
      r: 142,
      g: 104,
      b: 119,
      hex: "#8E6877"
    },
    {
      pantone: "521",
      r: 181,
      g: 140,
      b: 178,
      hex: "#B58CB2"
    },
    {
      pantone: "5215",
      r: 181,
      g: 147,
      b: 155,
      hex: "#B5939B"
    },
    {
      pantone: "522",
      r: 198,
      g: 163,
      b: 193,
      hex: "#C6A3C1"
    },
    {
      pantone: "5225",
      r: 204,
      g: 173,
      b: 175,
      hex: "#CCADAF"
    },
    {
      pantone: "523",
      r: 211,
      g: 183,
      b: 204,
      hex: "#D3B7CC"
    },
    {
      pantone: "5235",
      r: 221,
      g: 198,
      b: 196,
      hex: "#DDC6C4"
    },
    {
      pantone: "524",
      r: 226,
      g: 204,
      b: 211,
      hex: "#E2CCD3"
    },
    {
      pantone: "5245",
      r: 229,
      g: 211,
      b: 204,
      hex: "#E5D3CC"
    },
    {
      pantone: "525",
      r: 81,
      g: 38,
      b: 84,
      hex: "#512654"
    },
    {
      pantone: "5255",
      r: 53,
      g: 38,
      b: 79,
      hex: "#35264F"
    },
    {
      pantone: "526",
      r: 104,
      g: 33,
      b: 122,
      hex: "#68217A"
    },
    {
      pantone: "5265",
      r: 73,
      g: 61,
      b: 99,
      hex: "#493D63"
    },
    {
      pantone: "527",
      r: 122,
      g: 30,
      b: 153,
      hex: "#7A1E99"
    },
    {
      pantone: "5275",
      r: 96,
      g: 86,
      b: 119,
      hex: "#605677"
    },
    {
      pantone: "528",
      r: 175,
      g: 114,
      b: 193,
      hex: "#AF72C1"
    },
    {
      pantone: "5285",
      r: 140,
      g: 130,
      b: 153,
      hex: "#8C8299"
    },
    {
      pantone: "529",
      r: 206,
      g: 163,
      b: 211,
      hex: "#CEA3D3"
    },
    {
      pantone: "5295",
      r: 178,
      g: 168,
      b: 181,
      hex: "#B2A8B5"
    },
    {
      pantone: "530",
      r: 214,
      g: 175,
      b: 214,
      hex: "#D6AFD6"
    },
    {
      pantone: "5305",
      r: 204,
      g: 193,
      b: 198,
      hex: "#CCC1C6"
    },
    {
      pantone: "531",
      r: 229,
      g: 198,
      b: 219,
      hex: "#E5C6DB"
    },
    {
      pantone: "5315",
      r: 219,
      g: 211,
      b: 211,
      hex: "#DBD3D3"
    },
    {
      pantone: "532",
      r: 53,
      g: 56,
      b: 66,
      hex: "#353842"
    },
    {
      pantone: "533",
      r: 53,
      g: 63,
      b: 91,
      hex: "#353F5B"
    },
    {
      pantone: "534",
      r: 58,
      g: 73,
      b: 114,
      hex: "#3A4972"
    },
    {
      pantone: "535",
      r: 155,
      g: 163,
      b: 183,
      hex: "#9BA3B7"
    },
    {
      pantone: "536",
      r: 173,
      g: 178,
      b: 193,
      hex: "#ADB2C1"
    },
    {
      pantone: "537",
      r: 196,
      g: 198,
      b: 206,
      hex: "#C4C6CE"
    },
    {
      pantone: "538",
      r: 214,
      g: 211,
      b: 214,
      hex: "#D6D3D6"
    },
    {
      pantone: "539",
      r: 0,
      g: 48,
      b: 73,
      hex: "#003049"
    },
    {
      pantone: "5395",
      r: 2,
      g: 40,
      b: 58,
      hex: "#02283A"
    },
    {
      pantone: "540",
      r: 0,
      g: 51,
      b: 91,
      hex: "#00335B"
    },
    {
      pantone: "5405",
      r: 63,
      g: 96,
      b: 117,
      hex: "#3F6075"
    },
    {
      pantone: "541",
      r: 0,
      g: 63,
      b: 119,
      hex: "#003F77"
    },
    {
      pantone: "5415",
      r: 96,
      g: 124,
      b: 140,
      hex: "#607C8C"
    },
    {
      pantone: "542",
      r: 102,
      g: 147,
      b: 188,
      hex: "#6693BC"
    },
    {
      pantone: "5425",
      r: 132,
      g: 153,
      b: 165,
      hex: "#8499A5"
    },
    {
      pantone: "543",
      r: 147,
      g: 183,
      b: 209,
      hex: "#93B7D1"
    },
    {
      pantone: "5435",
      r: 175,
      g: 188,
      b: 191,
      hex: "#AFBCBF"
    },
    {
      pantone: "544",
      r: 183,
      g: 204,
      b: 219,
      hex: "#B7CCDB"
    },
    {
      pantone: "5445",
      r: 196,
      g: 204,
      b: 204,
      hex: "#C4CCCC"
    },
    {
      pantone: "545",
      r: 196,
      g: 211,
      b: 221,
      hex: "#C4D3DD"
    },
    {
      pantone: "5455",
      r: 214,
      g: 216,
      b: 211,
      hex: "#D6D8D3"
    },
    {
      pantone: "546",
      r: 12,
      g: 56,
      b: 68,
      hex: "#0C3844"
    },
    {
      pantone: "5463",
      r: 0,
      g: 53,
      b: 58,
      hex: "#00353A"
    },
    {
      pantone: "5467",
      r: 25,
      g: 56,
      b: 51,
      hex: "#193833"
    },
    {
      pantone: "547",
      r: 0,
      g: 63,
      b: 84,
      hex: "#003F54"
    },
    {
      pantone: "5473",
      r: 38,
      g: 104,
      b: 109,
      hex: "#26686D"
    },
    {
      pantone: "5477",
      r: 58,
      g: 86,
      b: 79,
      hex: "#3A564F"
    },
    {
      pantone: "548",
      r: 0,
      g: 68,
      b: 89,
      hex: "#004459"
    },
    {
      pantone: "5483",
      r: 96,
      g: 145,
      b: 145,
      hex: "#609191"
    },
    {
      pantone: "5487",
      r: 102,
      g: 124,
      b: 114,
      hex: "#667C72"
    },
    {
      pantone: "549",
      r: 94,
      g: 153,
      b: 170,
      hex: "#5E99AA"
    },
    {
      pantone: "5493",
      r: 140,
      g: 175,
      b: 173,
      hex: "#8CAFAD"
    },
    {
      pantone: "5497",
      r: 145,
      g: 163,
      b: 153,
      hex: "#91A399"
    },
    {
      pantone: "550",
      r: 135,
      g: 175,
      b: 191,
      hex: "#87AFBF"
    },
    {
      pantone: "5503",
      r: 170,
      g: 196,
      b: 191,
      hex: "#AAC4BF"
    },
    {
      pantone: "5507",
      r: 175,
      g: 186,
      b: 178,
      hex: "#AFBAB2"
    },
    {
      pantone: "551",
      r: 163,
      g: 193,
      b: 201,
      hex: "#A3C1C9"
    },
    {
      pantone: "5513",
      r: 206,
      g: 216,
      b: 209,
      hex: "#CED8D1"
    },
    {
      pantone: "5517",
      r: 201,
      g: 206,
      b: 196,
      hex: "#C9CEC4"
    },
    {
      pantone: "552",
      r: 196,
      g: 214,
      b: 214,
      hex: "#C4D6D6"
    },
    {
      pantone: "5523",
      r: 214,
      g: 221,
      b: 214,
      hex: "#D6DDD6"
    },
    {
      pantone: "5527",
      r: 206,
      g: 209,
      b: 198,
      hex: "#CED1C6"
    },
    {
      pantone: "553",
      r: 35,
      g: 68,
      b: 53,
      hex: "#234435"
    },
    {
      pantone: "5535",
      r: 33,
      g: 61,
      b: 48,
      hex: "#213D30"
    },
    {
      pantone: "554",
      r: 25,
      g: 94,
      b: 71,
      hex: "#195E47"
    },
    {
      pantone: "5545",
      r: 79,
      g: 109,
      b: 94,
      hex: "#4F6D5E"
    },
    {
      pantone: "555",
      r: 7,
      g: 109,
      b: 84,
      hex: "#076D54"
    },
    {
      pantone: "5555",
      r: 119,
      g: 145,
      b: 130,
      hex: "#779182"
    },
    {
      pantone: "556",
      r: 122,
      g: 168,
      b: 145,
      hex: "#7AA891"
    },
    {
      pantone: "5565",
      r: 150,
      g: 170,
      b: 153,
      hex: "#96AA99"
    },
    {
      pantone: "557",
      r: 163,
      g: 193,
      b: 173,
      hex: "#A3C1AD"
    },
    {
      pantone: "5575",
      r: 175,
      g: 191,
      b: 173,
      hex: "#AFBFAD"
    },
    {
      pantone: "558",
      r: 183,
      g: 206,
      b: 188,
      hex: "#B7CEBC"
    },
    {
      pantone: "5585",
      r: 196,
      g: 206,
      b: 191,
      hex: "#C4CEBF"
    },
    {
      pantone: "559",
      r: 198,
      g: 214,
      b: 196,
      hex: "#C6D6C4"
    },
    {
      pantone: "5595",
      r: 216,
      g: 219,
      b: 204,
      hex: "#D8DBCC"
    },
    {
      pantone: "560",
      r: 43,
      g: 76,
      b: 63,
      hex: "#2B4C3F"
    },
    {
      pantone: "5605",
      r: 35,
      g: 58,
      b: 45,
      hex: "#233A2D"
    },
    {
      pantone: "561",
      r: 38,
      g: 102,
      b: 89,
      hex: "#266659"
    },
    {
      pantone: "5615",
      r: 84,
      g: 104,
      b: 86,
      hex: "#546856"
    },
    {
      pantone: "562",
      r: 30,
      g: 122,
      b: 109,
      hex: "#1E7A6D"
    },
    {
      pantone: "5625",
      r: 114,
      g: 132,
      b: 112,
      hex: "#728470"
    },
    {
      pantone: "563",
      r: 127,
      g: 188,
      b: 170,
      hex: "#7FBCAA"
    },
    {
      pantone: "5635",
      r: 158,
      g: 170,
      b: 153,
      hex: "#9EAA99"
    },
    {
      pantone: "564",
      r: 5,
      g: 112,
      b: 94,
      hex: "#05705E"
    },
    {
      pantone: "5645",
      r: 188,
      g: 193,
      b: 178,
      hex: "#BCC1B2"
    },
    {
      pantone: "565",
      r: 188,
      g: 219,
      b: 204,
      hex: "#BCDBCC"
    },
    {
      pantone: "5655",
      r: 198,
      g: 204,
      b: 186,
      hex: "#C6CCBA"
    },
    {
      pantone: "566",
      r: 209,
      g: 226,
      b: 211,
      hex: "#D1E2D3"
    },
    {
      pantone: "5665",
      r: 214,
      g: 214,
      b: 198,
      hex: "#D6D6C6"
    },
    {
      pantone: "567",
      r: 38,
      g: 81,
      b: 66,
      hex: "#265142"
    },
    {
      pantone: "568",
      r: 0,
      g: 114,
      b: 99,
      hex: "#007263"
    },
    {
      pantone: "569",
      r: 0,
      g: 135,
      b: 114,
      hex: "#008772"
    },
    {
      pantone: "570",
      r: 127,
      g: 198,
      b: 178,
      hex: "#7FC6B2"
    },
    {
      pantone: "571",
      r: 170,
      g: 219,
      b: 198,
      hex: "#AADBC6"
    },
    {
      pantone: "572",
      r: 188,
      g: 226,
      b: 206,
      hex: "#BCE2CE"
    },
    {
      pantone: "573",
      r: 204,
      g: 229,
      b: 214,
      hex: "#CCE5D6"
    },
    {
      pantone: "574",
      r: 73,
      g: 89,
      b: 40,
      hex: "#495928"
    },
    {
      pantone: "5743",
      r: 63,
      g: 73,
      b: 38,
      hex: "#3F4926"
    },
    {
      pantone: "5747",
      r: 66,
      g: 71,
      b: 22,
      hex: "#424716"
    },
    {
      pantone: "575",
      r: 84,
      g: 119,
      b: 48,
      hex: "#547730"
    },
    {
      pantone: "5753",
      r: 94,
      g: 102,
      b: 58,
      hex: "#5E663A"
    },
    {
      pantone: "5757",
      r: 107,
      g: 112,
      b: 43,
      hex: "#6B702B"
    },
    {
      pantone: "576",
      r: 96,
      g: 142,
      b: 58,
      hex: "#608E3A"
    },
    {
      pantone: "5763",
      r: 119,
      g: 124,
      b: 79,
      hex: "#777C4F"
    },
    {
      pantone: "5767",
      r: 140,
      g: 145,
      b: 79,
      hex: "#8C914F"
    },
    {
      pantone: "577",
      r: 181,
      g: 204,
      b: 142,
      hex: "#B5CC8E"
    },
    {
      pantone: "5773",
      r: 155,
      g: 158,
      b: 114,
      hex: "#9B9E72"
    },
    {
      pantone: "5777",
      r: 170,
      g: 173,
      b: 117,
      hex: "#AAAD75"
    },
    {
      pantone: "578",
      r: 198,
      g: 214,
      b: 160,
      hex: "#C6D6A0"
    },
    {
      pantone: "5783",
      r: 181,
      g: 181,
      b: 142,
      hex: "#B5B58E"
    },
    {
      pantone: "5787",
      r: 198,
      g: 198,
      b: 153,
      hex: "#C6C699"
    },
    {
      pantone: "579",
      r: 201,
      g: 214,
      b: 163,
      hex: "#C9D6A3"
    },
    {
      pantone: "5793",
      r: 198,
      g: 198,
      b: 165,
      hex: "#C6C6A5"
    },
    {
      pantone: "5797",
      r: 211,
      g: 209,
      b: 170,
      hex: "#D3D1AA"
    },
    {
      pantone: "580",
      r: 216,
      g: 221,
      b: 181,
      hex: "#D8DDB5"
    },
    {
      pantone: "5803",
      r: 216,
      g: 214,
      b: 183,
      hex: "#D8D6B7"
    },
    {
      pantone: "5807",
      r: 224,
      g: 221,
      b: 188,
      hex: "#E0DDBC"
    },
    {
      pantone: "581",
      r: 96,
      g: 94,
      b: 17,
      hex: "#605E11"
    },
    {
      pantone: "5815",
      r: 73,
      g: 68,
      b: 17,
      hex: "#494411"
    },
    {
      pantone: "582",
      r: 135,
      g: 137,
      b: 5,
      hex: "#878905"
    },
    {
      pantone: "5825",
      r: 117,
      g: 112,
      b: 43,
      hex: "#75702B"
    },
    {
      pantone: "583",
      r: 170,
      g: 186,
      b: 10,
      hex: "#AABA0A"
    },
    {
      pantone: "5835",
      r: 158,
      g: 153,
      b: 89,
      hex: "#9E9959"
    },
    {
      pantone: "584",
      r: 206,
      g: 214,
      b: 73,
      hex: "#CED649"
    },
    {
      pantone: "5845",
      r: 178,
      g: 170,
      b: 112,
      hex: "#B2AA70"
    },
    {
      pantone: "585",
      r: 219,
      g: 224,
      b: 107,
      hex: "#DBE06B"
    },
    {
      pantone: "5855",
      r: 204,
      g: 198,
      b: 147,
      hex: "#CCC693"
    },
    {
      pantone: "586",
      r: 226,
      g: 229,
      b: 132,
      hex: "#E2E584"
    },
    {
      pantone: "5865",
      r: 214,
      g: 206,
      b: 163,
      hex: "#D6CEA3"
    },
    {
      pantone: "587",
      r: 232,
      g: 232,
      b: 155,
      hex: "#E8E89B"
    },
    {
      pantone: "5875",
      r: 224,
      g: 219,
      b: 181,
      hex: "#E0DBB5"
    },
    {
      pantone: "600",
      r: 244,
      g: 237,
      b: 175,
      hex: "#F4EDAF"
    },
    {
      pantone: "601",
      r: 242,
      g: 237,
      b: 158,
      hex: "#F2ED9E"
    },
    {
      pantone: "602",
      r: 242,
      g: 234,
      b: 135,
      hex: "#F2EA87"
    },
    {
      pantone: "603",
      r: 237,
      g: 232,
      b: 91,
      hex: "#EDE85B"
    },
    {
      pantone: "604",
      r: 232,
      g: 221,
      b: 33,
      hex: "#E8DD21"
    },
    {
      pantone: "605",
      r: 221,
      g: 206,
      b: 17,
      hex: "#DDCE11"
    },
    {
      pantone: "606",
      r: 211,
      g: 191,
      b: 17,
      hex: "#D3BF11"
    },
    {
      pantone: "607",
      r: 242,
      g: 234,
      b: 188,
      hex: "#F2EABC"
    },
    {
      pantone: "608",
      r: 239,
      g: 232,
      b: 173,
      hex: "#EFE8AD"
    },
    {
      pantone: "609",
      r: 234,
      g: 229,
      b: 150,
      hex: "#EAE596"
    },
    {
      pantone: "610",
      r: 226,
      g: 219,
      b: 114,
      hex: "#E2DB72"
    },
    {
      pantone: "611",
      r: 214,
      g: 206,
      b: 73,
      hex: "#D6CE49"
    },
    {
      pantone: "612",
      r: 196,
      g: 186,
      b: 0,
      hex: "#C4BA00"
    },
    {
      pantone: "613",
      r: 175,
      g: 160,
      b: 12,
      hex: "#AFA00C"
    },
    {
      pantone: "614",
      r: 234,
      g: 226,
      b: 183,
      hex: "#EAE2B7"
    },
    {
      pantone: "615",
      r: 226,
      g: 219,
      b: 170,
      hex: "#E2DBAA"
    },
    {
      pantone: "616",
      r: 221,
      g: 214,
      b: 155,
      hex: "#DDD69B"
    },
    {
      pantone: "617",
      r: 204,
      g: 196,
      b: 124,
      hex: "#CCC47C"
    },
    {
      pantone: "618",
      r: 181,
      g: 170,
      b: 89,
      hex: "#B5AA59"
    },
    {
      pantone: "619",
      r: 150,
      g: 140,
      b: 40,
      hex: "#968C28"
    },
    {
      pantone: "620",
      r: 132,
      g: 119,
      b: 17,
      hex: "#847711"
    },
    {
      pantone: "621",
      r: 216,
      g: 221,
      b: 206,
      hex: "#D8DDCE"
    },
    {
      pantone: "622",
      r: 193,
      g: 209,
      b: 191,
      hex: "#C1D1BF"
    },
    {
      pantone: "623",
      r: 165,
      g: 191,
      b: 170,
      hex: "#A5BFAA"
    },
    {
      pantone: "624",
      r: 127,
      g: 160,
      b: 140,
      hex: "#7FA08C"
    },
    {
      pantone: "625",
      r: 91,
      g: 135,
      b: 114,
      hex: "#5B8772"
    },
    {
      pantone: "626",
      r: 33,
      g: 84,
      b: 63,
      hex: "#21543F"
    },
    {
      pantone: "627",
      r: 12,
      g: 48,
      b: 38,
      hex: "#0C3026"
    },
    {
      pantone: "628",
      r: 204,
      g: 226,
      b: 221,
      hex: "#CCE2DD"
    },
    {
      pantone: "629",
      r: 178,
      g: 216,
      b: 216,
      hex: "#B2D8D8"
    },
    {
      pantone: "630",
      r: 140,
      g: 204,
      b: 211,
      hex: "#8CCCD3"
    },
    {
      pantone: "631",
      r: 84,
      g: 183,
      b: 198,
      hex: "#54B7C6"
    },
    {
      pantone: "632",
      r: 0,
      g: 160,
      b: 186,
      hex: "#00A0BA"
    },
    {
      pantone: "633",
      r: 0,
      g: 127,
      b: 153,
      hex: "#007F99"
    },
    {
      pantone: "634",
      r: 0,
      g: 102,
      b: 127,
      hex: "#00667F"
    },
    {
      pantone: "635",
      r: 186,
      g: 224,
      b: 224,
      hex: "#BAE0E0"
    },
    {
      pantone: "636",
      r: 153,
      g: 214,
      b: 221,
      hex: "#99D6DD"
    },
    {
      pantone: "637",
      r: 107,
      g: 201,
      b: 219,
      hex: "#6BC9DB"
    },
    {
      pantone: "638",
      r: 0,
      g: 181,
      b: 214,
      hex: "#00B5D6"
    },
    {
      pantone: "639",
      r: 0,
      g: 160,
      b: 196,
      hex: "#00A0C4"
    },
    {
      pantone: "640",
      r: 0,
      g: 140,
      b: 178,
      hex: "#008CB2"
    },
    {
      pantone: "641",
      r: 0,
      g: 122,
      b: 165,
      hex: "#007AA5"
    },
    {
      pantone: "642",
      r: 209,
      g: 216,
      b: 216,
      hex: "#D1D8D8"
    },
    {
      pantone: "643",
      r: 198,
      g: 209,
      b: 214,
      hex: "#C6D1D6"
    },
    {
      pantone: "644",
      r: 155,
      g: 175,
      b: 196,
      hex: "#9BAFC4"
    },
    {
      pantone: "645",
      r: 119,
      g: 150,
      b: 178,
      hex: "#7796B2"
    },
    {
      pantone: "646",
      r: 94,
      g: 130,
      b: 163,
      hex: "#5E82A3"
    },
    {
      pantone: "647",
      r: 38,
      g: 84,
      b: 124,
      hex: "#26547C"
    },
    {
      pantone: "648",
      r: 0,
      g: 48,
      b: 94,
      hex: "#00305E"
    },
    {
      pantone: "649",
      r: 214,
      g: 214,
      b: 216,
      hex: "#D6D6D8"
    },
    {
      pantone: "650",
      r: 191,
      g: 198,
      b: 209,
      hex: "#BFC6D1"
    },
    {
      pantone: "651",
      r: 155,
      g: 170,
      b: 191,
      hex: "#9BAABF"
    },
    {
      pantone: "652",
      r: 109,
      g: 135,
      b: 168,
      hex: "#6D87A8"
    },
    {
      pantone: "653",
      r: 51,
      g: 86,
      b: 135,
      hex: "#335687"
    },
    {
      pantone: "654",
      r: 15,
      g: 43,
      b: 91,
      hex: "#0F2B5B"
    },
    {
      pantone: "655",
      r: 12,
      g: 28,
      b: 71,
      hex: "#0C1C47"
    },
    {
      pantone: "656",
      r: 214,
      g: 219,
      b: 224,
      hex: "#D6DBE0"
    },
    {
      pantone: "657",
      r: 193,
      g: 201,
      b: 221,
      hex: "#C1C9DD"
    },
    {
      pantone: "658",
      r: 165,
      g: 175,
      b: 214,
      hex: "#A5AFD6"
    },
    {
      pantone: "659",
      r: 127,
      g: 140,
      b: 191,
      hex: "#7F8CBF"
    },
    {
      pantone: "660",
      r: 89,
      g: 96,
      b: 168,
      hex: "#5960A8"
    },
    {
      pantone: "661",
      r: 45,
      g: 51,
      b: 142,
      hex: "#2D338E"
    },
    {
      pantone: "662",
      r: 12,
      g: 25,
      b: 117,
      hex: "#0C1975"
    },
    {
      pantone: "663",
      r: 226,
      g: 211,
      b: 214,
      hex: "#E2D3D6"
    },
    {
      pantone: "664",
      r: 216,
      g: 204,
      b: 209,
      hex: "#D8CCD1"
    },
    {
      pantone: "665",
      r: 198,
      g: 181,
      b: 196,
      hex: "#C6B5C4"
    },
    {
      pantone: "666",
      r: 168,
      g: 147,
      b: 173,
      hex: "#A893AD"
    },
    {
      pantone: "667",
      r: 127,
      g: 102,
      b: 137,
      hex: "#7F6689"
    },
    {
      pantone: "668",
      r: 102,
      g: 73,
      b: 117,
      hex: "#664975"
    },
    {
      pantone: "669",
      r: 71,
      g: 43,
      b: 89,
      hex: "#472B59"
    },
    {
      pantone: "670",
      r: 242,
      g: 214,
      b: 216,
      hex: "#F2D6D8"
    },
    {
      pantone: "671",
      r: 239,
      g: 198,
      b: 211,
      hex: "#EFC6D3"
    },
    {
      pantone: "672",
      r: 234,
      g: 170,
      b: 196,
      hex: "#EAAAC4"
    },
    {
      pantone: "673",
      r: 224,
      g: 140,
      b: 178,
      hex: "#E08CB2"
    },
    {
      pantone: "674",
      r: 211,
      g: 107,
      b: 158,
      hex: "#D36B9E"
    },
    {
      pantone: "675",
      r: 188,
      g: 56,
      b: 119,
      hex: "#BC3877"
    },
    {
      pantone: "676",
      r: 160,
      g: 0,
      b: 84,
      hex: "#A00054"
    },
    {
      pantone: "677",
      r: 237,
      g: 214,
      b: 214,
      hex: "#EDD6D6"
    },
    {
      pantone: "678",
      r: 234,
      g: 204,
      b: 206,
      hex: "#EACCCE"
    },
    {
      pantone: "679",
      r: 229,
      g: 191,
      b: 198,
      hex: "#E5BFC6"
    },
    {
      pantone: "680",
      r: 211,
      g: 158,
      b: 175,
      hex: "#D39EAF"
    },
    {
      pantone: "681",
      r: 183,
      g: 114,
      b: 142,
      hex: "#B7728E"
    },
    {
      pantone: "682",
      r: 160,
      g: 81,
      b: 117,
      hex: "#A05175"
    },
    {
      pantone: "683",
      r: 127,
      g: 40,
      b: 79,
      hex: "#7F284F"
    },
    {
      pantone: "684",
      r: 239,
      g: 204,
      b: 206,
      hex: "#EFCCCE"
    },
    {
      pantone: "685",
      r: 234,
      g: 191,
      b: 196,
      hex: "#EABFC4"
    },
    {
      pantone: "686",
      r: 224,
      g: 170,
      b: 186,
      hex: "#E0AABA"
    },
    {
      pantone: "687",
      r: 201,
      g: 137,
      b: 158,
      hex: "#C9899E"
    },
    {
      pantone: "688",
      r: 178,
      g: 102,
      b: 132,
      hex: "#B26684"
    },
    {
      pantone: "689",
      r: 147,
      g: 66,
      b: 102,
      hex: "#934266"
    },
    {
      pantone: "690",
      r: 112,
      g: 35,
      b: 66,
      hex: "#702342"
    },
    {
      pantone: "691",
      r: 239,
      g: 209,
      b: 201,
      hex: "#EFD1C9"
    },
    {
      pantone: "692",
      r: 232,
      g: 191,
      b: 186,
      hex: "#E8BFBA"
    },
    {
      pantone: "693",
      r: 219,
      g: 168,
      b: 165,
      hex: "#DBA8A5"
    },
    {
      pantone: "694",
      r: 201,
      g: 140,
      b: 140,
      hex: "#C98C8C"
    },
    {
      pantone: "695",
      r: 178,
      g: 107,
      b: 112,
      hex: "#B26B70"
    },
    {
      pantone: "696",
      r: 142,
      g: 71,
      b: 73,
      hex: "#8E4749"
    },
    {
      pantone: "697",
      r: 127,
      g: 56,
      b: 58,
      hex: "#7F383A"
    },
    {
      pantone: "698",
      r: 247,
      g: 209,
      b: 204,
      hex: "#F7D1CC"
    },
    {
      pantone: "699",
      r: 247,
      g: 191,
      b: 191,
      hex: "#F7BFBF"
    },
    {
      pantone: "700",
      r: 242,
      g: 165,
      b: 170,
      hex: "#F2A5AA"
    },
    {
      pantone: "701",
      r: 232,
      g: 135,
      b: 142,
      hex: "#E8878E"
    },
    {
      pantone: "702",
      r: 214,
      g: 96,
      b: 109,
      hex: "#D6606D"
    },
    {
      pantone: "703",
      r: 183,
      g: 56,
      b: 68,
      hex: "#B73844"
    },
    {
      pantone: "704",
      r: 158,
      g: 40,
      b: 40,
      hex: "#9E2828"
    },
    {
      pantone: "705",
      r: 249,
      g: 221,
      b: 214,
      hex: "#F9DDD6"
    },
    {
      pantone: "706",
      r: 252,
      g: 201,
      b: 198,
      hex: "#FCC9C6"
    },
    {
      pantone: "707",
      r: 252,
      g: 173,
      b: 175,
      hex: "#FCADAF"
    },
    {
      pantone: "708",
      r: 249,
      g: 142,
      b: 153,
      hex: "#F98E99"
    },
    {
      pantone: "709",
      r: 242,
      g: 104,
      b: 119,
      hex: "#F26877"
    },
    {
      pantone: "710",
      r: 224,
      g: 66,
      b: 81,
      hex: "#E04251"
    },
    {
      pantone: "711",
      r: 209,
      g: 45,
      b: 51,
      hex: "#D12D33"
    },
    {
      pantone: "712",
      r: 255,
      g: 211,
      b: 170,
      hex: "#FFD3AA"
    },
    {
      pantone: "713",
      r: 249,
      g: 201,
      b: 163,
      hex: "#F9C9A3"
    },
    {
      pantone: "714",
      r: 249,
      g: 186,
      b: 130,
      hex: "#F9BA82"
    },
    {
      pantone: "715",
      r: 252,
      g: 158,
      b: 73,
      hex: "#FC9E49"
    },
    {
      pantone: "716",
      r: 242,
      g: 132,
      b: 17,
      hex: "#F28411"
    },
    {
      pantone: "717",
      r: 211,
      g: 109,
      b: 0,
      hex: "#D36D00"
    },
    {
      pantone: "718",
      r: 191,
      g: 91,
      b: 0,
      hex: "#BF5B00"
    },
    {
      pantone: "719",
      r: 244,
      g: 209,
      b: 175,
      hex: "#F4D1AF"
    },
    {
      pantone: "720",
      r: 239,
      g: 196,
      b: 158,
      hex: "#EFC49E"
    },
    {
      pantone: "721",
      r: 232,
      g: 178,
      b: 130,
      hex: "#E8B282"
    },
    {
      pantone: "722",
      r: 209,
      g: 142,
      b: 84,
      hex: "#D18E54"
    },
    {
      pantone: "723",
      r: 186,
      g: 117,
      b: 48,
      hex: "#BA7530"
    },
    {
      pantone: "724",
      r: 142,
      g: 73,
      b: 5,
      hex: "#8E4905"
    },
    {
      pantone: "725",
      r: 117,
      g: 56,
      b: 2,
      hex: "#753802"
    },
    {
      pantone: "726",
      r: 237,
      g: 211,
      b: 181,
      hex: "#EDD3B5"
    },
    {
      pantone: "727",
      r: 226,
      g: 191,
      b: 155,
      hex: "#E2BF9B"
    },
    {
      pantone: "728",
      r: 211,
      g: 168,
      b: 124,
      hex: "#D3A87C"
    },
    {
      pantone: "729",
      r: 193,
      g: 142,
      b: 96,
      hex: "#C18E60"
    },
    {
      pantone: "730",
      r: 170,
      g: 117,
      b: 63,
      hex: "#AA753F"
    },
    {
      pantone: "731",
      r: 114,
      g: 63,
      b: 10,
      hex: "#723F0A"
    },
    {
      pantone: "732",
      r: 96,
      g: 51,
      b: 10,
      hex: "#60330A"
    },
    {
      pantone: "801",
      r: 0,
      g: 170,
      b: 204,
      hex: "#00AACC"
    },
    {
      pantone: "801 2x",
      r: 0,
      g: 137,
      b: 175,
      hex: "#0089AF"
    },
    {
      pantone: "802",
      r: 96,
      g: 221,
      b: 73,
      hex: "#60DD49"
    },
    {
      pantone: "802 2x",
      r: 28,
      g: 206,
      b: 40,
      hex: "#1CCE28"
    },
    {
      pantone: "803",
      r: 255,
      g: 237,
      b: 56,
      hex: "#FFED38"
    },
    {
      pantone: "803 2x",
      r: 255,
      g: 216,
      b: 22,
      hex: "#FFD816"
    },
    {
      pantone: "804",
      r: 255,
      g: 147,
      b: 56,
      hex: "#FF9338"
    },
    {
      pantone: "804 2x",
      r: 255,
      g: 127,
      b: 30,
      hex: "#FF7F1E"
    },
    {
      pantone: "805",
      r: 249,
      g: 89,
      b: 81,
      hex: "#F95951"
    },
    {
      pantone: "805 2x",
      r: 249,
      g: 58,
      b: 43,
      hex: "#F93A2B"
    },
    {
      pantone: "806",
      r: 255,
      g: 0,
      b: 147,
      hex: "#FF0093"
    },
    {
      pantone: "806 2x",
      r: 247,
      g: 2,
      b: 124,
      hex: "#F7027C"
    },
    {
      pantone: "807",
      r: 214,
      g: 0,
      b: 158,
      hex: "#D6009E"
    },
    {
      pantone: "807 2x",
      r: 191,
      g: 0,
      b: 140,
      hex: "#BF008C"
    },
    {
      pantone: "808",
      r: 0,
      g: 181,
      b: 155,
      hex: "#00B59B"
    },
    {
      pantone: "808 2x",
      r: 0,
      g: 160,
      b: 135,
      hex: "#00A087"
    },
    {
      pantone: "809",
      r: 221,
      g: 224,
      b: 15,
      hex: "#DDE00F"
    },
    {
      pantone: "809 2x",
      r: 214,
      g: 214,
      b: 12,
      hex: "#D6D60C"
    },
    {
      pantone: "810",
      r: 255,
      g: 204,
      b: 30,
      hex: "#FFCC1E"
    },
    {
      pantone: "810 2x",
      r: 255,
      g: 188,
      b: 33,
      hex: "#FFBC21"
    },
    {
      pantone: "811",
      r: 255,
      g: 114,
      b: 71,
      hex: "#FF7247"
    },
    {
      pantone: "811 2x",
      r: 255,
      g: 84,
      b: 22,
      hex: "#FF5416"
    },
    {
      pantone: "812",
      r: 252,
      g: 35,
      b: 102,
      hex: "#FC2366"
    },
    {
      pantone: "812 2x",
      r: 252,
      g: 7,
      b: 79,
      hex: "#FC074F"
    },
    {
      pantone: "813",
      r: 229,
      g: 0,
      b: 153,
      hex: "#E50099"
    },
    {
      pantone: "813 2x",
      r: 209,
      g: 0,
      b: 132,
      hex: "#D10084"
    },
    {
      pantone: "814",
      r: 140,
      g: 96,
      b: 193,
      hex: "#8C60C1"
    },
    {
      pantone: "814 2x",
      r: 112,
      g: 63,
      b: 175,
      hex: "#703FAF"
    },
  ]
}
