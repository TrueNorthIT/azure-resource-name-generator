import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Data } from './input-form/data-model';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatSnackBarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'azure-resource-name-generator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('azure-resource-name-generator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('header h1').textContent).toContain('Azure Resource Name Generator');
  });

  it('should render subtitle', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('header p').textContent).toContain('Automatically generates resources names in a wide range of formats');
  });

  it('should correctly render the supplied data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.nameFormat = "Resource-Application-Instance-Region-Environment";
    fixture.componentInstance.resourceData = new Data("A", "B", "C", "D", "E");
    fixture.componentInstance.nameChange(fixture.componentInstance.nameFormat);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("#generator h1").textContent).toBe("A-B-E-D-C");
  });

  it('should correctly render the data in the supplied format', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.nameFormat = "Resource-Application-Environment-Region-Instance";
    fixture.componentInstance.resourceData = new Data("A", "B", "C", "D", "E");
    fixture.componentInstance.nameChange(fixture.componentInstance.nameFormat);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("#generator h1").textContent).toBe("A-B-C-D-E");
  });

  it('setData() should set the data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const testData = new Data("T", "E", "S", "T", "!");
    fixture.componentInstance.setData(testData);
    fixture.detectChanges();
    expect(fixture.componentInstance.resourceData).toEqual(testData);
  });

  it('setData() should trigger a name change', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const nameFormat = "TestNameFormat";
    fixture.componentInstance.nameFormat = nameFormat;
    const testData = new Data("T", "E", "S", "T", "!");
    spyOn(fixture.componentInstance, "nameChange");
    fixture.componentInstance.setData(testData);
    fixture.detectChanges();
    expect(fixture.componentInstance.nameChange).toHaveBeenCalledWith(nameFormat);
  });

});

