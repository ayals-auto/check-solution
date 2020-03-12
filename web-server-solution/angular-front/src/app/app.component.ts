import { Component ,OnInit } from '@angular/core';
import { ApiService } from "./api.service"
import { Inum } from './num';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  filteredPosts: Inum[];
  posts: Inum[] = [];
  errorMessage: string;

  title = 'devops-sol-check';
  constructor ( private apiservice : ApiService) {}
  post() {
    
      this.apiservice.postMessage("Yey")
    
    }

    refresh(): void {
      this.apiservice.postsNum().subscribe({
        next: posts => {
          this.posts = posts;
          this.filteredPosts = this.posts
        }
        });

    }

    ngOnInit(): void {
      this.apiservice.postsNum().subscribe({
        next: posts => {
          this.posts = posts;
          this.filteredPosts = this.posts;
          console.log(this.filteredPosts)
        },
        error: err => this.errorMessage = err
      });
    }
}
