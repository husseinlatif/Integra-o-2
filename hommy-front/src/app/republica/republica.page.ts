import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-republica',
  templateUrl: './republica.page.html',
  styleUrls: ['./republica.page.scss'],
})
export class RepublicaPage implements OnInit {

  commentForm: FormGroup;
  editCommentForm: FormGroup;
  editMode = false;

  comment_id:number

  username = localStorage.getItem('username');

  republic = JSON.parse(localStorage.getItem('republica'));
  republic_id = this.republic.id;

  comments = [];


  constructor( public formbuilder: FormBuilder, public commentService:CommentService ) { 
    this.commentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
    this.editCommentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
  }

  ngOnInit() { this.listRepublicComment(this.republic_id);  }

  sendComment(form){
    console.log(form);
    console.log(form.value);
    form.value.username = this.username;
    form.value.republic_id = this.republic_id;
    this.editMode = false;
    this.commentService.createComment(form.value).subscribe(
      (res) => {console.log(res)},
      (err) => {console.log(err)}
    );
  }

  getCommentId(id){
    this.comment_id = id
  }


  editComment(form){
    this.editMode = false
    this.commentService.editComment(form.value, this.comment_id).subscribe(
      (res) => {console.log(res)},
      (err) => {console.log(err)}
    );
    console.log(form);
    console.log(form.value);
    this.listRepublicComment(this.republic_id);
  }

  toggleEdit(){
    this.editMode = true;
  }

  deleteComment(){
    this.commentService.deleteComment(this.comment_id)
  }

  listRepublicComment(republic_id){
    this.commentService.listRepublicComment(republic_id).subscribe((res) => {
      console.log(res);
      this.comments = res.comments;
      console.log(this.comments)
    })};


}
