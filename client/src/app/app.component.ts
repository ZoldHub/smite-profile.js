import { Component } from '@angular/core';
import { SessionService } from './shared/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'smiteprofile.js';

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    let sessionId = this.sessionService.getNewSession().subscribe((session) => {
      session.session_id;
    });
    console.log(sessionId);
  }
}
