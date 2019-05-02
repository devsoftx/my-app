import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionLine } from '../transactionLine';
import { CountryService } from '../country.service'
import { Country } from '../Country';
import { SessionStorageService } from 'angular-web-storage';
import { DatePipe } from '@angular/common';
import { Subscription } from "rxjs/Subscription";
import { BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
import { environment } from "../../environments/environment"


@Component({
  selector: 'app-my-row',
  templateUrl: './my-row.component.html',
  styleUrls: ['./my-row.component.sass'],
  providers: [DatePipe]
})
export class MyRowComponent implements OnInit, OnDestroy {

  private error = "";
  public loadingMessage = "Loading...";
  countries: Country[];
  lines: TransactionLine[];
  settings : {};
  private subscription: Subscription;

  constructor(
    private countryService: CountryService,
    private session: SessionStorageService,
    private broadcastService : BroadcastService, 
    private msalService: MsalService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.populate();
    //this.getAllCountries();
    //MSAL
    this.subscription = this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      console.log("acquire token failure " + JSON.stringify(payload));
      if (payload.indexOf("consent_required") !== -1 || payload.indexOf("interaction_required") != -1 ) {
        this.msalService.acquireTokenPopup([environment.consent_uri]).then( (token) => {
          this.countryService.getAllCountries().subscribe( (results) => {
            this.error = '';
            this.countries = results;
            this.loadingMessage = "";
          },  (err) => {
            this.error = err;
            console.log(this.error);
            this.loadingMessage = "";
          });
        },  (error) => {
          this.error = error;
          console.log(this.error);
        });
      }
    });


   this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      console.log(JSON.stringify(payload));
      console.log("acquire token success");
    });
    //
    this.lines = this.session.get('KEY');
    this.settings = {
      actions :{
        columnTitle : 'Acciones',
        position: 'left',
        class : 'action-column'
      },
      delete: {
        confirmDelete: true,
      },
      add: {
        confirmCreate: true,
      },
      edit: {
        confirmSave: true,
      },
      columns: {
        amount: {
          title: 'Amount'
        },
        exporter: {
          title: 'Exporter'
        },
        exporterAddress: {
          title: 'Exporter Addr'
        },
        exporterCountry: {
          title: 'Exporter Ctry',
          editor: {
            type: 'completer',
            config: {
              completer: {
                data: this.countries,
                titleField: 'nmEn',
                descriptionField: 'nmEn',
              },
            },
          }
        },
        importer: {
          title: 'Importer'
        },
        importerAddress: {
          title: 'Importer Addr'
        },
        importerCountry: {
          title: 'Importer Ctry'
        },
        countryOfShipment: {
          title: 'Ctry Of Shipt'
        },
        countryOfShipmentRegion: {
          title: 'Ctry Of Shipt Region'
        },
        countryOfImport : {
          title: 'Ctry Of Import'
        },
        destionationOfGoodsRegion: {
          title: 'Dest Of Goods Region'
        },
        goods: {
          title: 'Goods'
        },
        intraRegionalTrade: {
          title: 'Intra Regional Trade'
        },
        sector: {
          title: 'Sector'
        },
        shipmentDate: {
          title: 'Shipt Date',
          valuePrepareFunction: (shipmentDate) => {
            return this.datePipe.transform(new Date(shipmentDate), 'dd MMM yyyy');
          }
        },
        financingDate: {
          title: 'Fin Date',
          valuePrepareFunction: (financingDate) => {
            return this.datePipe.transform(new Date(financingDate), 'dd MMM yyyy');
          }
        },
        financingMaturityDate: {
          title: 'Fin Maturity Date',
          valuePrepareFunction: (financingMaturityDate) => {
            return this.datePipe.transform(new Date(financingMaturityDate), 'dd MMM yyyy');
          }
        }
      }
    };
  }

  public populate() {
    this.countryService.getAllCountries().subscribe(result => {
      this.countries = result;
      this.loadingMessage = "";
    }, error => {
      console.log("get countries failed");
      this.error = error;
      this.loadingMessage = "";
      console.log(this.error);
    });
  }

  onEdit(event) {
    console.log(event);
  }
  onSaveConfirm(event) {
    console.log(event);
  }

  onDeleteConfirm(event) {
    console.log(event);
  }

  onCreateConfirm(event) {
    var newData = event.newData;
    var lines = this.session.get('KEY');
    lines.push(newData);
    this.session.set('KEY', lines);
    event.confirm.resolve();
    console.log(event);
  }

  getAllCountries(): void {
    this.countryService.getAllCountries()
        .subscribe(countries => this.countries = countries);
  }

  getAllCountriesByName(name: string): void {
    this.countryService.getAllCountriesByName(name)
        .subscribe(countries => this.countries = countries);
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}