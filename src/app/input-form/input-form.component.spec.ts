import { Data } from '../input-form/data-model';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { InputFormComponent } from './input-form.component';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';


describe('InputFormComponent', () => {
  let fixture: ComponentFixture<InputFormComponent>;
  let loader: HarnessLoader;
  const testData = new Data("T", "E", "prod", "T", "!");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [InputFormComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(InputFormComponent);
    fixture.componentInstance.model = testData;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

  });

  it('should load all field harnesses', async () => {
    const fields = await loader.getAllHarnesses(MatFormFieldHarness);
    expect(fields.length).toBe(5);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should be able to get control of a form-field', async () => {
    const formField = await loader.getAllHarnesses(MatFormFieldHarness);
    expect(await formField[1].getControl() instanceof MatInputHarness).toBe(true);
  });

  it('changing a field should trigger an event with the correct data', async () => {
    const fields = await loader.getAllHarnesses(MatFormFieldHarness);
    const control = await fields[1].getControl() as MatInputHarness;

    spyOn(fixture.componentInstance.modelEvent, "emit");
    const testString = "My Test App"
    await control.setValue(testString);

    expect(fixture.componentInstance.modelEvent.emit).toHaveBeenCalledTimes(testString.length+1);

    // @ts-ignore
    let args = fixture.componentInstance.modelEvent.emit.calls.mostRecent().args;
    expect(args[0]).toEqual(
      { resource: testData.resource,
        name: testString,
        environment: testData.environment,
        region: testData.region, 
        instance: testData.instance }
    );


  });


});
