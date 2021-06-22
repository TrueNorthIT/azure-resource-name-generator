import { MatCardActions, MatCardModule } from '@angular/material/card';
import { Data } from '../input-form/data-model';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';

import { MatButtonModule } from '@angular/material/button';

import { FormatSelectorComponent } from './format-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

describe('FormatSelectorComponent', () => {
  let fixture: ComponentFixture<FormatSelectorComponent>;
  let loader: HarnessLoader;
  let buttonHarness = MatButtonHarness;
  const testData = new Data("T", "E", "S", "T", "!");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule
      ],
      declarations: [FormatSelectorComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(FormatSelectorComponent);
    fixture.componentInstance.data = testData;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

  });

  it('should load all button harnesses', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(6);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("pressing a button should emmit an event", async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    spyOn(fixture.componentInstance.selectedChange, "emit");
    await buttons[1].click();
    expect(fixture.componentInstance.selectedChange.emit).toHaveBeenCalled()
  });

  it("pressing a button should change its apperance", async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    spyOn(fixture.componentInstance.selectedChange, "emit");
    await buttons[1].click();
    const hasColour = await(await (buttons[1].host())).hasClass("mat-accent");
    expect(hasColour).toBe(true);
  });
});
