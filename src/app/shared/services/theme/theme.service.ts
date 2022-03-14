import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StyleManagerService } from './style-manager.service';
import { themeOption } from './theme-option.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(  private http: HttpClient,
    private styleManager: StyleManagerService
  ) {}

  getThemeOptions(): Observable<Array<themeOption>> {
    return this.http.get<Array<themeOption>>("assets/theme_option.json");
  }



  setTheme(themeToSet) {
    this.styleManager.setStyle(
      "theme",
      `assets/prebuilt-themes/${themeToSet}.css` 
      
    );
  }
 
}