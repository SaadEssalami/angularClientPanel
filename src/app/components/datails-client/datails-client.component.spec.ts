import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatailsClientComponent } from './datails-client.component';

describe('DatailsClientComponent', () => {
  let component: DatailsClientComponent;
  let fixture: ComponentFixture<DatailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatailsClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
