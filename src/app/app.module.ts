import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { TestComponent } from './test/test.component';



export class BaluHammerConfig extends HammerGestureConfig {
  overrides = {
      pan: {
           direction: 6
    },
    pinch: {
        enable: false
    },
    rotate: {
        enable: false
    }
};
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    // {
    //   provide: HammerGestureConfig,
    //   useClass: BaluHammerConfig
    // }
  ],
  bootstrap: [AppComponent],
  exports: [
    SharedModule,
  ],
  schemas: []
})
export class AppModule { }
