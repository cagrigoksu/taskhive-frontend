import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskhiveFooterComponent } from './taskhive-footer.component';

describe('TaskhiveFooterComponent', () => {
  let component: TaskhiveFooterComponent;
  let fixture: ComponentFixture<TaskhiveFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskhiveFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskhiveFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
