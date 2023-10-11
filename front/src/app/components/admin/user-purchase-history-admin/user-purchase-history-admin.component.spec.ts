import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPurchaseHistoryAdminComponent } from './user-purchase-history-admin.component';

describe('UserPurchaseHistoryAdminComponent', () => {
  let component: UserPurchaseHistoryAdminComponent;
  let fixture: ComponentFixture<UserPurchaseHistoryAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPurchaseHistoryAdminComponent]
    });
    fixture = TestBed.createComponent(UserPurchaseHistoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
