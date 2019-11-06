import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartupComponent} from './startup.component';
import {expect} from "@angular/platform-browser/testing/src/matchers";
import {describe} from "jasmine";

describe('StartupComponent', () => {
    let component: StartupComponent;
    let fixture: ComponentFixture<StartupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StartupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StartupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
