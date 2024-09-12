import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskhiveHeaderComponent } from './taskhive-header.component';

describe('TaskhiveHeaderComponent', () => {
  let component: TaskhiveHeaderComponent;
  let fixture: ComponentFixture<TaskhiveHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskhiveHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskhiveHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
