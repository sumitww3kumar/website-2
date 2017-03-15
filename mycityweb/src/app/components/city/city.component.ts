﻿import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { City } from '../../models/city';
import { CitiesService } from '../../services/cities.service';

@Component({
    selector: 'city',
    templateUrl: './city.component.html',
})

export class CityComponent implements OnInit {
    public city: City;
    public test = "assdfsdf"
    constructor(
        private citiesService: CitiesService,
        private route: ActivatedRoute,
        private location: Location
    )
    { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.citiesService.getCity(+params['id']))
            .subscribe(city => this.city = city);
    }

    goBack(): void {
        this.location.back();
    }

}