import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppSalesOverviewComponent } from 'src/app/layouts/blank/components/sales-overview/sales-overview.component';
import { AppActivityTimelineComponent } from 'src/app/layouts/blank/components/activity-timeline/activity-timeline.component';
import { AppSalesOurVisitorsComponent } from 'src/app/layouts/blank/components/our-visitors/our-visitors.component';
import { AppProfileCardComponent } from 'src/app/layouts/blank/components/profile-card/profile-card.component';


@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppSalesOverviewComponent,
    AppSalesOurVisitorsComponent,
    AppProfileCardComponent,  
    AppActivityTimelineComponent
    
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }