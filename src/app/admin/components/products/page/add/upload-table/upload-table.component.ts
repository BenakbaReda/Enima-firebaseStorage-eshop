import { Component, Input, OnInit } from '@angular/core';
import { Upload, UploadTask } from 'src/app/admin/models/upload.model';

@Component({
  selector: 'app-upload-table',
  templateUrl: './upload-table.component.html',
  styleUrls: ['./upload-table.component.css']
})
export class UploadTableComponent implements OnInit {
 
  _displayedColumnsTask = [ 'name' ,'image', 'state','progress',  'action' ];
   
  @Input()
  uploadTasks :UploadTask[] =[] ; 
  constructor() { }

  ngOnInit(): void {
  }



}
