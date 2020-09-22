import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthServiceService } from "../../../shared/services/auth-service.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {



  constructor(authService: AuthServiceService) { }

  ngOnInit(): void {
  }




}
