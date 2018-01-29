import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountQrCodeComponent } from './account-qr-code.component';

describe('AccountQrCodeComponent', () => {
  let component: AccountQrCodeComponent;
  let fixture: ComponentFixture<AccountQrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountQrCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
