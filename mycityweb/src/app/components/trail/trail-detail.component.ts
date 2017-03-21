﻿import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { TrailsService } from '../../services/trails.service';
import { Trail } from '../../models/trail';
import { InstagramFeedService } from '../../services/instagramfeed.service';

@Component({
    selector: 'trail-detail',
    templateUrl: './trail-detail.component.html',
})
export class TrailDetailComponent {

    public trail: Trail;
    private feedUrl: string = 'buntzenlake';
    private feeds: any;

    constructor(
        private trailsService: TrailsService,
        private route: ActivatedRoute,
        private location: Location,
        private instagramFeedService: InstagramFeedService) {
    
    }  

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.trailsService.getTrail(params['id']))
            .subscribe(trail => this.trail = trail);

        this.refreshFeed();
    }

    private refreshFeed() {
        this.instagramFeedService.getFeedContent(this.feedUrl)
            .subscribe(
            feed => this.feeds = feed.channel,
            error => console.log(error));
    }

}