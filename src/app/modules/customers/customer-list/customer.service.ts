import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { catchError, map, Observable, of } from 'rxjs';
import { CustomerDTO } from '../DTOs/customerDTO';
import { CreateResponseDTO } from '../DTOs/createResponseDTO';
import { Utility } from '../../../utility';
import { CreateCustomerRequest } from '../contracts/createCustomerRequest';
import { CustomerSiteDTO } from '../DTOs/customerSiteDTO';
import { CreateCustomerSiteRequest } from '../contracts/createCustomerSiteRequest';



@Injectable({
    providedIn: 'root',
})
export class CustomerService{

    private httpClient: HttpClient;

    private get customerUrl(): string{
        return '/api/v1/customers';
    }

    constructor(httpClient: HttpClient){
        this.httpClient = httpClient;
    }


    public fetchCustomers(): Observable<CustomerDTO[]>{
        const httpOptions = {
            headers: new HttpHeaders({

                'Content-type': 'application/json',
                'Access-Control-Allow-Origin':  'http://localhost:4200',
            }),
        }
        const finalUrl = Utility.getBaseUrl() + this.customerUrl;
        return this.httpClient.get<CustomerDTO[]>(finalUrl, httpOptions).pipe(
            catchError((error) => {
                console.error('Error fetching customers data:', error);
                return of([]);
            })
        );

    }


    public fetchCustomerSites(customerId: string): Observable<CustomerSiteDTO[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin':  'http://localhost:4200',
            })
        }
        const finalUrl = Utility.getBaseUrl() + this.customerUrl + '/' + customerId + '/sites';
        return this.httpClient.get<CustomerSiteDTO[]>(finalUrl, httpOptions).pipe(
            catchError((error) => {
                console.error('Error fetching customer sites:', error);
                return of([]);
            })
        );
    }

     public createCustomerSite(customerId: string, requestPayload: CreateCustomerSiteRequest): Observable<CreateResponseDTO | null>{
        const httpOption = {
            headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin':  'http://localhost:4200',
            })
        };

        const finalUrl = Utility.getBaseUrl() + this.customerUrl + '/' + customerId + '/sites';
        return this.httpClient.post<CreateResponseDTO>(finalUrl, requestPayload, httpOption).pipe(
            catchError((err) => {
                console.error('Error create new site from customer id: ' + customerId, err);
                return of(null);
            })
        )
    }

    public getCustomerById(id: string): Observable<CustomerDTO>{
        const httpOptions = {
            headers: new HttpHeaders({

                'Content-type': 'application/json',
                'Access-Control-Allow-Origin':  'http://localhost:4200',
            }),
        }
        const finalUrl = Utility.getBaseUrl() + this.customerUrl + '/' +id;
        return this.httpClient.get<CustomerDTO>(finalUrl, httpOptions).pipe(
            catchError((error) => {
                console.error('Error get customer by Id :', error);
                return of();
            })
        );

    }

   

    public createCustomer(requestPayload: CreateCustomerRequest): Observable<CreateResponseDTO | null> {
        const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  'http://localhost:4200',
        }),
        };

        const finalUrl = Utility.getBaseUrl() + this.customerUrl;

        // Send the payload to the endpoint, capturing the saved CustomerDTO on success
        return this.httpClient.post<CreateResponseDTO>(finalUrl, requestPayload, httpOptions).pipe(
        catchError((error) => {
            console.error('Error creating customer on backend database:', error);
            return of(null);
        })
        );
    }


}