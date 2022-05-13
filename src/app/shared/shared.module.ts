import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingFooterComponent } from './paging-footer/paging-footer.component';
import { HeaderComponent } from './header/header.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PagingHeaderComponent } from './paging-header/paging-header.component';

@NgModule({
  declarations: [
    PagingFooterComponent,
    HeaderComponent,
    PagingHeaderComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [
    PaginationModule,
    CarouselModule,
    PagingHeaderComponent,
    PagingFooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
