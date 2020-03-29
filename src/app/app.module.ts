import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreFeaturesModule } from './sites/core-features/core-features.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreFeaturesModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  exports: [
    SharedModule,
  ],
})
export class AppModule { }
