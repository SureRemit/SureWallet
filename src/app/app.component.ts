import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(){
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyDEF8jxjJVV5SZ4JE-dhMY43GO1KxgzxAI",
      authDomain: "surewallet01.firebaseapp.com",
      databaseURL: "https://surewallet01.firebaseio.com",
      projectId: "surewallet01",
      storageBucket: "surewallet01.appspot.com",
      messagingSenderId: "696278252024"
    };
    firebase.initializeApp(config);
  }

}
