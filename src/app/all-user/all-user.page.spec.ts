import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllUserPage } from './all-user.page';

describe('AllUserPage', () => {
  let component: AllUserPage;
  let fixture: ComponentFixture<AllUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
