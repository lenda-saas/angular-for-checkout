import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCheckoutBnplComponent } from './ngx-checkout-bnpl.component';

describe('NgxCheckoutBnplComponent', () => {
  let component: NgxCheckoutBnplComponent;
  let fixture: ComponentFixture<NgxCheckoutBnplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCheckoutBnplComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxCheckoutBnplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
