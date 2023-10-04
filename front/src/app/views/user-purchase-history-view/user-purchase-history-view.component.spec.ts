import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPurchaseHistoryViewComponent } from './user-purchase-history-view.component';

describe('UserPurchaseHistoryViewComponent', () => {
  let component: UserPurchaseHistoryViewComponent;
  let fixture: ComponentFixture<UserPurchaseHistoryViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPurchaseHistoryViewComponent]
    });
    fixture = TestBed.createComponent(UserPurchaseHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
