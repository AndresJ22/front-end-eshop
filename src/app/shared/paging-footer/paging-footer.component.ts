import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging-footer',
  templateUrl: './paging-footer.component.html',
  styleUrls: ['./paging-footer.component.scss']
})
export class PagingFooterComponent implements OnInit {
  @Input() totalCount!: number;
  @Input() pageSize!: number;
  @Output() pagingFooterChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onPagingFooterChanged(event: any): void {
    console.log(event);
    this.pagingFooterChanged.emit(event.page)
  }
}
