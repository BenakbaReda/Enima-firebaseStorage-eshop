import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProduct } from '../../../shared/models/iproduct.model';
import { AdddiagComponent } from './diag/adddiag/adddiag.component';
import { DeldiagComponent } from './diag/deldiag/deldiag.component';
import { EditdiagComponent } from './diag/editdiag/editdiag.component';
import { ExtentionDataSource } from './extention-data-source';
import * as uuid from 'uuid';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  /**
   *  child page
   */
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild('filter', { static: true })
  filter!: ElementRef;


  /**
   *  table 
   */
  isDiagPage:boolean =false;
  displayedColumns = [ 'uuid' ,   'Name',   'Price', 'Stocks','Rating',   'Actions'];
  dataSource!: ExtentionDataSource  ;
  serviceDatabase!: ProductService  ;
  /**
   *  table 
   */
  uuid!: string; 
  Count: number=0;
  constructor(  public matDialogService: MatDialog,  
                private router: Router ,
                private dataService: ProductService) 
  {
  }

  ngOnInit(): void {
 
    this.serviceDatabase= this.dataService;
    this.serviceDatabase._count$.subscribe(
      x => {
        this.Count=x;
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );

    this.loadData(); 

  }


  /***************************************************************************
  *   edit /add/del 
  ***************************************************************************/
 add()
 {
    if(this.isDiagPage){
      this.openAddDialog()
    }
    else{
      this.router.navigate(['admin/products/add'])
      
    }
 }

 edit(elm: IProduct)
 {
    if(this.isDiagPage){
      this.startEdit(elm);
    }
    else{
      this.router.navigate(['admin/products/edit',  elm.uuid])
    }
   
 }

 del(elm: IProduct)
 {
    if(this.isDiagPage){
      this.deleteItem(elm);
    }
    else{
      this.router.navigate(['admin/products/del',  elm.uuid])
    }
   
 }

 /***************************************************************************
  *   diag edit /add/del 
  ***************************************************************************/
  openAddDialog() {
    const dialogRef = this.matDialogService.open( AdddiagComponent, {
      data: { 
                uuid:uuid.v4() ,
                CategorieId:1,  
                BrandId: 1,  
                Name:"", 
                Decription: "your description", 
                Price :  100,
                Rating: 5,
                Stocks:100, 
            }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.serviceDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }
 
  startEdit(elm: IProduct ) {
    this.uuid = elm.uuid;
    const dialogRef = this.matDialogService.open( EditdiagComponent, {
      data: {
               uuid:elm.uuid,
               Name: elm.Name,
               Decription: elm.Decription,
               Price: elm.Price, 
               Stocks: elm.Stocks, 
               Images: elm.Images ,
               Rating: elm.Rating,
            }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.serviceDatabase.dataChange.value.findIndex(x => x.uuid === this.uuid);
        if(foundIndex ){
               this.serviceDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        }
        this.refreshTable();
      }
    });
  }
 
  deleteItem(elm: IProduct   ) {
    this.uuid = elm.uuid;
    const dialogRef = this.matDialogService.open(DeldiagComponent, {
      data: {
       uuid:elm.uuid,
       Name: elm.Name,
       Decription: elm.Decription,
       Price: elm.Price, 
       Stocks: elm.Stocks, 
       Images: elm.Images ,
       Rating: elm.Rating,
      }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log("close diage event  :")
        const foundIndex = this.serviceDatabase.dataChange.value.findIndex(x => x.uuid === this.uuid);
        this.serviceDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }
 



 /***************************************************************************
  *   
  ***************************************************************************/
  reload() {
    this.loadData();
 
  }

private refreshTable() {
  this.loadData();
  this.paginator._changePageSize(this.paginator.pageSize);

}

public loadData() {
  
  this.dataSource = new ExtentionDataSource(this.serviceDatabase, this.paginator, this.sort);
  this.dataSource.connect();
  fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
}
public  getCount () 
{
   if(this.Count>1000)
   {
     return  (this.Count/1000) +"k"

   }
   return this.Count;
}

}


 

