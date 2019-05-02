export class TransactionLine {
    amount: number;
    exporter: string;
    exporterAddress: string;
    exporterCountry: string;
    importer: string;
    importerAddress: string;
    importerCountry: string;
    countryOfShipment: string;
    countryOfShipmentRegion: string;
    countryOfImport: string;
    destionationOfGoodsRegion: string;
    goods: string;
    intraRegionalTrade : string;
    sector: string;
    shipmentDate : Date;
    financialDate : Date;
    financialMaturityDate : Date;
  }