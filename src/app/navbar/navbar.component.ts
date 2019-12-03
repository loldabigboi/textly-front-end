import { Component, OnInit, Injector } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor( 
        private loginService: LoginService,
        private route: ActivatedRoute,
        private router: Router,
        private injector: Injector
    ) { }

    private onLogout(): void {

        this.loginService.logout();

        // taken from https://stackoverflow.com/questions/45680250/angular2-how-to-reload-page-with-router-recheck-canactivate
        // basically just runs AuthGuard again (assuming it is first CanActivate implementation in route's canActivate array)
        if (this.route.root.children) {

            // gets current route
            const curr_route = this.route.root.children[ '0' ];

            // if current route has any CanActivate implementations
            if (curr_route.snapshot.routeConfig.canActivate) {

                // gets first guard class
                const AuthGuard = curr_route.snapshot.routeConfig.canActivate[ '0' ];
                // injects guard
                const authGuard = this.injector.get(AuthGuard);
                // makes custom RouterStateSnapshot object
                const routerStateSnapshot: RouterStateSnapshot = Object.assign({}, curr_route.snapshot, { url: this.router.url });
                // runs canActivate
                authGuard.canActivate(curr_route.snapshot, routerStateSnapshot);
 
            }
                   
        }



    }

    ngOnInit() {

    }

}
