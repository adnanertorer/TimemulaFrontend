import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { RolesComponent } from './roles.component';
import { RolesService } from './shared/roles.service';
import { Roles } from './shared/roles.model';

describe('a roles component', () => {
	let component: RolesComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: RolesService, useClass: MockRolesService },
				RolesComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([RolesComponent], (RolesComponent) => {
		component = RolesComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original roles service
class MockRolesService extends RolesService {
	getList(): Observable<any> {
		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
	}
}
