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
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
        MatGridListModule,
        MatSnackBarModule
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
    expect(buttons.length).toBe(12);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("pressing a button should emmit an event", async () => {
    const button = await loader.getHarness(MatButtonHarness);
    spyOn(fixture.componentInstance.selectedChange, "emit");
    await button.click();
    expect(fixture.componentInstance.selectedChange.emit).toHaveBeenCalled()
  });

  it("pressing a button should change its apperance", async () => {
    const button = await loader.getHarness(MatButtonHarness);
    spyOn(fixture.componentInstance.selectedChange, "emit");
    await button.click();
    const hasColour = await(await (button.host())).hasClass("mat-accent");
    expect(hasColour).toBe(true);
  });
});
