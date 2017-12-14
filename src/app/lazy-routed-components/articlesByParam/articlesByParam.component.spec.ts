import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesByCategoryComponent } from './articlesByParam.component';

describe('ArticlesByCategoryComponent', () => {
  let component: ArticlesByCategoryComponent;
  let fixture: ComponentFixture<ArticlesByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
