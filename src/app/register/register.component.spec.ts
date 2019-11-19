import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as text "Signup"', async(() => {
    expect(component.text).toEqual('Signup');
  }));

  it('should set submitted to true', async(() => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  }));

  it('should call the onSubmit method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));

  it('form should be invalid', async(() => {
    component.registrationForm.controls['firstName'].setValue('');
    component.registrationForm.controls['lastName'].setValue('');
    component.registrationForm.controls['username'].setValue('');
    component.registrationForm.controls['email'].setValue('');
    component.registrationForm.controls['password'].setValue('');
    component.registrationForm.controls['confirmPassword'].setValue('');
    expect(component.registrationForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.registrationForm.controls['firstName'].setValue('lisa');
    component.registrationForm.controls['lastName'].setValue('brown');
    component.registrationForm.controls['username'].setValue('lisa_b');
    component.registrationForm.controls['email'].setValue('lisa@gmail.com');
    component.registrationForm.controls['password'].setValue('123456');
    component.registrationForm.controls['confirmPassword'].setValue('123456');
    expect(component.registrationForm.valid).toBeTruthy();
  }));

});
