import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EpisodePage } from './episode.page';

describe('EpisodePage', () => {
  let component: EpisodePage;
  let fixture: ComponentFixture<EpisodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
