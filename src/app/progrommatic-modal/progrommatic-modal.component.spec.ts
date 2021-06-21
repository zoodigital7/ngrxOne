import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrommaticModalComponent } from './progrommatic-modal.component';

describe('ProgrommaticModalComponent', () => {
  let component: ProgrommaticModalComponent;
  let fixture: ComponentFixture<ProgrommaticModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrommaticModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrommaticModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
