import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig, TRANSLOCO_LOADER } from '@ngneat/transloco';
import { CustomTranslocoLoader } from './services/custom-transloco-loader.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslocoModule
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['en', 'ger'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: false
      } as TranslocoConfig
    },
    {
      provide: TRANSLOCO_LOADER,
      useClass: CustomTranslocoLoader
    }
  ]
})
export class TranslocoRootModule { }
