import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { catchError, map, Observable, of } from 'rxjs';
import { CustomerDTO } from '../DTOs/customerDTO';
import { Utility } from '../../../utility';
import { CreateResponseDTO } from '../DTOs/CreateResponseDTO';
import { CreateCustomerRequest } from '../contracts/createCustomerRequest';



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